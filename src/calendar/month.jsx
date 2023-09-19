import {useRecoilState} from 'recoil'

import {currentMonthAtom} from './atoms';

// 상단 년,월 표시
export default function ShowMonth({today, monthOnClick}) {
    const [currentMonth, setCurrentMonth] = useRecoilState(currentMonthAtom);
    const monthFromToday = (today.getMonth() + currentMonth) % 12 + 1;

    return (
        <div key={'month'} className='calendar-month'>
            <p>
                {(today.getFullYear() + (parseInt(Math.floor((today.getMonth() + currentMonth) / 12))) + '년 ') + (monthFromToday > 0 ? monthFromToday : 12 - ((monthFromToday * -1) % 12)) + '월'}
            </p>
            <div>
                <button className='PrevMonthBtn' onClick={() => monthOnClick(false)}>&laquo;</button>
                <button className='NextMonthBtn' onClick={() => monthOnClick(true)}>&raquo;</button>
            </div>
        </div>
    )
}