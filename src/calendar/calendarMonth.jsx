import {StyledCalendarMonth} from "../styles/style.js";
import {DateService} from "./services/dateService.jsx";

// 상단 년,월 표시
export default function CalendarMonth({today, monthFromToday, onCurrentMonthChange, setSelectedDay, selectedDateRef}) {

    const currentMonth = (today.getMonth() + monthFromToday) % 12 + 1;
    const dateService = new DateService(today);

    function handleMonthClick(isNext) {
        let select;
        if (isNext) {
            select = '1';
            onCurrentMonthChange(monthFromToday + 1);
        } else {
            select = `${new Date(today.getFullYear(), today.getMonth() + monthFromToday, 0).getDate()}`;
            onCurrentMonthChange(monthFromToday - 1);
        }
        const tdObject = dateService.getTdObject(select, selectedDateRef);
        const selected = tdObject['selected'];
        const dayDOM = tdObject['dayDOM'];
        if (selected) {
            setSelectedDay(select);
            selected.classList.remove('selected');
            dayDOM.classList.add('selected');
        }
    }

    return (
        <StyledCalendarMonth key={'month'}>
            <p>
                {(today.getFullYear() + (Math.floor((today.getMonth() + monthFromToday) / 12))) + '년 ' + (currentMonth > 0 ? currentMonth : 12 - ((currentMonth * -1) % 12)) + '월'}
            </p>
            <div>
                <button className='PrevMonthBtn' onClick={() => handleMonthClick(false)}><i className="fa-solid fa-chevron-left"></i></button>
                <button className='NextMonthBtn' onClick={() => handleMonthClick(true)}><i className="fa-solid fa-chevron-right"></i></button>
            </div>
        </StyledCalendarMonth>
    )
}