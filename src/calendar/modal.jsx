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
import {ObjectService} from "./services/objectService.js";

// 모달 표시 
export default function Modal({monthFromToday, selectedDay}) {

    const [modifyingTodo, setModifyingTodo] = useRecoilState(modifyStateAtom);
    const [deletingTodo, setDeletingTodo] = useRecoilState(deleteStateAtom);
    const [todoChangeDay, setTodoChangeDay] = useRecoilState(changeDayStateAtom);
    const [todoMemo, setTodoMemo] = useRecoilState(todoMemoAtom);
    const [todoMemoValue, setTodoMemoValue] = useRecoilState(todoMemoValueAtom);
    const [modifyingTodoInputDisplay, setModifyingTodoInputDisplay] = useRecoilState(modifyingTodoInputDisplayAtom);
    const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenAtom);
    const [modifyingTodoIndex, setModifyingTodoIndex] = useRecoilState(modifyingTodoIndexAtom);
    const [modalMonthFromToday, setModalMonthFromToday] = useState(0);

    function getBooleanArrayByIndex(index) {
        const booleanArray = [false, false, false];
        booleanArray[index] = true;
        return booleanArray;
    }

    function openModifyModal(e) {
        e.stopPropagation();
        setIsModalOpen(-1);
        setModifyingTodo(modifyingTodo * -1 - 2);
        if (modifyingTodoIndex === 1) {
            setModifyingTodoInputDisplay(getBooleanArrayByIndex(0));
        } else {
            if (modifyingTodoIndex === 2) {
                setModifyingTodoInputDisplay(getBooleanArrayByIndex(1));
            } else {
                setModifyingTodoInputDisplay(getBooleanArrayByIndex(2));
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

    function getArrayIfIsNull(value) {
        if(value === null) {
            return [];
        }
        return value;
    }

    function tdEventListener(e) {
        const selectDate = new Date(today.getFullYear(), today.getMonth() + monthFromToday, parseInt(document.querySelector('.selected').innerText));
        const selectedDate = new Date(today.getFullYear(), today.getMonth() + modalMonthFromToday, parseInt(e.target.innerText))

        const objectService = new ObjectService(selectDate);
        const selectedObjectService = new ObjectService(selectedDate);

        const todoValue = objectService.getObjectValue('todo')[modifyingTodoIndex - 1][deletingTodo * -1 - 2];
        const todoCheckValue = objectService.getObjectValue('todoCheck')[modifyingTodoIndex - 1][deletingTodo * -1 - 2];
        const memoValue = objectService.getObjectValue('memo')[modifyingTodoIndex - 1][deletingTodo * -1 - 2];
        const memoCheckValue = objectService.getObjectValue('memoCheck')[modifyingTodoIndex - 1][deletingTodo * -1 - 2];

        const newTodoValue = getArrayIfIsNull(selectedObjectService.getObjectValue('todo')[modifyingTodoIndex - 1]);
        const newTodoCheckValue = getArrayIfIsNull(selectedObjectService.getObjectValue('todoCheck')[modifyingTodoIndex - 1]);
        const newMemoValue = getArrayIfIsNull(selectedObjectService.getObjectValue('memo')[modifyingTodoIndex - 1]);
        const newMemoCheckValue = getArrayIfIsNull(selectedObjectService.getObjectValue('memoCheck')[modifyingTodoIndex - 1]);



        const todoObject = objectService.getChangedObject({
            n : modifyingTodoIndex,
            todoValue : newTodoValue.concat(todoValue),
            todoCheckValue : newTodoCheckValue.concat(todoCheckValue),
            memoValue : newMemoValue.concat(memoValue),
            memoCheckValue : newMemoCheckValue.concat(memoCheckValue)
        });

        const todoObjectIsOnly = objectService.getChangedObject({ // 바꾸는 날의 일정이 없을 때
            n : modifyingTodoIndex,
            todoValue,
            todoCheckValue,
            memoValue,
            memoCheckValue
        });

        selectedObjectService.setObjectItem(modifyingTodoIndex, newTodoValue ? JSON.stringify(todoObject[modifyingTodoIndex - 1]) : JSON.stringify(todoObjectIsOnly[modifyingTodoIndex - 1]));
        modalDelete();
        setTodoChangeDay(false);
    }

    function memoConfirm(formValue) {
        const memoValueString = formValue;
        if(memoValueString !== '') {
            const selectedDate = new Date(today.getFullYear(), today.getMonth() + modalMonthFromToday, selectedDay);
            const objectService = new ObjectService(selectedDate);

            const memoValue = objectService.getObjectValue('memo')[modifyingTodoIndex - 1];
            const memoCheckValue = objectService.getObjectValue('memoCheck')[modifyingTodoIndex - 1];

            const objectValue = objectService.getChangedObject({
                n : modifyingTodoIndex,
                todoValue : null,
                todoCheckValue : null,
                memoValue : memoValue.slice(0, isModalOpen).concat(memoValueString, memoValue.slice(isModalOpen + 1)),
                memoCheckValue : memoCheckValue.slice(0, isModalOpen).concat(1, memoCheckValue.slice(isModalOpen + 1))
            })
            console.log(objectValue);

            objectService.setObjectItem(modifyingTodoIndex, JSON.stringify(objectValue[modifyingTodoIndex - 1]));
        }
        setTodoMemo(false);
        setIsModalOpen(-1);
    }

    function setModalMonth(n) {
        setModalMonthFromToday(n);
    }

    function memoDelete() {
        const selectedDate = new Date(today.getFullYear(), today.getMonth() + modalMonthFromToday, parseInt(document.querySelector('.selected').innerText));
        const objectService = new ObjectService(selectedDate);
        const selectedDayString = objectService.getDayString();


        const memoValue = objectService.getObjectValue('memo')[modifyingTodoIndex - 1];
        const memoCheckValue = objectService.getObjectValue('memoCheck')[modifyingTodoIndex - 1];

        const objectValue = objectService.getChangedObject({
            n : modifyingTodoIndex,
            todoValue : null,
            todoCheckValue : null,
            memoValue : memoValue.slice(0, isModalOpen).concat(0, memoValue.slice(isModalOpen + 1)),
            memoCheckValue : memoCheckValue.slice(0, isModalOpen).concat(0, memoCheckValue.slice(isModalOpen + 1))
        })

        objectService.setObjectItem(modifyingTodoIndex, selectedDayString, JSON.stringify(objectValue[modifyingTodoIndex - 1]));

        setTodoMemo(false);
        setIsModalOpen(-1);
        setTodoMemoValue(objectService.getObjectValue('memo')[modifyingTodoIndex]);
    }

    const today = new Date();
    const memoModalValue = isModalOpen !== -1 && todoMemoValue[isModalOpen] ? todoMemoValue[isModalOpen] : null;

    const modal = todoChangeDay
        ? <StyledModal>
            <ModalMonth today={today} modalMonthFromToday={modalMonthFromToday} setModalMonthFromToday={setModalMonth}/>
            <ModalDate today={today} tdEventListener={tdEventListener} modalMonthFromToday={modalMonthFromToday}/>
        </StyledModal>
        : todoMemo
        ? <StyledModal>
            <Memo memoConfirm={memoConfirm} memoDelete={memoDelete} memoModalValue={memoModalValue}/>
        </StyledModal>
        : <>
            <StyledModal className='modal'>
                <ModalMenu>
                    <button onClick={(e) => openModifyModal(e)}><i className="fa-solid fa-pencil"></i><br />수정하기</button>
                    <button onClick={modalDelete}><i className="fa-solid fa-trash-can"></i><br />삭제하기</button>
                </ModalMenu>
                <button onClick={modalChangeDay}><div><i className="fa-solid fa-arrow-turn-down"></i></div>날짜 바꾸기</button>
                <button onClick={modalMemo}><div><i className="fa-regular fa-square-minus"></i></div>메모</button>
                <MemoShow memoModalValue={memoModalValue}/>
            </StyledModal>
        </>

    return (
        <ModalContainer key={'modal'} className={`modal-container ${isModalOpen !== -1 ? 'modalShow' : ''}`}>
            {modal}
        </ModalContainer>
    );
}

function MemoShow({memoModalValue}) {
    let memoShow = '';
    if(memoModalValue !== null) {
        memoShow = (
            <MemoBox>
                {memoModalValue}
            </MemoBox>
        );

    }

    return memoShow;
}