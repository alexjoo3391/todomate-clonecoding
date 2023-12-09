// 달력 표시
import {ModalTable} from "../styles/style.js";
import {DateService} from "./services/dateService.jsx";

export default function ModalDate({today, changeDayEventListener, modalMonthFromToday, selectedDateRef}) {

    const dateService = new DateService(today);

    function renderDay(i, j, weekDay, lastDay) {
        const selected = new Date(today.getFullYear(), today.getMonth() + modalMonthFromToday, dateService.getTdObject(null, selectedDateRef)['selected'].innerText);
        const selectedDay = selected.getDate();
        const selectedMonth = selected.getMonth();
        const classes = `${selectedDay === ((i * 7 + j) - weekDay + 1) && selectedMonth === today.getMonth() ? 'selected' : ''}`
        return <p
            className={classes}>{i * 7 + j >= weekDay && i * 7 + j < lastDay.getDate() + weekDay ? i * 7 + j - weekDay + 1 : ''}</p>
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
            {dateService.getCalendarFormat({
                monthFromToday: modalMonthFromToday,
                selectedDateRef,
                changeDayEventListener,
                renderDay,
                isModal: true
            })}
            </tbody>
        </ModalTable>
    )
}
