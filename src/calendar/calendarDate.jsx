import {useRecoilState} from 'recoil'
import {DayBox, SelectedDay, Table, Td, Thead} from "../styles/style.js";

// 달력 표시
export default function CalendarDate({today, tdEventListener, todoItems = {}, currentMonth, selectedDay, calendarMode}) {

    let todoCount;
    let isExist = false;
    let diaryDay = false;
    let isToday = false;

    const firstDay = new Date(today.getFullYear(), today.getMonth() + currentMonth, 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + currentMonth + 1, 0);
    const weekDay = (firstDay.getDay() ? firstDay.getDay() : 7);
    const weeks = Math.ceil((weekDay + lastDay.getDate() - 1) / 7);

    const days = [];
    for (let i = 0; i < weeks; i++) {
        let week = [];
        for (let j = 1; j <= 7; j++) {
            let emoji = '🫥';
            isExist = false;
            diaryDay = false;
            const classes = `${selectedDay && selectedDay === ((i * 7 + j) - weekDay + 1) ? 'selected' : ''} ${(i * 7 + j) - weekDay + 1 === today.getDate() && currentMonth === today.getMonth() - today.getMonth() ? 'today' : ''}`

            const date = new Date(today.getFullYear(), today.getMonth() + currentMonth, i * 7 + j - weekDay + 1);
            const dayString = date.getFullYear().toString()
                + (('0' + (date.getMonth() + 1)).slice(-2)).toString()
                + (('0' + date.getDate()).slice(-2)).toString();

            let todoCheckCount = 0;

            if (i * 7 + j >= weekDay && i * 7 + j < lastDay.getDate() + weekDay) {
                const todoDate = new Date(today.getFullYear(), today.getMonth() + currentMonth, ((i * 7 + j) - weekDay + 1));
                const todoDateString = todoDate.getFullYear().toString() + (('0' + (todoDate.getMonth() + 1)).slice(-2)).toString() + (('0' + todoDate.getDate()).slice(-2)).toString();
                todoCount = 0;
                isExist = false;
                diaryDay = false;

                for (let i = 1; i <= 3; i++) {
                    if (todoItems.hasOwnProperty(`todoCheck${i}${todoDateString}`)) {
                        isExist = true;
                        const todoDay = JSON.parse(todoItems[`todoCheck${i}${todoDateString}`]);
                        for (let j = 0; j < todoDay.length; j++) {
                            todoCheckCount++;
                            if (todoDay[j] === 0) {
                                todoCount++;
                            }
                        }
                    }
                }
                today.setHours(0,0,0,0);
                if(todoDate <= today) {
                    diaryDay = true;
                }
                if(todoDate.valueOf() === today.valueOf()) {
                    isToday = true;
                }
            }


            if(sessionStorage.hasOwnProperty(`diary${dayString}`)) {
                emoji = JSON.parse(sessionStorage.getItem(`diary${dayString}`))[0];
            }

            let isDayInMonth = '';
            if(i * 7 + j >= weekDay && i * 7 + j < lastDay.getDate() + weekDay) {
                isDayInMonth = (
                    <>
                        {calendarMode === 'todo' ? <DayBox className={`dayBox ${isExist && todoCount < todoCheckCount ? 'dayBoxCheck' : ''} ${calendarMode === 'todo' ? 'dayBoxTodo' : ''}`} id={((i * 7 + j) - weekDay + 1).toString()}>{isExist ? todoCount !== 0 ? todoCount : '✓' : ''}</DayBox> : <DayBox className={`dayBox ${emoji === '🫥' ? 'diary' : ''} ${isToday && emoji === '🫥' ? 'diaryToday' : ''}`} id={((i * 7 + j) - weekDay + 1).toString()}>{diaryDay ? emoji : ''}</DayBox>}
                        <SelectedDay className={classes}><p>{i * 7 + j >= weekDay && i * 7 + j < lastDay.getDate() + weekDay ? i * 7 + j - weekDay + 1 : ''}</p></SelectedDay>
                    </>
                );
            }

            week.push(
                <Td key={i * 7 + j} className={`td ${'td' + ((i * 7 + j) - weekDay + 1).toString()}`} onClick={(e) => tdEventListener(e)}>
                    {isDayInMonth}
                </Td>
            );
        }
        days.push(<tr key={`tr${i}`}>{week}</tr>);
    }

    return (
        <Table key={'date'}>
            <Thead>
            <tr key={'trh'}>
                <th key={'h0'}>월</th>
                <th key={'h1'}>화</th>
                <th key={'h2'}>수</th>
                <th key={'h3'}>목</th>
                <th key={'h4'}>금</th>
                <th key={'h5'}>토</th>
                <th key={'h6'}>일</th>
            </tr>
            </Thead>
            <tbody>
            {days}
            </tbody>
        </Table>
    )
}
