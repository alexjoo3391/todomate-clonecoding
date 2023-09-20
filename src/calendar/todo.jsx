import {useState} from 'react';
import {useRecoilState} from 'recoil'

import {
    currentMonthAtom,
    deleteStateAtom,
    modifyStateAtom,
    selectDayAtom,
    todoDeleteNthAtom,
    todoModifyInputDisplayAtom1,
    todoModifyInputDisplayAtom2,
    todoModifyInputDisplayAtom3,
    todoModifyNthAtom,
    changeDayStateAtom,
} from './atoms';

// 목표 리스트 표시
export default function ShowTodo({today, reloadTodoItems, turnModal}) {

    const [selectDay, setSelectDay] = useRecoilState(selectDayAtom);
    const [currentMonth, setCurrentMonth] = useRecoilState(currentMonthAtom);
    const selectDate = new Date(today.getFullYear(), today.getMonth() + currentMonth, selectDay);
    const dayString = selectDate.getFullYear().toString()
        + (('0' + (selectDate.getMonth() + 1)).slice(-2)).toString()
        + (('0' + selectDate.getDate()).slice(-2)).toString();

    const [inputDisplay1, setInputDisplay1] = useState(false);
    const [inputDisplay2, setInputDisplay2] = useState(false);
    const [inputDisplay3, setInputDisplay3] = useState(false);

    const [todoModify, setTodoModify] = useRecoilState(modifyStateAtom);
    const [todoDelete, setTodoDelete] = useRecoilState(deleteStateAtom);

    const [todoModifyInputDisplay1, setTodoModifyInputDisplay1] = useRecoilState(todoModifyInputDisplayAtom1);
    const [todoModifyInputDisplay2, setTodoModifyInputDisplay2] = useRecoilState(todoModifyInputDisplayAtom2);
    const [todoModifyInputDisplay3, setTodoModifyInputDisplay3] = useRecoilState(todoModifyInputDisplayAtom3);

    const [todoModifyNth, setTodoModifyNth] = useRecoilState(todoModifyNthAtom);
    const [todoDeleteNth, setTodoDeleteNth] = useRecoilState(todoDeleteNthAtom);
    const [todoChangeDay, setTodoChangeDay] = useRecoilState(changeDayStateAtom);

    const newTodo = [JSON.parse(sessionStorage.getItem('todo1' + dayString)),
        JSON.parse(sessionStorage.getItem('todo2' + dayString)),
        JSON.parse(sessionStorage.getItem('todo3' + dayString))];

    const newTodoCheck = [JSON.parse(sessionStorage.getItem('todoCheck1' + dayString)),
        JSON.parse(sessionStorage.getItem('todoCheck2' + dayString)),
        JSON.parse(sessionStorage.getItem('todoCheck3' + dayString))];

    const newTodoMemo = [JSON.parse(sessionStorage.getItem('todoMemo1' + dayString)),
        JSON.parse(sessionStorage.getItem('todoMemo2' + dayString)),
        JSON.parse(sessionStorage.getItem('todoMemo3' + dayString))];

    const newTodoMemoCheck = [JSON.parse(sessionStorage.getItem('todoMemoCheck1' + dayString)),
        JSON.parse(sessionStorage.getItem('todoMemoCheck2' + dayString)),
        JSON.parse(sessionStorage.getItem('todoMemoCheck3' + dayString))];

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
                let todoModifyInputDisplay = n === 1 ? todoModifyInputDisplay1 : n === 2 ? todoModifyInputDisplay2 : todoModifyInputDisplay3;
                if (todoModify === i && todoModifyInputDisplay) {
                    todoModifyInput(n)
                    modifyInput = <input className='todoModifyInput' type='text' defaultValue={arr[i]}
                                         onClick={(e) => e.stopPropagation()}
                                         onKeyUp={(e) => enterCheck(e, () => todoModifyConfirm(n, i))}/>;
                }

                const todoContent = modifyInput
                    ? modifyInput
                    : <p key={'todoArr' + n + '' + i}>{arr[i]}</p>

                const todoModifyButton = modifyInput ?
                    <button onClick={() => todoModifyConfirm(n, i)}>+</button> :
                    <button key={'todobutton' + n + '' + i} onClick={() => todoSetting(n, i)}>...</button>;

                const todoMemo = (
                    newTodoMemoCheck[n - 1][i] !== 0 ?
                    <p>메모</p> :
                    ''
                )

                const todoList = (
                    <>
                        <div key={'todoBox' + n + '' + i} className='todocheck'>
                            <div className='todo-check'>
                                <input key={'todoInput' + n + '' + i} type="checkbox" id={'check' + n + '' + i}
                                       onChange={() => todoChecked(n, i)}
                                       checked={newTodoCheck[n - 1][i] === 1}/>
                                <label htmlFor={'check' + n + '' + i}>✓</label>
                                {todoContent}
                            </div>
                            {todoModifyButton}
                        </div>
                        <div key={'todoMemo' + n + '' + i} className={'todoMemo'}>
                            {todoMemo}
                        </div>
                    </>
                )
                todoExtend.push(todoList)
            }
        }

        var inputDisplay = inputDisplay1;
        if (n !== 1) {
            if (n !== 2) {
                inputDisplay = inputDisplay3;
            } else {
                inputDisplay = inputDisplay2;
            }
        }
        todoExtend.push(
            <div key={'todoinput'} className={`todoInput${n} ${inputDisplay ? 'display' : ''}`}
                 onClick={(e) => e.stopPropagation()}>
                <input key={'todoInputText'} type="text" onKeyUp={(e) => enterCheck(e, () => todoInputClick(n))}/>
                <button key={'todoInputButton'} onClick={() => todoInputClick(n)}>+</button>
            </div>
        );

        return todoExtend;
    }

    function showInput1(e) {
        e.stopPropagation();
        setInputDisplay1(true);
        document.addEventListener('click', () => {
            setInputDisplay1(false);
        })
    }

    function showInput2(e) {
        e.stopPropagation();
        setInputDisplay2(true);
        document.addEventListener('click', () => {
            setInputDisplay2(false);
        })
    }

    function showInput3(e) {
        e.stopPropagation();
        setInputDisplay3(true);
        document.addEventListener('click', () => {
            setInputDisplay3(false);
        })
    }

    function todoInputClick(n) {
        const val = encodeURI(document.querySelector('.todoInput' + n + ' input').value);
        sessionStorage.setItem('todo' + n + '' + dayString, newTodo[n - 1] ? JSON.stringify(newTodo[n - 1].concat(val)) : JSON.stringify([val]));
        sessionStorage.setItem('todoCheck' + n + '' + dayString, newTodoCheck[n - 1] ? JSON.stringify(newTodoCheck[n - 1].concat(0)) : JSON.stringify([0]));
        sessionStorage.setItem('todoMemo' + n + '' + dayString, newTodoMemo[n - 1] ? JSON.stringify(newTodoMemo[n - 1].concat(0)) : JSON.stringify([0]));
        sessionStorage.setItem('todoMemoCheck' + n + '' + dayString, newTodoMemoCheck[n - 1] ? JSON.stringify(newTodoMemoCheck[n - 1].concat(0)) : JSON.stringify([0]));
        reloadTodoItems();
    }

    function todoSetting(n, i) {
        setTodoModifyNth(n);
        setTodoDeleteNth(n);
        turnModal(true);
        const newVal = -2 - i;
        setTodoModify(newVal);
        setTodoDelete(newVal);

        var isModalClick = false;

        document.querySelector('.modal').addEventListener('click', (e) => {
            isModalClick = true;
        });
        document.querySelector('.modal-container').addEventListener('click', () => {
            if(!isModalClick) {
                setTodoChangeDay(false);
                turnModal(false);
            }else {
                isModalClick = false;
            }

        });
    }

    function todoChecked(n, i) {
        const todoChecked = newTodoCheck[n - 1].slice();
        let rest = todoChecked[i];
        rest = parseInt(rest) * -1 + 1;
        sessionStorage.setItem('todoCheck' + n + '' + dayString, JSON.stringify(todoChecked.slice(0, i).concat(rest, todoChecked.slice(i + 1))));
        reloadTodoItems();
    }

    function todoModifyConfirm(n, i) {
        const val = document.querySelector('.todoModifyInput').value;
        const sessionVal= JSON.parse(sessionStorage.getItem('todo' + n + '' + dayString));
        sessionStorage.setItem('todo' + n + '' + dayString, JSON.stringify(sessionVal.slice(0, i).concat(val, sessionVal.slice(i + 1))));
        reloadTodoItems();
    }

    function todoModifyInput(n) {
        document.addEventListener('click', () => {
            if (n === 1) {
                setTodoModifyInputDisplay1(false);
            } else {
                if (n === 2) {
                    setTodoModifyInputDisplay2(false);
                } else {
                    setTodoModifyInputDisplay3(false);
                }
            }
        })
    }

    function todoDeleteConfirm(n, i) {
        const sessionVal = JSON.parse(sessionStorage.getItem('todo' + n + '' + dayString));
        const sessionCheckVal = JSON.parse(sessionStorage.getItem('todoCheck' + n + '' + dayString));
        const sessionMemoVal = JSON.parse(sessionStorage.getItem('todoMemo' + n + '' + dayString));
        const sessionMemoCheckVal = JSON.parse(sessionStorage.getItem('todoMemoCheck' + n + '' + dayString));

        const newVal = JSON.stringify(sessionVal.slice(0, i).concat(sessionVal.slice(i + 1)));
        const newCheckVal = JSON.stringify(sessionCheckVal.slice(0, i).concat(sessionCheckVal.slice(i + 1)));
        const newMemoVal = JSON.stringify(sessionMemoVal.slice(0, i).concat(sessionMemoVal.slice(i + 1)));
        const newMemoCheckVal = JSON.stringify(sessionMemoCheckVal.slice(0, i).concat(sessionMemoCheckVal.slice(i + 1)));

        if(newVal !== '[]') {
            sessionStorage.setItem('todo' + n + '' + dayString, newVal);
            sessionStorage.setItem('todoCheck' + n + '' + dayString, newCheckVal);
            sessionStorage.setItem('todoMemo' + n + '' + dayString, newMemoVal);
            sessionStorage.setItem('todoMemoCheck' + n + '' + dayString, newMemoCheckVal);
        } else {
            sessionStorage.removeItem('todo' + n + '' + dayString);
            sessionStorage.removeItem('todoCheck' + n + '' + dayString);
            sessionStorage.removeItem('todoMemo' + n + '' + dayString);
            sessionStorage.removeItem('todoMemoCheck' + n + '' + dayString);
        }

        reloadTodoItems();
    }

    if (todoDelete > -1) {
        todoDeleteConfirm(todoDeleteNth, todoDelete);
    }

    return (
        <div key={'todoContainer'} className='todo'>
            <p key={'todo1'}>목표 1 <button onClick={(e) => showInput1(e)}>+</button></p>
            {getTodoExtend(1)}
            <p key={'todo2'}>목표 2 <button onClick={(e) => showInput2(e)}>+</button></p>
            {getTodoExtend(2)}
            <p key={'todo3'}>목표 3 <button onClick={(e) => showInput3(e)}>+</button></p>
            {getTodoExtend(3)}
        </div>
    )
}
