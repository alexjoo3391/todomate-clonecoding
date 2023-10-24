import {DayBox, SelectedDay, Table, Thead} from "../styles/style.js";
import {DateService} from "./services/dateService.jsx";
import {DiaryService} from "./services/diaryService.js";

// 달력 표시
export default function CalendarDate({
                                         today,
                                         changeDayEventListener,
                                         sessionTodoItemList = {},
                                         monthFromToday,
                                         selectedDay,
                                         calendarMode,
                                         selectedDateRef
                                     }) {

    const dateService = new DateService(today);

    function renderDay(i, j, weekDay, lastDay) {
        let todoCount = 0;
        let isExist = false;
        let diaryDay = false;
        let isToday = false;
        let emoji = '🫥';

        const date = new Date(today.getFullYear(), today.getMonth() + monthFromToday, i * 7 + j - weekDay + 1);
        const diaryService = new DiaryService(date);

        let todoCheckCount = 0;

        if (diaryService.isDiaryHaveProperty()) {
            emoji = diaryService.getDiaryValue()[0];
        }

        return <DayInMonth i={i} j={j} selectedDay={selectedDay} weekDay={weekDay} today={today}
                           monthFromToday={monthFromToday} lastDay={lastDay} todoCount={todoCount} isExist={isExist}
                           diaryDay={diaryDay} isToday={isToday} sessionTodoItemList={sessionTodoItemList}
                           calendarMode={calendarMode} todoCheckCount={todoCheckCount} emoji={emoji}/>
    }


    return (
        <Table>
            <Thead>
                <tr>
                    <th>월</th>
                    <th>화</th>
                    <th>수</th>
                    <th>목</th>
                    <th>금</th>
                    <th>토</th>
                    <th>일</th>
                </tr>
            </Thead>
            <tbody ref={selectedDateRef}>
            {dateService.getCalendarFormat({
                monthFromToday,
                selectedDateRef,
                changeDayEventListener,
                renderDay,
                isModal: false
            })}
            </tbody>
        </Table>
    )
}

function DayInMonth({
                        i,
                        j,
                        selectedDay,
                        weekDay,
                        today,
                        monthFromToday,
                        lastDay,
                        todoCount,
                        isExist,
                        diaryDay,
                        isToday,
                        sessionTodoItemList,
                        calendarMode,
                        todoCheckCount,
                        emoji
                    }) {
    const classes = `${selectedDay && parseInt(selectedDay) === ((i * 7 + j) - weekDay + 1) ? 'selected' : ''} ${(i * 7 + j) - weekDay + 1 === today.getDate() && monthFromToday === today.getMonth() - today.getMonth() ? 'today' : ''}`

    if (i * 7 + j >= weekDay && i * 7 + j < lastDay.getDate() + weekDay) {
        const todoDate = new Date(today.getFullYear(), today.getMonth() + monthFromToday, ((i * 7 + j) - weekDay + 1));
        const todoUtil = new DateService(todoDate);
        const todoDateString = todoUtil.getDayString();
        todoCount = 0;
        isExist = false;
        diaryDay = false;

        for (let i = 1; i <= 3; i++) {
            if (sessionTodoItemList.hasOwnProperty(`todo${i}${todoDateString}`)) {
                isExist = true;
                const todoDay = JSON.parse(sessionTodoItemList[`todo${i}${todoDateString}`]).todoCheck;
                for (let j = 0; j < todoDay.length; j++) {
                    todoCheckCount++;
                    if (todoDay[j] === 0) {
                        todoCount++;
                    }
                }
            }
        }
        today.setHours(0, 0, 0, 0);
        if (todoUtil.dateDiff(todoDate, today) >= 0) {
            diaryDay = true;
        }
        if (todoUtil.dateDiff(todoDate, today) === 0) {
            isToday = true;
        }
    }

    if (i * 7 + j >= weekDay && i * 7 + j < lastDay.getDate() + weekDay) {
        return (
            <>
                {
                    calendarMode === 'todo'
                        ? <DayBox
                            className={`dayBox ${isExist && todoCount < todoCheckCount ? 'dayBoxCheck' : ''} ${calendarMode === 'todo' ? 'dayBoxTodo' : ''}`}
                            id={((i * 7 + j) - weekDay + 1).toString()}>{isExist ? todoCount !== 0 ? todoCount : '✓' : ''}</DayBox>
                        : <DayBox
                            className={`dayBox ${emoji === '🫥' ? 'diary' : ''} ${isToday && emoji === '🫥' ? 'diaryToday' : ''}`}
                            id={((i * 7 + j) - weekDay + 1).toString()}>{diaryDay ? emoji : ''}</DayBox>
                }
                <SelectedDay className={classes}>
                    <p>{i * 7 + j >= weekDay && i * 7 + j < lastDay.getDate() + weekDay ? i * 7 + j - weekDay + 1 : ''}</p>
                </SelectedDay>
            </>
        );
    }
    return '';
}