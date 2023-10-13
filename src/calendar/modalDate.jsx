
// 달력 표시
import {ModalTable, Table} from "../styles/style.js";

export default function ModalDate({today, tdEventListener, todoItems = [], modalMonthFromToday}) {

    const firstDay = new Date(today.getFullYear(), today.getMonth() + modalMonthFromToday, 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + modalMonthFromToday + 1, 0);
    const weekDay = (firstDay.getDay() ? firstDay.getDay() : 7);
    const weeks = Math.ceil((weekDay + lastDay.getDate() - 1) / 7);

    const selectDay = new Date(today.getFullYear(), today.getMonth() + modalMonthFromToday, parseInt(document.querySelector('.selected').innerText)).getDate();

    const days = [];
    for (let i = 0; i < weeks; i++) {
        let week = [];
        for (let j = 1; j <= 7; j++) {
            const classes = `${selectDay === ((i * 7 + j) - weekDay + 1) ? 'selected' : ''}`

            week.push(
                <td key={i * 7 + j} className={`td ${'td' + ((i * 7 + j) - weekDay + 1).toString()}`}
                    onClick={(e) => tdEventListener(e)}>
                    <p className={classes}>{i * 7 + j >= weekDay && i * 7 + j < lastDay.getDate() + weekDay ? i * 7 + j - weekDay + 1 : ''}</p>

                </td>
            );
        }
        days.push(<tr key={'tr' + i}>{week}</tr>);
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
            {days}
            </tbody>
        </ModalTable>
    )
}
