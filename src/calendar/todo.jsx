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

    const newTodo = [sessionStorage.getItem('todo1' + dayString),
        sessionStorage.getItem('todo2' + dayString),
        sessionStorage.getItem('todo3' + dayString)];

    const newTodoCheck = [sessionStorage.getItem('todoCheck1' + dayString),
        sessionStorage.getItem('todoCheck2' + dayString),
        sessionStorage.getItem('todoCheck3' + dayString)];

    function enterCheck(e, func) {
        if (e.key === 'Enter') {
            func();
        }
    }

    function getTodoExtend(n) {

        const todoExtend = []
        if (newTodo) {
            const arr = newTodo[n - 1] ? newTodo[n - 1].split(' ') : '';
            for (let i = 0; i < arr.length; i++) {

                let modifyInput = '';
                let todoModifyInputDisplay = n === 1 ? todoModifyInputDisplay1 : n === 2 ? todoModifyInputDisplay2 : todoModifyInputDisplay3;
                if (todoModify === i && todoModifyInputDisplay) {
                    todoModifyInput(n)
                    modifyInput = <input className='todoModifyInput' type='text' defaultValue={decodeURI(arr[i])}
                                         onClick={(e) => e.stopPropagation()}
                                         onKeyUp={(e) => enterCheck(e, () => todoModifyConfirm(n, i))}/>;
                }

                const todoContent = modifyInput ?
                    modifyInput :
                    <p key={'todoArr' + n + '' + i}>{decodeURI(arr[i])}</p>

                const todoModifyButton = modifyInput ?
                    <button onClick={() => todoModifyConfirm(n, i)}>+</button> :
                    <button key={'todobutton' + n + '' + i} onClick={() => todoSetting(n, i)}>...</button>;

                const todoList = (
                    <>
                        <div key={'todoBox' + n + '' + i} className='todocheck'>
                            <div className='todo-check'>
                                <input key={'todoInput' + n + '' + i} type="checkbox" id={'check' + n + '' + i}
                                       onChange={() => todoChecked(n, i)}
                                       checked={newTodoCheck[n - 1].split(' ')[i] === '1' ? true : false}/>
                                <label htmlFor={'check' + n + '' + i}>✓</label>
                                {todoContent}
                            </div>
                            {todoModifyButton}
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
        sessionStorage.setItem('todo' + n + '' + dayString, newTodo[n - 1] ? newTodo[n - 1] + ' ' + val : val);
        sessionStorage.setItem('todoCheck' + n + '' + dayString, newTodoCheck[n - 1] ? newTodoCheck[n - 1] + ' 0' : '0');
        reloadTodoItems();
    }

    function todoSetting(n, i) {
        setTodoModifyNth(n);
        setTodoDeleteNth(n);
        turnModal(true);
        const newVal = -2 - i;
        setTodoModify(newVal);
        setTodoDelete(newVal);
        document.querySelector('.modal-container').addEventListener('click', () => {
            turnModal(false);
        });
    }

    function todoChecked(n, i) {
        let todoChecked = newTodoCheck[n - 1].split(' ').slice();
        let rest = todoChecked[i];
        rest = (parseInt(rest) * -1 + 1).toString();
        sessionStorage.setItem('todoCheck' + n + '' + dayString, (todoChecked.slice(0, i).join(' ') + ' ' + rest + ' ' + todoChecked.slice(i + 1).join(' ')).trim());
        reloadTodoItems();
    }

    function todoModifyConfirm(n, i) {
        const val = encodeURI(document.querySelector('.todoModifyInput').value);
        const sessionVal = sessionStorage.getItem('todo' + n + '' + dayString);
        const newVal = (sessionVal.split(' ').slice(0, i).join(' ') + ' ' + val + ' ' + sessionVal.split(' ').slice(i + 1).join(' ')).trim();
        sessionStorage.setItem('todo' + n + '' + dayString, newVal);
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
        const sessionVal = sessionStorage.getItem('todo' + n + '' + dayString);
        const sessionCheckVal = sessionStorage.getItem('todoCheck' + n + '' + dayString);
        const newVal = (sessionVal.split(' ').slice(0, i).join(' ') + ' ' + sessionVal.split(' ').slice(i + 1).join(' ')).trim();
        const newCheckVal = (sessionCheckVal.split(' ').splice(0, i).join(' ') + ' ' + sessionCheckVal.split(' ').splice(i + 1).join(' ')).trim();

        sessionStorage.setItem('todo' + n + '' + dayString, newVal);
        sessionStorage.setItem('todoCheck' + n + '' + dayString, newCheckVal);
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
