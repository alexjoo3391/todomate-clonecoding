import {useRecoilState} from 'recoil'

// 상단 년,월 표시
export default function CalendarMonth({today, currentMonth, setCurrentMonth, setSelectedDay}) {

    const monthFromToday = (today.getMonth() + currentMonth) % 12 + 1;

    function monthOnClick(pn) {
        let select;
        if (pn) {
            select = 1;
            setCurrentMonth(currentMonth + 1);
        } else {
            select = new Date(today.getFullYear(), today.getMonth() + currentMonth, 0).getDate();
            setCurrentMonth(currentMonth - 1);
        }
        const selected = document.querySelector('.selected');
        if (selected) {
            changeSelectDay(select);
            selected.classList.remove('selected');
            document.querySelector('.td' + select).classList.add('selected');
        }
    }

    function changeSelectDay(day) {
        setSelectedDay(day);
    }

    return (
        <div key={'month'} className='calendar-month'>
            <p>
                {(today.getFullYear() + (Math.floor((today.getMonth() + currentMonth) / 12))) + '년 ' + (monthFromToday > 0 ? monthFromToday : 12 - ((monthFromToday * -1) % 12)) + '월'}
            </p>
            <div>
                <button className='PrevMonthBtn' onClick={() => monthOnClick(false)}><i className="fa-solid fa-chevron-left"></i></button>
                <button className='NextMonthBtn' onClick={() => monthOnClick(true)}><i className="fa-solid fa-chevron-right"></i></button>
            </div>
        </div>
    )
}