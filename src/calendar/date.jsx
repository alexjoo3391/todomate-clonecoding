import {useRecoilState} from 'recoil'

// 달력 표시
export default function ShowDate({today, tdEventListener, todoItems = {}, currentMonth, selectDay}) {

    let todoCount;
    let isExist;

    const firstDay = new Date(today.getFullYear(), today.getMonth() + currentMonth, 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + currentMonth + 1, 0);
    const weekDay = (firstDay.getDay() ? firstDay.getDay() : 7);
    const weeks = Math.ceil((weekDay + lastDay.getDate() - 1) / 7);

    const days = [];
    for (let i = 0; i < weeks; i++) {
        let week = [];
        for (let j = 1; j <= 7; j++) {
            const classes = `${selectDay && selectDay === ((i * 7 + j) - weekDay + 1) ? 'selected' : ''} ${(i * 7 + j) - weekDay + 1 === today.getDate() && currentMonth === today.getMonth() - today.getMonth() ? 'today' : ''}`

            if (i * 7 + j >= weekDay && i * 7 + j < lastDay.getDate() + weekDay) {
                const todoDate = new Date(today.getFullYear(), today.getMonth() + currentMonth, ((i * 7 + j) - weekDay + 1));
                const todoDateString = todoDate.getFullYear().toString() + (('0' + (todoDate.getMonth() + 1)).slice(-2)).toString() + (('0' + todoDate.getDate()).slice(-2)).toString()
                todoCount = 0;
                isExist = false;
                if (todoItems.hasOwnProperty(`todoCheck1${todoDateString}`)) {
                    isExist = true;
                    const todoDay1 = JSON.parse(todoItems[`todoCheck1${todoDateString}`]);
                    for (let i = 0; i < todoDay1.length; i++) {
                        if (todoDay1[i] === 0) {
                            todoCount++;
                        }
                    }
                }
                if (todoItems.hasOwnProperty(`todoCheck2${todoDateString}`)) {
                    isExist = true;
                    const todoDay2 = JSON.parse(todoItems[`todoCheck2${todoDateString}`]);
                    for (let i = 0; i < todoDay2.length; i++) {
                        if (todoDay2[i] === 0) {
                            todoCount++;
                        }
                    }
                }
                if (todoItems.hasOwnProperty(`todoCheck3${todoDateString}`)) {
                    isExist = true;
                    const todoDay3 = JSON.parse(todoItems[`todoCheck3${todoDateString}`]);
                    for (let i = 0; i < todoDay3.length; i++) {
                        if (todoDay3[i] === 0) {
                            todoCount++;
                        }
                    }
                }
            }

            week.push(
                <td key={i * 7 + j} className={`td ${'td' + ((i * 7 + j) - weekDay + 1).toString()}`}
                    onClick={(e) => tdEventListener(e)}>
                    <p className={classes}>{i * 7 + j >= weekDay && i * 7 + j < lastDay.getDate() + weekDay ? i * 7 + j - weekDay + 1 : ''}</p>
                    <div className='dayBox'
                         id={((i * 7 + j) - weekDay + 1).toString()}>{isExist ? todoCount !== 0 ? todoCount : '✓' : ''}</div>
                </td>
            );
        }
        days.push(<tr key={`tr${i}`}>{week}</tr>);
    }

    return (
        <table key={'date'}>
            <thead>
            <tr key={'trh'}>
                <th key={'h0'}>월</th>
                <th key={'h1'}>화</th>
                <th key={'h2'}>수</th>
                <th key={'h3'}>목</th>
                <th key={'h4'}>금</th>
                <th key={'h5'}>토</th>
                <th key={'h6'}>일</th>
            </tr>
            </thead>
            <tbody>
            {days}
            </tbody>
        </table>
    )
}
