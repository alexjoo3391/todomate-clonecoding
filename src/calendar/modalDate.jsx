import {useRecoilState} from 'recoil'

import {modalCurrentMonthAtom, selectDayAtom} from './atoms';

// 달력 표시
export default function ShowModalDate({today, tdEventListener, todoItems = []}) {

    const [selectDay, setSelectDay] = useRecoilState(selectDayAtom);
    const [modalCurrentMonth, setModalCurrentMonth] = useRecoilState(modalCurrentMonthAtom);

    const firstDay = new Date(today.getFullYear(), today.getMonth() + modalCurrentMonth, 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + modalCurrentMonth + 1, 0);
    const weekDay = (firstDay.getDay() ? firstDay.getDay() : 7);
    const weeks = Math.ceil((weekDay + lastDay.getDate() - 1) / 7);


    const days = [];
    for (let i = 0; i < weeks; i++) {
        let week = [];
        for (let j = 1; j <= 7; j++) {
            const classes = `${(i * 7 + j) - weekDay + 1 === today.getDate() && modalCurrentMonth === today.getMonth() - today.getMonth() ? 'today' : ''}`

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
        <table key={'date'} className={'modalTable'}>
            <thead>
            <tr key={'trh'}>
                <th key={'h0'}>월</th>
                <th key={'h1'}>화</th>
                <th key={'h2'}>수</th>
                <th key={'h3'}>목</th>
                <th key={'h4'}>금</th>
                <th key={'h5'}>토</th>
                <th key={'h6'}>일</th>
            </tr>
            </thead>
            <tbody>
            {days}
            </tbody>
        </table>
    )
}
