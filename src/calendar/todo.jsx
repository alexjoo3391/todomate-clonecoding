import React, {useEffect} from 'react';
import {useState} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil'

import {
    deleteStateAtom,
    modifyStateAtom,
    todoModifyInputDisplayAtom,
    todoModifyNthAtom,
    changeDayStateAtom,
    todoMemoAtom,
    todoMemoValueAtom,
} from './atoms';

// 목표 리스트 표시
export default function ShowTodo({today, reloadTodoItems, turnModal, currentMonth, selectDay}) {

    const selectDate = new Date(today.getFullYear(), today.getMonth() + currentMonth, selectDay);
    const dayString = selectDate.getFullYear().toString()
        + (('0' + (selectDate.getMonth() + 1)).slice(-2)).toString()
        + (('0' + selectDate.getDate()).slice(-2)).toString();

    const [inputDisplay, setInputDisplay] = useState([false, false, false]);

    const [todoModify, setTodoModify] = useRecoilState(modifyStateAtom);
    const [todoDelete, setTodoDelete] = useRecoilState(deleteStateAtom);

    const [todoModifyInputDisplay, setTodoModifyInputDisplay] = useRecoilState(todoModifyInputDisplayAtom);

    const setTodoModifyNth = useSetRecoilState(todoModifyNthAtom);
    const [todoDeleteNth, setTodoDeleteNth] = useState(0);
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
                let selectTodoModifyInput = n === 1 ? todoModifyInputDisplay[0] : n === 2 ? todoModifyInputDisplay[1] : todoModifyInputDisplay[2];
                if (todoModify === i && selectTodoModifyInput) {
                    todoModifyInput()
                    modifyInput = <input className='todoModifyInput' type='text' defaultValue={arr[i]}
                                         onClick={(e) => e.stopPropagation()}
                                         onKeyUp={(e) => enterCheck(e, () => todoModifyConfirm(n, i))}/>;
                }

                const todoContent = modifyInput
                    ? modifyInput
                    : <p key={`todoArr${n}${i}`}>{arr[i]}</p>

                const todoModifyButton = modifyInput
                    ? <button onClick={() => todoModifyConfirm(n, i)}>+</button>
                    : <button key={`todoButton${n}${i}`} onClick={() => todoSetting(n, i)}>...</button>;

                let todoMemo = '';

                if(newTodoMemoCheck[n - 1][i] !== 0) {
                    todoMemo = <p><i className="fa-solid fa-square-minus"></i>메모</p>;
                    setTodoMemoValue(newTodoMemo[n - 1]);
                }

                const todoList = (
                    <React.Fragment key={`todoBox${n}${i}`}>
                        <div className='todoCheck'>
                            <div className='todo-check'>
                                <input  type="checkbox" id={`check${n}${i}`}
                                       onChange={() => todoChecked(n, i)}
                                       checked={newTodoCheck[n - 1][i] === 1}/>
                                <label htmlFor={`check${n}${i}`}>✓</label>
                                {todoContent}
                            </div>
                            {todoModifyButton}
                        </div>
                        <div className={'todoMemo'}>
                            {todoMemo}
                        </div>
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
            <div key={'todoinput'} className={`todoInput${n} ${selectedInputDisplay ? 'display' : ''}`}
                 onClick={(e) => e.stopPropagation()}>
                <input key={'todoInputText'} type="text" onKeyUp={(e) => enterCheck(e, () => todoInputClick(n))}/>
                <button key={'todoInputButton'} onClick={() => todoInputClick(n)}>+</button>
            </div>
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
        reloadTodoItems();
    }

    function todoSetting(n, i) {
        setTodoModifyNth(n);
        setTodoDeleteNth(n);
        turnModal(i);
        const newVal = -2 - i;
        setTodoModify(newVal);
        setTodoDelete(newVal);

        let isModalClick = false;

        document.querySelector('.modal').addEventListener('click', () => {
            isModalClick = true;
        });
        document.querySelector('.modal-container').addEventListener('click', () => {
            if(!isModalClick) {
                turnModal(-1);
                setTodoMemo(false);
                setTodoChangeDay(false);
            }else {
                isModalClick = false;
            }

        });
    }

    function todoChecked(n, i) {
        const todoChecked = newTodoCheck[n - 1].slice();
        let rest = todoChecked[i];
        rest = parseInt(rest) * -1 + 1;
        sessionStorage.setItem(`todoCheck${n}${dayString}`, JSON.stringify(todoChecked.slice(0, i).concat(rest, todoChecked.slice(i + 1))));
        reloadTodoItems();
    }

    function todoModifyConfirm(n, i) {
        const val = document.querySelector('.todoModifyInput').value;
        const sessionVal= JSON.parse(sessionStorage.getItem(`todo${n}${dayString}`));
        sessionStorage.setItem(`todo${n}${dayString}`, JSON.stringify(sessionVal.slice(0, i).concat(val, sessionVal.slice(i + 1))));
        reloadTodoItems();
    }

    function todoModifyInput() {
        document.addEventListener('click', () => {
            setTodoModifyInputDisplay([false, false, false]);
        })
    }

    function todoDeleteConfirm(n, i) {
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
        if (todoDelete > -1) {
            todoDeleteConfirm(todoDeleteNth, todoDelete);
        }
    }, [todoDelete]);

    return (
        <div key={'todoContainer'} className='todo'>
            <Todos showInput={showInput} getTodoExtend={getTodoExtend} />
        </div>
    )
}

function Todos({showInput, getTodoExtend}) {
    return [1, 2, 3].map((n) => {
        return (
            <React.Fragment key={`todo${n}`}>
                <div className='todoList'>
                    <p><i className="fa-solid fa-box"></i> 목표 {n} <button onClick={(e) => showInput(e, n - 1)}>+</button></p>
                    {getTodoExtend(n)}
                </div>
            </React.Fragment>
        )
    });
}