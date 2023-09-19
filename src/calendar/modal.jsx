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
} from './atoms';
import ShowModalMonth from "./modalMonth.jsx";

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

    function modalModify(e) {
        e.stopPropagation();
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
        setTodoDelete(todoDelete * -1 - 2);
    }

    function modalMemo() {
        setTodoMemo(true);
    }

    function modalChangeDay() {
        setTodoChangeDay(true);
    }

    const today = new Date();

    const modal = todoChangeDay ?
        <>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                <ShowModalMonth today={today} monthOnClick={() => {}}/>
            </div>
        </> :
        <>
            <div className='modal'>
                <button onClick={(e) => modalModify(e)}>수정</button>
                <button onClick={modalDelete}>삭제</button>
                <button onClick={modalMemo}>메모</button>
                <button onClick={modalChangeDay}>날짜바꾸기</button>
            </div>
        </>

    const memoModal = (
        <>
            <div className='memo'>
                <textarea id="memo" cols="30" rows="10"></textarea>
            </div>
        </>
    )

    return (
        <div key={'modal'} className={`modal-container ${isShowModal ? 'modalShow' : ''}`}>
            {modal}
        </div>
    );
}
