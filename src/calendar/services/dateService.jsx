import {Td} from "../../styles/style.js";

export class DateService {
    constructor(date) {
        this.date = date;
    }

    getWeekDay() {
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        return week[this.date.getDay()];
    }

    getDayString() {
        return this.date.getFullYear().toString()
            + (('0' + (this.date.getMonth() + 1)).slice(-2)).toString()
            + (('0' + this.date.getDate()).slice(-2)).toString();
    }

    dateDiff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    getCalendarFormat({monthFromToday, selectedDateRef, changeDayEventListener, dayRender, isModal}) {
        const firstDay = new Date(this.date.getFullYear(), this.date.getMonth() + monthFromToday, 1);
        const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + monthFromToday + 1, 0);
        const weekDay = (firstDay.getDay() ? firstDay.getDay() : 7);
        const weeks = Math.ceil((weekDay + lastDay.getDate() - 1) / 7);

        const days = [];
        for (let i = 0; i < weeks; i++) {
            let week = [];
            for (let j = 1; j <= 7; j++) {

                let td = ''

                if(isModal) {
                    td = <td key={i * 7 + j} className={`td ${'td' + ((i * 7 + j) - weekDay + 1).toString()}`} onClick={(e) => changeDayEventListener(e)}>
                        {dayRender(i, j, weekDay, lastDay)}
                    </td>
                } else {
                    td = <Td key={i * 7 + j} className={`td ${'td' + ((i * 7 + j) - weekDay + 1).toString()}`} onClick={(e) => changeDay(e)}>
                        {dayRender(i, j, weekDay, lastDay)}
                    </Td>
                }

                week.push(
                    td
                );
            }
            days.push(<tr key={`tr${i}`}>{week}</tr>);

        }

        function changeDay(e) {
            let day = ''
            let selected = null;
            let dayDOM = null;
            let dayEmoji = '🫥';

            if (e.target.nodeName === 'DIV') {
                day = e.target.id;
            } else if (e.target.innerText !== '' && e.target.nodeName === 'P') {
                day = e.target.innerText;
            }

            const tbody = selectedDateRef.current.children;
            for(let i = 0; i < tbody.length; i++) {
                for(let j = 0; j < 6; j++) {
                    const td = tbody[i].children[j];

                    if(td.children.length > 0) {
                        if(td.children[0].id === day) {
                            dayEmoji = td.children[0].innerText;
                        }
                        if(td.children[1].classList.contains('selected')) {
                            selected = td.children[1];
                        }
                        if(td.classList.contains(`td${day}`)) {
                            dayDOM = td.children[1].children[0];
                        }
                    }
                }
            }

            if(day !== '') {
                changeDayEventListener(day, selected, dayDOM, dayEmoji);
            }


        }

        return days;
    }

}