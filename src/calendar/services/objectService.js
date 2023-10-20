import {DateService} from "./dateService.jsx";

export class ObjectService extends DateService {

    getTodoObject() {
        return [
            JSON.parse(sessionStorage.getItem(`todo1${this.getDayString()}`)),
            JSON.parse(sessionStorage.getItem(`todo2${this.getDayString()}`)),
            JSON.parse(sessionStorage.getItem(`todo3${this.getDayString()}`))
        ];
    }

    setObjectItem(n, value) {
        sessionStorage.setItem(`todo${n}${this.getDayString()}`, value);
    }

    removeObjectItem(n) {
        sessionStorage.removeItem(`todo${n}${this.getDayString()}`);
    }

    getObjectValue (key) {
        const todoObject = this.getTodoObject();

        return [null, null, null].map((_, index) => {
            if(todoObject[index] !== null) {
                return todoObject[index][key];
            }
            return null;
        })
    }

    getChangedObject ({n, todoValue, todoCheckValue, memoValue, memoCheckValue}) {
        const todoObject = this.getTodoObject();

        if(todoValue !== null) todoObject[n - 1].todo = todoValue;
        if(todoCheckValue !== null) todoObject[n - 1].todoCheck = todoCheckValue;
        if(memoValue !== null) todoObject[n - 1].memo = memoValue;
        if(memoCheckValue !== null) todoObject[n - 1].memoCheck = memoCheckValue;

        return todoObject;
    }
}