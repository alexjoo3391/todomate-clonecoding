
export default function ModalMonth({today, modalCurrentMonth, setModalCurrentMonth}) {
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
                <button className='PrevMonthBtn' onClick={() => monthOnClick(false)}><i className="fa-solid fa-chevron-left"></i></button>
                <button className='NextMonthBtn' onClick={() => monthOnClick(true)}><i className="fa-solid fa-chevron-right"></i></button>
            </div>
        </div>
    )
}