import {useRecoilState} from 'recoil'

import {
    changeDayStateAtom,
    changeDayStateValueAtom,
    deleteStateAtom,
    isShowModalAtom,
    modifyStateAtom,
    todoMemoAtom,
    todoMemoValueAtom,
    todoModifyInputDisplayAtom1,
    todoModifyInputDisplayAtom2,
    todoModifyInputDisplayAtom3,
    todoModifyNthAtom,
    modalCurrentMonthAtom,
} from './atoms';

import ShowModalMonth from "./modalMonth.jsx";
import ShowModalDate from "./modalDate.jsx";
import ShowMemo from "./memo.jsx";

// 모달 표시 
export default function ShowModal() {

    const [todoModify, setTodoModify] = useRecoilState(modifyStateAtom);
    const [todoDelete, setTodoDelete] = useRecoilState(deleteStateAtom);
    const [todoChangeDay, setTodoChangeDay] = useRecoilState(changeDayStateAtom);
    const [todoChangeDayValue, setTodoChangeDayValue] = useRecoilState(changeDayStateValueAtom);
    const [todoMemo, setTodoMemo] = useRecoilState(todoMemoAtom);
    const [todoMemoValue, setTodoMemoValue] = useRecoilState(todoMemoValueAtom);
    const [todoModifyInputDisplay1, setTodoModifyInputDisplay1] = useRecoilState(todoModifyInputDisplayAtom1);
    const [todoModifyInputDisplay2, setTodoModifyInputDisplay2] = useRecoilState(todoModifyInputDisplayAtom2);
    const [todoModifyInputDisplay3, setTodoModifyInputDisplay3] = useRecoilState(todoModifyInputDisplayAtom3);
    const [isShowModal, setIsShowModal] = useRecoilState(isShowModalAtom);
    const [todoModifyNth, setTodoModifyNth] = useRecoilState(todoModifyNthAtom);
    const [modalCurrentMonth, setModalCurrentMonth] = useRecoilState(modalCurrentMonthAtom);

    function modalModify(e) {
        e.stopPropagation();
        setIsShowModal(false);
        setTodoModify(todoModify * -1 - 2);
        if (todoModifyNth === 1) {
            setTodoModifyInputDisplay1(true);
        } else {
            if (todoModifyNth === 2) {
                setTodoModifyInputDisplay2(true);
            } else {
                setTodoModifyInputDisplay3(true);
            }
        }
    }

    function modalDelete() {
        setIsShowModal(false);
        setTodoDelete(todoDelete * -1 - 2);
    }

    function modalMemo() {
        setTodoMemo(true);
    }

    function modalChangeDay() {
        setTodoChangeDay(true);
    }

    function tdEventListener(e) {
        const selectDate = new Date(today.getFullYear(), today.getMonth() + modalCurrentMonth, parseInt(e.target.innerText));
        const selectedDate = new Date(today.getFullYear(), today.getMonth() + modalCurrentMonth, parseInt(document.querySelector('.selected').innerText))
        const dayString = selectDate.getFullYear().toString()
            + (('0' + (selectDate.getMonth() + 1)).slice(-2)).toString()
            + (('0' + selectDate.getDate()).slice(-2)).toString();
        const selectedDayString = selectedDate.getFullYear().toString()
            + (('0' + (selectedDate.getMonth() + 1)).slice(-2)).toString()
            + (('0' + selectedDate.getDate()).slice(-2)).toString();

        const val = JSON.parse(sessionStorage.getItem('todo' + todoModifyNth + '' + selectedDayString))[todoDelete * -1 - 2];
        const valCheck = JSON.parse(sessionStorage.getItem('todoCheck' + todoModifyNth + '' + selectedDayString))[todoDelete * -1 - 2];
        const memo = JSON.parse(sessionStorage.getItem('todoMemo' + todoModifyNth + '' + selectedDayString))[todoDelete * -1 - 2];
        const memoCheck = JSON.parse(sessionStorage.getItem('todoMemoCheck' + todoModifyNth + '' + selectedDayString))[todoDelete * -1 - 2];

        const todo = JSON.parse(sessionStorage.getItem('todo' + todoModifyNth + '' + dayString));
        const todoCheck = JSON.parse(sessionStorage.getItem('todoCheck' + todoModifyNth + '' + dayString));
        const todoMemo = JSON.parse(sessionStorage.getItem('todoMemo' + todoModifyNth + '' + dayString));
        const todoMemoCheck = JSON.parse(sessionStorage.getItem('todoMemoCheck' + todoModifyNth + '' + dayString));

        sessionStorage.setItem('todo' + todoModifyNth + '' + dayString, todo ? JSON.stringify(todo.concat(val)) : JSON.stringify([val]));
        sessionStorage.setItem('todoCheck' + todoModifyNth + '' + dayString, todoCheck ? JSON.stringify(todoCheck.concat(valCheck)) : JSON.stringify([valCheck]));
        sessionStorage.setItem('todoMemo' + todoModifyNth + '' + dayString, todoMemo ? JSON.stringify(todoMemo.concat(memo)) : JSON.stringify([memo]));
        sessionStorage.setItem('todoMemoCheck' + todoModifyNth + '' + dayString, todoMemoCheck ? JSON.stringify(todoMemoCheck.concat(memoCheck)) : JSON.stringify([memoCheck]));
        modalDelete();
        setTodoChangeDay(false);
    }

    function menuConfirm() {

    }

    const today = new Date();




    const modal = todoChangeDay ?
        <>
            <div className='modal' >
                <ShowModalMonth today={today}/>
                <ShowModalDate today={today} tdEventListener={tdEventListener}/>
            </div>
        </> :
        todoMemo ?
        <>
            <div className='modal'>
                <ShowMemo menuConfirm={menuConfirm}/>
            </div>
        </> :
        <>
            <div className='modal' >
                <button onClick={(e) => modalModify(e)}>수정</button>
                <button onClick={modalDelete}>삭제</button>
                <button onClick={modalMemo}>메모</button>
                <button onClick={modalChangeDay}>날짜바꾸기</button>
            </div>
        </>

    return (
        <div key={'modal'} className={`modal-container ${isShowModal ? 'modalShow' : ''}`}>
            {modal}
        </div>
    );
}
