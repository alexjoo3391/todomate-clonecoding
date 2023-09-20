import ShowDate from "./date";
import ShowMonth from "./month";
import ShowTodo from "./todo";
import ShowModal from "./modal";

import {useState} from 'react'

import {currentMonthAtom, deleteStateAtom, isShowModalAtom, modifyStateAtom, selectDayAtom,} from "./atoms";

import {useRecoilState} from 'recoil'

export default function Calendar() {

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useRecoilState(currentMonthAtom);
    const [selectDay, setSelectDay] = useRecoilState(selectDayAtom);
    const [todoItems, setTodoItems] = useState({...sessionStorage});
    const [isShowModal, setIsShowModal] = useRecoilState(isShowModalAtom);

    const [todoDelete, setTodoDelete] = useRecoilState(deleteStateAtom);
    const [todoModify, setTodoModify] = useRecoilState(modifyStateAtom);

    function tdEventListener(e) {
        const day = e.target.innerText;
        if (day !== '' || e.target.nodeName === 'DIV') {
            const selected = document.querySelector('.selected');
            if (selected) {
                selected.classList.remove('selected');
            }

            if (day !== '' && e.target.nodeName === 'P') {
                setSelectDay(day);
                e.target.classList.add('selected')
            } else {
                let newDay = document.querySelector('.td' + e.target.id + ' p')
                setSelectDay(newDay.innerText);
                newDay.classList.add('selected');
            }
        }
    }

    function reloadTodoItems() {
        setTodoItems({...sessionStorage});
        setTodoDelete(-1);
        setTodoModify(-1);
    }

    function turnModal(pn) {
        setIsShowModal(pn);
    }

    return (
        <div className='calendar'>
            <ShowMonth today={today}/>
            <ShowDate today={today} tdEventListener={tdEventListener} todoItems={todoItems}/>
            <ShowTodo today={today} reloadTodoItems={reloadTodoItems} turnModal={turnModal}/>
            <ShowModal/>
        </div>
    )
}