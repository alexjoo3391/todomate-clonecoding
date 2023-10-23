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
import {ObjectService} from "./services/objectService.js";

// 목표 리스트 표시
export default function Todo({today, toggleModal, monthFromToday, selectedDay, todoInputValue, setTodoInputValue, setTodoCheckValue}) {

    const selectedDate = new Date(today.getFullYear(), today.getMonth() + monthFromToday, selectedDay);
    const objectService = new ObjectService(selectedDate);

    const [inputDisplay, setInputDisplay] = useState([false, false, false]);

    const [modifyingTodo, setModifyingTodo] = useRecoilState(modifyStateAtom);
    const [deletingTodo, setDeletingTodo] = useRecoilState(deleteStateAtom);

    const [modifyingTodoInputDisplay, setModifyingTodoInputDisplay] = useRecoilState(modifyingTodoInputDisplayAtom);

    const setModifyingTodoIndex = useSetRecoilState(modifyingTodoIndexAtom);
    const [deletingTodoIndex, setDeletingTodoIndex] = useState(0);
    const setTodoChangeDay = useSetRecoilState(changeDayStateAtom);

    const setTodoMemo = useSetRecoilState(todoMemoAtom);
    const setTodoMemoValue = useSetRecoilState(todoMemoValueAtom);

    const newTodo = objectService.getObjectValue('todo');
    const newTodoCheck = objectService.getObjectValue('todoCheck');
    const newTodoMemo = objectService.getObjectValue('memo');
    const newTodoMemoCheck = objectService.getObjectValue('memoCheck');

    function checkEnter(e, func) {
        setTodoInputValue(e.target.value);
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
                    modifyTodoInput()
                    modifyInput = <TextInput className='modifyTodoInput' type='text' defaultValue={arr[i]}
                                         onClick={(e) => e.stopPropagation()}
                                         onKeyUp={(e) => checkEnter(e, () => confirmModifyingTodo(n, i))}/>;
                }

                const todoContent = modifyInput
                    ? modifyInput
                    : <p key={`todoArr${n}${i}`}>{arr[i]}</p>

                const modifyingTodoButton = modifyInput
                    ? <button onClick={() => confirmModifyingTodo(n, i)}>+</button>
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
                <TextInput type="text" onKeyUp={(e) => checkEnter(e, () => todoInputClick(n))}/>
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
        const val = todoInputValue;

        objectService.setObjectItem(n, newTodo[n - 1]
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

        setTodoInputValue('');
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
        const todoObject = objectService.getChangedObject({
            n,
            todoValue : null,
            todoCheckValue,
            memoValue : null,
            memoCheckValue : null
        });
        objectService.setObjectItem(n, JSON.stringify(todoObject[n - 1]));
        setTodoCheckValue(todoObject);
    }

    function confirmModifyingTodo(n, i) {
        const value = document.querySelector('.modifyTodoInput').value;
        const sessionValue = objectService.getObjectValue('todo')[n - 1];
        const newTodoValue = sessionValue.slice(0, i).concat(value, sessionValue.slice(i + 1));
        const todoObject = objectService.getChangedObject({
            n,
            todoValue : newTodoValue,
            todoCheckValue : null,
            memoValue : null,
            memoCheckValue : null
        });
        objectService.setObjectItem(n, JSON.stringify(todoObject[n - 1]));
    }

    function modifyTodoInput() {
        document.addEventListener('click', () => {
            setModifyingTodoInputDisplay([false, false, false]);
        })
    }

    function deleteTodoInput(n, i) {

        const sessionTodo = objectService.getObjectValue('todo')[n - 1];
        const sessionTodoCheck = objectService.getObjectValue('todoCheck')[n - 1];
        const sessionMemo = objectService.getObjectValue('memo')[n - 1];
        const sessionMemoCheck = objectService.getObjectValue('memoCheck')[n - 1];

        const newTodoValue = sessionTodo.slice(0, i).concat(sessionTodo.slice(i + 1));
        const newTodoCheckValue = sessionTodoCheck.slice(0, i).concat(sessionTodoCheck.slice(i + 1));
        const newMemoValue = sessionMemo.slice(0, i).concat(sessionMemo.slice(i + 1));
        const newMemoCheckValue = sessionMemoCheck.slice(0, i).concat(sessionMemoCheck.slice(i + 1));

        const todoObject = objectService.getChangedObject({
            n,
            todoValue : newTodoValue,
            todoCheckValue : newTodoCheckValue,
            memoValue : newMemoValue,
            memoCheckValue : newMemoCheckValue
        });

        if(JSON.stringify(newTodoValue) !== '[]') {
            objectService.setObjectItem(n, JSON.stringify(todoObject[n - 1]));
        } else {
            objectService.removeObjectItem(n);
        }
    }

    useEffect(() => {
        if (deletingTodo > -1) {
            deleteTodoInput(deletingTodoIndex, deletingTodo);
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