import React, {memo, useEffect} from 'react';
import {useState} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil'

import {
    deleteStateAtom,
    modifyStateAtom,
    modifyingTodoInputDisplayAtom,
    modifyingTodoIndexAtom,
    changeDayStateAtom,
    todoMemoAtom,
    todoMemoValueAtom,
} from './atoms.js';
import {StyledTodo, TextInput, TodoCheck, TodoCheckBox, TodoInput, TodoList, TodoMemo} from "../styles/style.js";
import {Util} from './util.js';

// 목표 리스트 표시
export default function Todo({today, reloadSessionTodoItemList, toggleModal, monthFromToday, selectedDay}) {

    const selectedDate = new Date(today.getFullYear(), today.getMonth() + monthFromToday, selectedDay);
    const util = new Util(selectedDate);
    const dayString = util.getDayString();

    const [inputDisplay, setInputDisplay] = useState([false, false, false]);

    const [modifyingTodo, setModifyingTodo] = useRecoilState(modifyStateAtom);
    const [deletingTodo, setDeletingTodo] = useRecoilState(deleteStateAtom);

    const [modifyingTodoInputDisplay, setModifyingTodoInputDisplay] = useRecoilState(modifyingTodoInputDisplayAtom);

    const setModifyingTodoIndex = useSetRecoilState(modifyingTodoIndexAtom);
    const [deletingTodoIndex, setDeletingTodoIndex] = useState(0);
    const setTodoChangeDay = useSetRecoilState(changeDayStateAtom);

    const setTodoMemo = useSetRecoilState(todoMemoAtom);
    const setTodoMemoValue = useSetRecoilState(todoMemoValueAtom);



    const newTodo = util.getObjectValue('todo');
    const newTodoCheck = util.getObjectValue('todoCheck');
    const newTodoMemo = util.getObjectValue('memo');
    const newTodoMemoCheck = util.getObjectValue('memoCheck');

    function enterCheck(e, func) {
        if (e.key === 'Enter') {
            func();
        }
    }

    function getTodoExtend(n) {

        const todoExtend = []
        if (newTodo) {
            const arr = newTodo[n - 1] ? newTodo[n - 1] : [];
            for (let i = 0; i < arr.length; i++) {

                let modifyInput = '';
                let selectModifyingTodoInput = n === 1 ? modifyingTodoInputDisplay[0] : n === 2 ? modifyingTodoInputDisplay[1] : modifyingTodoInputDisplay[2];
                if (modifyingTodo === i && selectModifyingTodoInput) {
                    modifyingTodoInput()
                    modifyInput = <TextInput className='modifyingTodoInput' type='text' defaultValue={arr[i]}
                                         onClick={(e) => e.stopPropagation()}
                                         onKeyUp={(e) => enterCheck(e, () => modifyingTodoConfirm(n, i))}/>;
                }

                const todoContent = modifyInput
                    ? modifyInput
                    : <p key={`todoArr${n}${i}`}>{arr[i]}</p>

                const modifyingTodoButton = modifyInput
                    ? <button onClick={() => modifyingTodoConfirm(n, i)}>+</button>
                    : <button key={`todoButton${n}${i}`} onClick={() => todoSetting(n, i)}>...</button>;

                let todoMemo = '';

                if(newTodoMemoCheck[n - 1][i] !== 0) {
                    todoMemo = <p><i className="fa-solid fa-square-minus"></i>메모</p>;
                    setTodoMemoValue(newTodoMemo[n - 1]);
                }

                const todoList = (
                    <React.Fragment key={`todoBox${n}${i}`}>
                        <TodoCheck>
                            <TodoCheckBox>
                                <input  type="checkbox" id={`check${n}${i}`}
                                       onChange={() => checkTodo(n, i)}
                                       checked={newTodoCheck[n - 1][i] === 1}/>
                                <label htmlFor={`check${n}${i}`}>✓</label>
                                {todoContent}
                            </TodoCheckBox>
                            {modifyingTodoButton}
                        </TodoCheck>
                        <TodoMemo>
                            {todoMemo}
                        </TodoMemo>
                    </React.Fragment>
                )
                todoExtend.push(todoList)
            }
        }

        let selectedInputDisplay = inputDisplay[0];
        if (n !== 1) {
            if (n !== 2) {
                selectedInputDisplay = inputDisplay[2];
            } else {
                selectedInputDisplay = inputDisplay[1];
            }
        }
        todoExtend.push(
            <TodoInput className={`todoInput${n} ${selectedInputDisplay ? 'display' : ''}`}
                 onClick={(e) => e.stopPropagation()}>
                <TextInput type="text" onKeyUp={(e) => enterCheck(e, () => todoInputClick(n))}/>
                <button onClick={() => todoInputClick(n)}>+</button>
            </TodoInput>
        );

        return todoExtend;
    }

    function showInput(e, i) {
        e.stopPropagation();
        let val = inputDisplay.slice(0, i).concat( !inputDisplay[i]).concat(inputDisplay.slice(i + 1));
        setInputDisplay(val);
        document.addEventListener('click', () => {
            setInputDisplay([false, false, false]);
        })
    }


    function todoInputClick(n) {
        const val = encodeURI(document.querySelector(`.todoInput${n} input`).value);

        util.setObjectItem(n, dayString, newTodo[n - 1]
            ? JSON.stringify({
                todo : newTodo[n - 1].concat(val),
                todoCheck : newTodoCheck[n - 1].concat(0),
                memo : newTodoMemo[n - 1].concat(0),
                memoCheck : newTodoMemoCheck[n - 1].concat(0)
            })
            : JSON.stringify({
                todo : [val],
                todoCheck : [0],
                memo : [0],
                memoCheck : [0]
            })
        )

        document.querySelector('.display input').value = '';
        reloadSessionTodoItemList();
    }

    function todoSetting(n, i) {
        setModifyingTodoIndex(n);
        setDeletingTodoIndex(n);
        toggleModal(i);
        const newVal = -2 - i;
        setModifyingTodo(newVal);
        setDeletingTodo(newVal);

        let isModalClick = false;

        document.querySelector('.modal').addEventListener('click', () => {
            isModalClick = true;
        });
        document.querySelector('.modal-container').addEventListener('click', () => {
            if(!isModalClick) {
                toggleModal(-1);
                setTodoMemo(false);
                setTodoChangeDay(false);
            }else {
                isModalClick = false;
            }

        });
    }

    function checkTodo(n, i) {
        const todoChecked = newTodoCheck[n - 1].slice();
        let rest = todoChecked[i];
        rest = parseInt(rest) * -1 + 1;
        const todoCheckValue = todoChecked.slice(0, i).concat(rest, todoChecked.slice(i + 1));
        const todoObject = util.getChangedObject(n, null, todoCheckValue, null, null);
        util.setObjectItem(n, dayString, JSON.stringify(todoObject[n - 1]));
        reloadSessionTodoItemList();
    }

    function modifyingTodoConfirm(n, i) {
        const value = document.querySelector('.modifyingTodoInput').value;
        const sessionValue = util.getObjectValue('todo')[n - 1];
        const newTodoValue = sessionValue.slice(0, i).concat(value, sessionValue.slice(i + 1));
        const todoObject = util.getChangedObject(n, newTodoValue, null, null, null);
        util.setObjectItem(n, dayString, JSON.stringify(todoObject[n - 1]));
        reloadSessionTodoItemList();
    }

    function modifyingTodoInput() {
        document.addEventListener('click', () => {
            setModifyingTodoInputDisplay([false, false, false]);
        })
    }

    function deletingTodoConfirm(n, i) {

        const sessionTodo = util.getObjectValue('todo')[n - 1];
        const sessionTodoCheck = util.getObjectValue('todoCheck')[n - 1];
        const sessionMemo = util.getObjectValue('memo')[n - 1];
        const sessionMemoCheck = util.getObjectValue('memoCheck')[n - 1];

        const newTodoValue = sessionTodo.slice(0, i).concat(sessionTodo.slice(i + 1));
        const newTodoCheckValue = sessionTodoCheck.slice(0, i).concat(sessionTodoCheck.slice(i + 1));
        const newMemoValue = sessionMemo.slice(0, i).concat(sessionMemo.slice(i + 1));
        const newMemoCheckValue = sessionMemoCheck.slice(0, i).concat(sessionMemoCheck.slice(i + 1));

        const todoObject = util.getChangedObject(n, newTodoValue, newTodoCheckValue, newMemoValue, newMemoCheckValue);

        if(JSON.stringify(newTodoValue) !== '[]') {
            util.setObjectItem(n, dayString, JSON.stringify(todoObject[n - 1]));
        } else {
            util.removeObjectItem(n, dayString);
        }

        reloadSessionTodoItemList();
    }

    useEffect(() => {
        if (deletingTodo > -1) {
            deletingTodoConfirm(deletingTodoIndex, deletingTodo);
        }
    }, [deletingTodo]);

    return (
        <StyledTodo key={'todoContainer'} className='todo'>
            <Todos showInput={showInput} getTodoExtend={getTodoExtend} />
        </StyledTodo>
    )
}

function Todos({showInput, getTodoExtend}) {
    return [1, 2, 3].map((n) => {
        return (
            <React.Fragment key={`todo${n}`}>
                <TodoList className='todoList' key={`todoList${n}`}>
                    <p><i className="fa-solid fa-box"></i> 목표 {n} <button onClick={(e) => showInput(e, n - 1)}>+</button></p>
                    {getTodoExtend(n)}
                </TodoList>
            </React.Fragment>
        )
    });
}