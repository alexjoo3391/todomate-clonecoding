import {atom} from 'recoil'


export const deleteStateAtom = atom({
    key: 'deleteState',
    default: -1,
});

export const modifyStateAtom = atom({
    key: 'modifyState',
    default: -1,
});

export const modifyingTodoInputDisplayAtom = atom({
    key: 'todoModifyInputDisplay',
    default: [false, false, false],
});

export const changeDayStateAtom = atom({
    key: 'changeDayState',
    default: false,
});

export const todoMemoAtom = atom({
    key: 'todoMemo',
    default: false,
});

export const todoMemoValueAtom = atom({
    key: 'todoMemoValue',
    default: '',
});

export const isModalOpenAtom = atom({
    key: 'isModalOpen',
    default: -1,
});

export const modifyingTodoIndexAtom = atom({
    key: 'todoModifyIndex',
    default: 0,
})

