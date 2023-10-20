
// 달력 표시
import {ModalTable, Table} from "../styles/style.js";
import {DateService} from "./services/dateService.jsx";

export default function ModalDate({today, changeDayEventListener, todoItems = [], modalMonthFromToday, selectedDateRef}) {

    const dateService = new DateService(today);

    function dayRender(i, j, weekDay, lastDay) {
        const selectedDay = new Date(today.getFullYear(), today.getMonth() + modalMonthFromToday, parseInt(document.querySelector('.selected').innerText)).getDate();
        const classes = `${selectedDay === ((i * 7 + j) - weekDay + 1) ? 'selected' : ''}`
        return <p className={classes}>{i * 7 + j >= weekDay && i * 7 + j < lastDay.getDate() + weekDay ? i * 7 + j - weekDay + 1 : ''}</p>
    }

    return (
        <ModalTable>
            <thead>
            <tr>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
                <th>일</th>
            </tr>
            </thead>
            <tbody>
            {dateService.getCalendarFormat({monthFromToday : modalMonthFromToday, selectedDateRef, changeDayEventListener, dayRender, isModal : true})}
            </tbody>
        </ModalTable>
    )
}
