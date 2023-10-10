import {useRecoilState} from 'recoil'

import {
    changeDayStateAtom,
    deleteStateAtom,
    isShowModalAtom,
    modifyStateAtom,
    todoMemoAtom,
    todoMemoValueAtom,
    todoModifyInputDisplayAtom,
    todoModifyNthAtom,
} from './atoms';

import ShowModalMonth from "./modalMonth.jsx";
import ShowModalDate from "./modalDate.jsx";
import ShowMemo from "./memo.jsx";
import {useState} from "react";

// 모달 표시 
export default function ShowModal({currentMonth}) {

    const [todoModify, setTodoModify] = useRecoilState(modifyStateAtom);
    const [todoDelete, setTodoDelete] = useRecoilState(deleteStateAtom);
    const [todoChangeDay, setTodoChangeDay] = useRecoilState(changeDayStateAtom);
    const [todoMemo, setTodoMemo] = useRecoilState(todoMemoAtom);
    const [todoMemoValue, setTodoMemoValue] = useRecoilState(todoMemoValueAtom);
    const [todoModifyInputDisplay, setTodoModifyInputDisplay] = useRecoilState(todoModifyInputDisplayAtom);
    const [isShowModal, setIsShowModal] = useRecoilState(isShowModalAtom);
    const [todoModifyNth, setTodoModifyNth] = useRecoilState(todoModifyNthAtom);
    const [modalCurrentMonth, setModalCurrentMonth] = useState(0);

    function modalModify(e) {
        e.stopPropagation();
        setIsShowModal(-1);
        setTodoModify(todoModify * -1 - 2);
        if (todoModifyNth === 1) {
            setTodoModifyInputDisplay([true, false, false]);
        } else {
            if (todoModifyNth === 2) {
                setTodoModifyInputDisplay([false, true, false]);
            } else {
                setTodoModifyInputDisplay([false, false, true]);
            }
        }
    }

    function modalDelete() {
        setIsShowModal(-1);
        setTodoDelete(todoDelete * -1 - 2);
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

        const val = JSON.parse(sessionStorage.getItem(`todo${todoModifyNth}${dayString}`))[todoDelete * -1 - 2];
        const valCheck = JSON.parse(sessionStorage.getItem(`todoCheck${todoModifyNth}${dayString}`))[todoDelete * -1 - 2];
        const memo = JSON.parse(sessionStorage.getItem(`todoMemo${todoModifyNth}${dayString}`))[todoDelete * -1 - 2];
        const memoCheck = JSON.parse(sessionStorage.getItem(`todoMemoCheck${todoModifyNth}${dayString}`))[todoDelete * -1 - 2];

        const todo = JSON.parse(sessionStorage.getItem(`todo${todoModifyNth}${selectedDayString}`));
        const todoCheck = JSON.parse(sessionStorage.getItem(`todoCheck${todoModifyNth}${selectedDayString}`));
        const todoMemo = JSON.parse(sessionStorage.getItem(`todoMemo${todoModifyNth}${selectedDayString}`));
        const todoMemoCheck = JSON.parse(sessionStorage.getItem(`todoMemoCheck${todoModifyNth}${selectedDayString}`));

        sessionStorage.setItem(`todo${todoModifyNth}${selectedDayString}`, todo ? JSON.stringify(todo.concat(val)) : JSON.stringify([val]));
        sessionStorage.setItem(`todoCheck${todoModifyNth}${selectedDayString}`, todoCheck ? JSON.stringify(todoCheck.concat(valCheck)) : JSON.stringify([valCheck]));
        sessionStorage.setItem(`todoMemo${todoModifyNth}${selectedDayString}`, todoMemo ? JSON.stringify(todoMemo.concat(memo)) : JSON.stringify([memo]));
        sessionStorage.setItem(`todoMemoCheck${todoModifyNth}${selectedDayString}`, todoMemoCheck ? JSON.stringify(todoMemoCheck.concat(memoCheck)) : JSON.stringify([memoCheck]));
        modalDelete();
        setTodoChangeDay(false);
    }

    function memoConfirm() {
        const memoValue = document.querySelector('#memo').value;
        const selectedDate = new Date(today.getFullYear(), today.getMonth() + modalCurrentMonth, parseInt(document.querySelector('.selected').innerText));
        const selectedDayString = selectedDate.getFullYear().toString()
            + (('0' + (selectedDate.getMonth() + 1)).slice(-2)).toString()
            + (('0' + selectedDate.getDate()).slice(-2)).toString();

        const memo = JSON.parse(sessionStorage.getItem(`todoMemo${todoModifyNth}${selectedDayString}`));
        const memoCheck = JSON.parse(sessionStorage.getItem(`todoMemoCheck${todoModifyNth}${selectedDayString}`));

        const i = isShowModal;

        setTodoMemoValue(memoValue);
        sessionStorage.setItem(`todoMemoCheck${todoModifyNth}${selectedDayString}`, JSON.stringify(memoCheck.slice(0, i).concat(1, memoCheck.slice(i + 1))));
        sessionStorage.setItem(`todoMemo${todoModifyNth}${selectedDayString}`, JSON.stringify(memo.slice(0, i).concat(memoValue, memo.slice(i + 1))));
        setTodoMemo(false);
        setIsShowModal(-1);
    }

    function setModalMonth(n) {
        setModalCurrentMonth(n);
    }

    function memoDelete() {
        const selectedDate = new Date(today.getFullYear(), today.getMonth() + modalCurrentMonth, parseInt(document.querySelector('.selected').innerText));
        const selectedDayString = selectedDate.getFullYear().toString()
            + (('0' + (selectedDate.getMonth() + 1)).slice(-2)).toString()
            + (('0' + selectedDate.getDate()).slice(-2)).toString();

        const memo = JSON.parse(sessionStorage.getItem(`todoMemo${todoModifyNth}${selectedDayString}`));
        const memoCheck = JSON.parse(sessionStorage.getItem(`todoMemoCheck${todoModifyNth}${selectedDayString}`));

        const i = isShowModal;

        sessionStorage.setItem(`todoMemoCheck${todoModifyNth}${selectedDayString}`, JSON.stringify(memoCheck.slice(0, i).concat(0, memoCheck.slice(i + 1))));
        sessionStorage.setItem(`todoMemo${todoModifyNth}${selectedDayString}`, JSON.stringify(memo.slice(0, i).concat(0, memo.slice(i + 1))));
        setTodoMemo(false);
        setIsShowModal(-1);
        setTodoMemoValue(JSON.parse(sessionStorage.getItem(`todoMemo${todoModifyNth}${selectedDayString}`)));
    }

    const today = new Date();

    let memoShow = '';
    const memoModalValue = todoMemoValue[isShowModal] ? todoMemoValue[isShowModal] : null;
    if(memoModalValue !== null) {
        memoShow = (
            <pre className='memoShow'>
                {memoModalValue}
            </pre>
        );

    }

    const modal = todoChangeDay
        ? <>
            <div className='modal' >
                <ShowModalMonth today={today} modalCurrentMonth={modalCurrentMonth} setModalCurrentMonth={setModalMonth}/>
                <ShowModalDate today={today} tdEventListener={tdEventListener} modalCurrentMonth={modalCurrentMonth}/>
            </div>
        </>
        : todoMemo
        ? <>
            <div className='modal'>
                <ShowMemo memoConfirm={memoConfirm} memoDelete={memoDelete} memoModalValue={memoModalValue}/>
            </div>
        </>
        : <>
            <div className='modal' >
                <div className='modifyDelete'>
                    <button onClick={(e) => modalModify(e)}><i className="fa-solid fa-pencil"></i><br />수정하기</button>
                    <button onClick={modalDelete}><i className="fa-solid fa-trash-can"></i><br />삭제하기</button>
                </div>
                <button onClick={modalChangeDay}><div><i className="fa-solid fa-arrow-turn-down"></i></div>날짜 바꾸기</button>
                <button onClick={modalMemo}><div><i className="fa-regular fa-square-minus"></i></div>메모</button>
                {memoShow}
            </div>
        </>

    return (
        <div key={'modal'} className={`modal-container ${isShowModal !== -1 ? 'modalShow' : ''}`}>
            {modal}
        </div>
    );
}
