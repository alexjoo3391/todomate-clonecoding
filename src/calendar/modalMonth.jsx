
export default function ShowModalMonth({today, modalCurrentMonth, setModalCurrentMonth}) {
    const monthFromToday = (today.getMonth() + modalCurrentMonth) % 12 + 1;

    function monthOnClick(pn) {
        if (pn) {
            setModalCurrentMonth(modalCurrentMonth + 1);
        } else {
            setModalCurrentMonth(modalCurrentMonth - 1);
        }
    }


    return (
        <div key={'month'} className='calendar-month'>
            <p>
                {(today.getFullYear() + (Math.floor((today.getMonth() + modalCurrentMonth) / 12)) + '년 ') + (monthFromToday > 0 ? monthFromToday : 12 - ((monthFromToday * -1) % 12)) + '월'}
            </p>
            <div>
                <button className='PrevMonthBtn' onClick={() => monthOnClick(false)}>&laquo;</button>
                <button className='NextMonthBtn' onClick={() => monthOnClick(true)}>&raquo;</button>
            </div>
        </div>
    )
}