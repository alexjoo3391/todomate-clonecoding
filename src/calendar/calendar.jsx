import ShowDate from "./date";
import ShowMonth from "./month";
import ShowTodo from "./todo";
import ShowModal from "./modal";

import {useEffect, useRef, useState} from 'react'

import { deleteStateAtom, isShowModalAtom, modifyStateAtom} from "./atoms";

import {useRecoilState} from 'recoil'
import ShowDiary from "./diary.jsx";

export default function Calendar() {

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(0);
    const [selectDay, setSelectDay] = useState(today.getDate());
    const [todoItems, setTodoItems] = useState({...sessionStorage});
    const [isShowModal, setIsShowModal] = useRecoilState(isShowModalAtom);

    const [todoDelete, setTodoDelete] = useRecoilState(deleteStateAtom);
    const [todoModify, setTodoModify] = useRecoilState(modifyStateAtom);

    const [todoRadio, setTodoRadio] = useState(true);
    const [todoDiary, setTodoDiary] = useState(0);

    function tdEventListener(e) {
        if(todoRadio) {
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
                    let newDay = document.querySelector(`.td${e.target.id} p`);
                    setSelectDay(newDay.innerText);
                    newDay.classList.add('selected');
                }
            }
        } else {
            let day = e.target.innerText;
            if (day === '' || e.target.nodeName !== 'P') {
                day = e.target.id;
            }

            if(parseInt(day) > today.getDate()) {
                alert('미래의 일기는 작성할 수 없습니다');
            } else {
                setTodoDiary(day);
            }
        }
    }

    function reloadTodoItems() {
        setTodoItems({...sessionStorage});
        setTodoDelete(-1);
        setTodoModify(-1);
    }

    function turnModal(n) {
        setIsShowModal(n);
    }

    function setMonth(n) {
        setCurrentMonth(n);
    }

    function setDay(n) {
        setSelectDay(n);
    }

    function todoRadioCheck(e) {
        if(e.target.value === 'on') {
            setTodoRadio(true);
        }
    }

    function diaryRadioCheck(e) {
        if(e.target.value === 'on') {
            setTodoRadio(false);
        }
    }

    function diaryCancel() {
        setTodoDiary(0);
    }

    function diaryConfirm(val, emoji) {
        const date = new Date(today.getFullYear(), today.getMonth() + currentMonth, todoDiary);
        const dayString = date.getFullYear().toString()
            + (('0' + (date.getMonth() + 1)).slice(-2)).toString()
            + (('0' + date.getDate()).slice(-2)).toString();

        if (val !== '' && emoji !== '🫥') {
            sessionStorage.setItem(`diary${dayString}`, JSON.stringify([emoji, val]));
            setTodoDiary(0);
        } else if (emoji === '🫥') {
            alert('이모지를 입력해 주세요');
        } else if (val === '') {
            alert('텍스트를 입력해 주세요');
        }
    }

    return todoDiary !== 0
        ? <div>
            <ShowDiary day={todoDiary} currentMonth={currentMonth} diaryCancel={diaryCancel} diaryConfirm={diaryConfirm}/>
        </div>
        : <div className='calendar'>
            <ShowMonth today={today} currentMonth={currentMonth} setCurrentMonth={setMonth} setSelectDay={setDay}/>
            <ShowDate today={today} tdEventListener={tdEventListener} todoItems={todoItems} currentMonth={currentMonth} selectDay={selectDay} todoRadio={todoRadio} day={todoDiary}/>
            <div>
                <input type='radio' name='todoRadio' id='todoRadio' onChange={(e) => todoRadioCheck(e)} checked={todoRadio}/><label htmlFor='todoRadio'>할 일</label>
                <input type='radio' name='todoRadio' id='diaryRadio' onChange={(e) => diaryRadioCheck(e)} checked={!todoRadio}/><label htmlFor='diaryRadio'>일기</label>
            </div>
            <ShowTodo today={today} reloadTodoItems={reloadTodoItems} turnModal={turnModal} currentMonth={currentMonth} selectDay={selectDay}/>
            <ShowModal currentMonth={currentMonth}/>
        </div>
}