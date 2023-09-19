import {atom} from 'recoil'

export const currentMonthAtom = atom({
    key: 'currentMonth',
    default: 0,
});

export const deleteStateAtom = atom({
    key: 'deleteState',
    default: -1,
});

export const modifyStateAtom = atom({
    key: 'modifyState',
    default: -1,
});

export const todoModifyInputDisplayAtom1 = atom({
    key: 'todoModifyInputDisplay1',
    default: false,
});

export const todoModifyInputDisplayAtom2 = atom({
    key: 'todoModifyInputDisplay2',
    default: false,
});

export const todoModifyInputDisplayAtom3 = atom({
    key: 'todoModifyInputDisplay3',
    default: false,
});

export const changeDayStateAtom = atom({
    key: 'changeDayState',
    default: false,
});

export const changeDayStateValueAtom = atom({
    key: 'changeDayStateValue',
    default: 0,
});

export const changeDayCurrentMonthAtom = atom({
    key: 'changeDayCurrentMonth',
    default: 0,
});

export const changeDaySelectDateAtom = atom({
    key: 'changeDaySelectDate',
    default: new Date().getDate(),
});

export const todoMemoAtom = atom({
    key: 'todoMemo',
    default: false,
});

export const todoMemoValueAtom = atom({
    key: 'todoMemoValue',
    default: '',
});

export const selectDayAtom = atom({
    key: 'selectDay',
    default: new Date().getDate(),
});

export const isShowModalAtom = atom({
    key: 'isShowModal',
    default: false,
});

export const todoModifyNthAtom = atom({
    key: 'todoModifyNth',
    default: 0,
})

export const todoDeleteNthAtom = atom({
    key: 'todoDeleteNth',
    default: 0,
})
export const modalCurrentMonthAtom = atom({
    key: 'modalCurrentMonth',
    default: 0,
});

