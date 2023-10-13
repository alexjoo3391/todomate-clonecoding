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



}