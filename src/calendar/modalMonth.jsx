import {useRecoilState} from 'recoil'

import { modalCurrentMonthAtom } from './atoms';

export default function ShowModalMonth({today, monthOnClick}) {
    const [modalCurrentMonth, setModalCurrentMonth] = useRecoilState(modalCurrentMonthAtom);
    const monthFromToday = (today.getMonth() + modalCurrentMonthAtom) % 12 + 1;

    return (
        <div key={'month'} className='calendar-month'>
            <p>
                {(today.getFullYear() + (parseInt(Math.floor((today.getMonth() + modalCurrentMonth) / 12))) + '년 ') + (monthFromToday > 0 ? monthFromToday : 12 - ((monthFromToday * -1) % 12)) + '월'}
            </p>
            <div>
                <button className='PrevMonthBtn' onClick={() => monthOnClick(false)}>&laquo;</button>
                <button className='NextMonthBtn' onClick={() => monthOnClick(true)}>&raquo;</button>
            </div>
        </div>
    )
}