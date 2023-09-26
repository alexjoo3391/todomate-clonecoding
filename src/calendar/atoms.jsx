import {atom} from 'recoil'


export const deleteStateAtom = atom({
    key: 'deleteState',
    default: -1,
});

export const modifyStateAtom = atom({
    key: 'modifyState',
    default: -1,
});

export const todoModifyInputDisplayAtom = atom({
    key: 'todoModifyInputDisplay',
    default: [false, false, false],
});

export const changeDayStateAtom = atom({
    key: 'changeDayState',
    default: false,
});

export const changeDayStateValueAtom = atom({
    key: 'changeDayStateValue',
    default: 0,
});

export const todoMemoAtom = atom({
    key: 'todoMemo',
    default: false,
});

export const todoMemoValueAtom = atom({
    key: 'todoMemoValue',
    default: '',
});

export const isShowModalAtom = atom({
    key: 'isShowModal',
    default: false,
});

export const todoModifyNthAtom = atom({
    key: 'todoModifyNth',
    default: 0,
})

