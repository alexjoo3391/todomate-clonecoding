import {DateService} from "./dateService.jsx";

export class DiaryService extends DateService {

    isDiaryHaveProperty () {
        return sessionStorage.hasOwnProperty(`diary${this.getDayString()}`);
    }

    setDiaryItem(value) {
        sessionStorage.setItem(`diary${this.getDayString()}`, value);
    }

    removeDiaryItem() {
        sessionStorage.removeItem(`diary${this.getDayString()}`);
    }

    getDiaryValue () {
        return JSON.parse(sessionStorage.getItem(`diary${this.getDayString()}`));
    }
}