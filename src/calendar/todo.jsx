import React, {useEffect} from 'react';
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

// 목표 리스트 표시
export default function Todo({today, reloadTodoItems, toggleModal, currentMonth, selectedDay}) {

    const selectedDate = new Date(today.getFullYear(), today.getMonth() + currentMonth, selectedDay);
    const dayString = selectedDate.getFullYear().toString()
        + (('0' + (selectedDate.getMonth() + 1)).slice(-2)).toString()
        + (('0' + selectedDate.getDate()).slice(-2)).toString();

    const [inputDisplay, setInputDisplay] = useState([false, false, false]);

    const [modifyingTodo, setModifyingTodo] = useRecoilState(modifyStateAtom);
    const [deletingTodo, setDeletingTodo] = useRecoilState(deleteStateAtom);

    const [modifyingTodoInputDisplay, setModifyingTodoInputDisplay] = useRecoilState(modifyingTodoInputDisplayAtom);

    const setModifyingTodoIndex = useSetRecoilState(modifyingTodoIndexAtom);
    const [deletingTodoIndex, setDeletingTodoIndex] = useState(0);
    const setTodoChangeDay = useSetRecoilState(changeDayStateAtom);

    const setTodoMemo = useSetRecoilState(todoMemoAtom);
    const setTodoMemoValue = useSetRecoilState(todoMemoValueAtom);

    const newTodo = [JSON.parse(sessionStorage.getItem(`todo1${dayString}`)),
        JSON.parse(sessionStorage.getItem(`todo2${dayString}`)),
        JSON.parse(sessionStorage.getItem(`todo3${dayString}`))];

    const newTodoCheck = [JSON.parse(sessionStorage.getItem(`todoCheck1${dayString}`)),
        JSON.parse(sessionStorage.getItem(`todoCheck2${dayString}`)),
        JSON.parse(sessionStorage.getItem(`todoCheck3${dayString}`))];

    const newTodoMemo = [JSON.parse(sessionStorage.getItem(`todoMemo1${dayString}`)),
        JSON.parse(sessionStorage.getItem(`todoMemo2${dayString}`)),
        JSON.parse(sessionStorage.getItem(`todoMemo3${dayString}`))];

    const newTodoMemoCheck = [JSON.parse(sessionStorage.getItem(`todoMemoCheck1${dayString}`)),
        JSON.parse(sessionStorage.getItem(`todoMemoCheck2${dayString}`)),
        JSON.parse(sessionStorage.getItem(`todoMemoCheck3${dayString}`))];

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
                    modifyInput = <input className='modifyingTodoInput' type='text' defaultValue={arr[i]}
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
        sessionStorage.setItem(`todo${n}${dayString}`, newTodo[n - 1] ? JSON.stringify(newTodo[n - 1].concat(val)) : JSON.stringify([val]));
        sessionStorage.setItem(`todoCheck${n}${dayString}`, newTodoCheck[n - 1] ? JSON.stringify(newTodoCheck[n - 1].concat(0)) : JSON.stringify([0]));
        sessionStorage.setItem(`todoMemo${n}${dayString}`, newTodoMemo[n - 1] ? JSON.stringify(newTodoMemo[n - 1].concat(0)) : JSON.stringify([0]));
        sessionStorage.setItem(`todoMemoCheck${n}${dayString}`, newTodoMemoCheck[n - 1] ? JSON.stringify(newTodoMemoCheck[n - 1].concat(0)) : JSON.stringify([0]));
        document.querySelector('.display input').value = '';
        reloadTodoItems();
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
        sessionStorage.setItem(`todoCheck${n}${dayString}`, JSON.stringify(todoChecked.slice(0, i).concat(rest, todoChecked.slice(i + 1))));
        reloadTodoItems();
    }

    function modifyingTodoConfirm(n, i) {
        const val = document.querySelector('.modifyingTodoInput').value;
        const sessionVal= JSON.parse(sessionStorage.getItem(`todo${n}${dayString}`));
        sessionStorage.setItem(`todo${n}${dayString}`, JSON.stringify(sessionVal.slice(0, i).concat(val, sessionVal.slice(i + 1))));
        reloadTodoItems();
    }

    function modifyingTodoInput() {
        document.addEventListener('click', () => {
            setModifyingTodoInputDisplay([false, false, false]);
        })
    }

    function deletingTodoConfirm(n, i) {
        const sessionVal = JSON.parse(sessionStorage.getItem(`todo${n}${dayString}`));
        const sessionCheckVal = JSON.parse(sessionStorage.getItem(`todoCheck${n}${dayString}`));
        const sessionMemoVal = JSON.parse(sessionStorage.getItem(`todoMemo${n}${dayString}`));
        const sessionMemoCheckVal = JSON.parse(sessionStorage.getItem(`todoMemoCheck${n}${dayString}`));

        const newVal = JSON.stringify(sessionVal.slice(0, i).concat(sessionVal.slice(i + 1)));
        const newCheckVal = JSON.stringify(sessionCheckVal.slice(0, i).concat(sessionCheckVal.slice(i + 1)));
        const newMemoVal = JSON.stringify(sessionMemoVal.slice(0, i).concat(sessionMemoVal.slice(i + 1)));
        const newMemoCheckVal = JSON.stringify(sessionMemoCheckVal.slice(0, i).concat(sessionMemoCheckVal.slice(i + 1)));

        if(newVal !== '[]') {
            sessionStorage.setItem(`todo${n}${dayString}`, newVal);
            sessionStorage.setItem(`todoCheck${n}${dayString}`, newCheckVal);
            sessionStorage.setItem(`todoMemo${n}${dayString}`, newMemoVal);
            sessionStorage.setItem(`todoMemoCheck${n}${dayString}`, newMemoCheckVal);
        } else {
            sessionStorage.removeItem(`todo${n}${dayString}`);
            sessionStorage.removeItem(`todoCheck${n}${dayString}`);
            sessionStorage.removeItem(`todoMemo${n}${dayString}`);
            sessionStorage.removeItem(`todoMemoCheck${n}${dayString}`);
        }

        reloadTodoItems();
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