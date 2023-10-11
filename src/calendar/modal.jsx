import {useRecoilState} from 'recoil'

import {
    changeDayStateAtom,
    deleteStateAtom,
    isModalOpenAtom,
    modifyStateAtom,
    todoMemoAtom,
    todoMemoValueAtom,
    modifyingTodoInputDisplayAtom,
    modifyingTodoIndexAtom,
} from './atoms.js';

import ModalMonth from "./modalMonth.jsx";
import ModalDate from "./modalDate.jsx";
import Memo from "./memo.jsx";
import {useState} from "react";
import {MemoBox, ModalContainer, ModalMenu, StyledModal} from "../styles/style.js";

// 모달 표시 
export default function Modal({currentMonth, selectedDay}) {

    const [modifyingTodo, setModifyingTodo] = useRecoilState(modifyStateAtom);
    const [deletingTodo, setDeletingTodo] = useRecoilState(deleteStateAtom);
    const [todoChangeDay, setTodoChangeDay] = useRecoilState(changeDayStateAtom);
    const [todoMemo, setTodoMemo] = useRecoilState(todoMemoAtom);
    const [todoMemoValue, setTodoMemoValue] = useRecoilState(todoMemoValueAtom);
    const [modifyingTodoInputDisplay, setModifyingTodoInputDisplay] = useRecoilState(modifyingTodoInputDisplayAtom);
    const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenAtom);
    const [modifyingTodoIndex, setModifyingTodoIndex] = useRecoilState(modifyingTodoIndexAtom);
    const [modalCurrentMonth, setModalCurrentMonth] = useState(0);

    function modalModify(e) {
        e.stopPropagation();
        setIsModalOpen(-1);
        setModifyingTodo(modifyingTodo * -1 - 2);
        if (modifyingTodoIndex === 1) {
            setModifyingTodoInputDisplay([true, false, false]);
        } else {
            if (modifyingTodoIndex === 2) {
                setModifyingTodoInputDisplay([false, true, false]);
            } else {
                setModifyingTodoInputDisplay([false, false, true]);
            }
        }
    }

    function modalDelete() {
        setIsModalOpen(-1);
        setDeletingTodo(deletingTodo * -1 - 2);
    }

    function modalMemo() {
        setTodoMemo(true);
    }

    function modalChangeDay() {
        setTodoChangeDay(true);
    }

    function tdEventListener(e) {
        const selectDate = new Date(today.getFullYear(), today.getMonth() + currentMonth, parseInt(document.querySelector('.selected').innerText));
        const selectedDate = new Date(today.getFullYear(), today.getMonth() + modalCurrentMonth, parseInt(e.target.innerText))
        const dayString = selectDate.getFullYear().toString()
            + (('0' + (selectDate.getMonth() + 1)).slice(-2)).toString()
            + (('0' + selectDate.getDate()).slice(-2)).toString();
        const selectedDayString = selectedDate.getFullYear().toString()
            + (('0' + (selectedDate.getMonth() + 1)).slice(-2)).toString()
            + (('0' + selectedDate.getDate()).slice(-2)).toString();

        const val = JSON.parse(sessionStorage.getItem(`todo${modifyingTodoIndex}${dayString}`))[deletingTodo * -1 - 2];
        const valCheck = JSON.parse(sessionStorage.getItem(`todoCheck${modifyingTodoIndex}${dayString}`))[deletingTodo * -1 - 2];
        const memo = JSON.parse(sessionStorage.getItem(`todoMemo${modifyingTodoIndex}${dayString}`))[deletingTodo * -1 - 2];
        const memoCheck = JSON.parse(sessionStorage.getItem(`todoMemoCheck${modifyingTodoIndex}${dayString}`))[deletingTodo * -1 - 2];

        const todo = JSON.parse(sessionStorage.getItem(`todo${modifyingTodoIndex}${selectedDayString}`));
        const todoCheck = JSON.parse(sessionStorage.getItem(`todoCheck${modifyingTodoIndex}${selectedDayString}`));
        const todoMemo = JSON.parse(sessionStorage.getItem(`todoMemo${modifyingTodoIndex}${selectedDayString}`));
        const todoMemoCheck = JSON.parse(sessionStorage.getItem(`todoMemoCheck${modifyingTodoIndex}${selectedDayString}`));

        sessionStorage.setItem(`todo${modifyingTodoIndex}${selectedDayString}`, todo ? JSON.stringify(todo.concat(val)) : JSON.stringify([val]));
        sessionStorage.setItem(`todoCheck${modifyingTodoIndex}${selectedDayString}`, todoCheck ? JSON.stringify(todoCheck.concat(valCheck)) : JSON.stringify([valCheck]));
        sessionStorage.setItem(`todoMemo${modifyingTodoIndex}${selectedDayString}`, todoMemo ? JSON.stringify(todoMemo.concat(memo)) : JSON.stringify([memo]));
        sessionStorage.setItem(`todoMemoCheck${modifyingTodoIndex}${selectedDayString}`, todoMemoCheck ? JSON.stringify(todoMemoCheck.concat(memoCheck)) : JSON.stringify([memoCheck]));
        modalDelete();
        setTodoChangeDay(false);
    }

    function memoConfirm() {
        const memoValue = document.querySelector('#memo').value;
        if(memoValue !== '') {
            const selectedDate = new Date(today.getFullYear(), today.getMonth() + modalCurrentMonth, selectedDay);
            const selectedDayString = selectedDate.getFullYear().toString()
                + (('0' + (selectedDate.getMonth() + 1)).slice(-2)).toString()
                + (('0' + selectedDate.getDate()).slice(-2)).toString();

            const memo = JSON.parse(sessionStorage.getItem(`todoMemo${modifyingTodoIndex}${selectedDayString}`));
            const memoCheck = JSON.parse(sessionStorage.getItem(`todoMemoCheck${modifyingTodoIndex}${selectedDayString}`));

            const i = isModalOpen;

            setTodoMemoValue(memoValue);
            sessionStorage.setItem(`todoMemoCheck${modifyingTodoIndex}${selectedDayString}`, JSON.stringify(memoCheck.slice(0, i).concat(1, memoCheck.slice(i + 1))));
            sessionStorage.setItem(`todoMemo${modifyingTodoIndex}${selectedDayString}`, JSON.stringify(memo.slice(0, i).concat(memoValue, memo.slice(i + 1))));
        }
        setTodoMemo(false);
        setIsModalOpen(-1);
    }

    function setModalMonth(n) {
        setModalCurrentMonth(n);
    }

    function memoDelete() {
        const selectedDate = new Date(today.getFullYear(), today.getMonth() + modalCurrentMonth, parseInt(document.querySelector('.selected').innerText));
        const selectedDayString = selectedDate.getFullYear().toString()
            + (('0' + (selectedDate.getMonth() + 1)).slice(-2)).toString()
            + (('0' + selectedDate.getDate()).slice(-2)).toString();

        const memo = JSON.parse(sessionStorage.getItem(`todoMemo${modifyingTodoIndex}${selectedDayString}`));
        const memoCheck = JSON.parse(sessionStorage.getItem(`todoMemoCheck${modifyingTodoIndex}${selectedDayString}`));

        const i = isModalOpen;

        sessionStorage.setItem(`todoMemoCheck${modifyingTodoIndex}${selectedDayString}`, JSON.stringify(memoCheck.slice(0, i).concat(0, memoCheck.slice(i + 1))));
        sessionStorage.setItem(`todoMemo${modifyingTodoIndex}${selectedDayString}`, JSON.stringify(memo.slice(0, i).concat(0, memo.slice(i + 1))));
        setTodoMemo(false);
        setIsModalOpen(-1);
        setTodoMemoValue(JSON.parse(sessionStorage.getItem(`todoMemo${modifyingTodoIndex}${selectedDayString}`)));
    }

    const today = new Date();

    let memoShow = '';
    const memoModalValue = todoMemoValue[isModalOpen] ? todoMemoValue[isModalOpen] : null;
    if(memoModalValue !== null) {
        memoShow = (
            <MemoBox>
                {memoModalValue}
            </MemoBox>
        );

    }

    const modal = todoChangeDay
        ? <StyledModal>
            <ModalMonth today={today} modalCurrentMonth={modalCurrentMonth} setModalCurrentMonth={setModalMonth}/>
            <ModalDate today={today} tdEventListener={tdEventListener} modalCurrentMonth={modalCurrentMonth}/>
        </StyledModal>
        : todoMemo
        ? <StyledModal>
            <Memo memoConfirm={memoConfirm} memoDelete={memoDelete} memoModalValue={memoModalValue}/>
        </StyledModal>
        : <>
            <StyledModal className='modal'>
                <ModalMenu>
                    <button onClick={(e) => modalModify(e)}><i className="fa-solid fa-pencil"></i><br />수정하기</button>
                    <button onClick={modalDelete}><i className="fa-solid fa-trash-can"></i><br />삭제하기</button>
                </ModalMenu>
                <button onClick={modalChangeDay}><div><i className="fa-solid fa-arrow-turn-down"></i></div>날짜 바꾸기</button>
                <button onClick={modalMemo}><div><i className="fa-regular fa-square-minus"></i></div>메모</button>
                {memoShow}
            </StyledModal>
        </>

    return (
        <ModalContainer key={'modal'} className={`modal-container ${isModalOpen !== -1 ? 'modalShow' : ''}`}>
            {modal}
        </ModalContainer>
    );
}
