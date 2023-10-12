import {StyledCalendarMonth} from "../styles/style.js";

export default function ModalMonth({today, modalMonthFromToday, setModalMonthFromToday}) {
    const monthFromToday = (today.getMonth() + modalMonthFromToday) % 12 + 1;

    function monthOnClick(pn) {
        if (pn) {
            setModalMonthFromToday(modalMonthFromToday + 1);
        } else {
            setModalMonthFromToday(modalMonthFromToday - 1);
        }
    }


    return (
        <StyledCalendarMonth key={'month'} className='calendar-month'>
            <p>
                {(today.getFullYear() + (Math.floor((today.getMonth() + modalMonthFromToday) / 12)) + '년 ') + (monthFromToday > 0 ? monthFromToday : 12 - ((monthFromToday * -1) % 12)) + '월'}
            </p>
            <div>
                <button className='PrevMonthBtn' onClick={() => monthOnClick(false)}><i className="fa-solid fa-chevron-left"></i></button>
                <button className='NextMonthBtn' onClick={() => monthOnClick(true)}><i className="fa-solid fa-chevron-right"></i></button>
            </div>
        </StyledCalendarMonth>
    )
}