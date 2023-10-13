import CalendarDate from "./calendarDate.jsx";
import CalendarMonth from "./calendarMonth.jsx";
import Diary from "./diary.jsx";
import Todo from "./todo";

import Modal from "./modal";

import {useRef, useState} from 'react'

import {deleteStateAtom, isModalOpenAtom, modifyStateAtom} from "./atoms.js";
import {useRecoilState} from 'recoil'
import {
    CalendarMain,
    CalendarTodo,
    DiaryModal,
    DiaryModalContainer,
    Radio,
    RadioList
} from "../styles/style.js";
import {DateService} from "./services/dateService.js";
import {DiaryService} from "./services/diaryService.js";

const calendarModeEnum = {
    TODO: "todo",
    DIARY: "diary",
}
Object.freeze(calendarModeEnum);
export default function Calendar() {


    const today = new Date();
    const [monthFromToday, setMonthFromToday] = useState(0);
    const [selectedDay, setSelectedDay] = useState((today.getDate()).toString());
    const [sessionTodoItemList, setSessionTodoItemList] = useState({...sessionStorage});
    const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenAtom);

    const [deletingTodo, setDeletingTodo] = useRecoilState(deleteStateAtom);
    const [modifyingTodo, setModifyingTodo] = useRecoilState(modifyStateAtom);

    const [diaryModalOpen, setDiaryModalOpen] = useState(false);
    const [calendarMode, setCalendarMode] = useState(calendarModeEnum.TODO); // todo or diary
    const [editingDiary, setEditingDiary] = useState(0);

    const [utilModalShow, setUtilModalShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    function changeDayEventListener(day) {
        if(calendarMode === calendarModeEnum.TODO) {
            const selected = document.querySelector('.selected');

            if (selected && selectedDay !== day) {
                selected.classList.remove('selected');
            }
            setSelectedDay(day);
            const dayDOM = document.querySelector(`.td${day} p`);
            dayDOM.parentNode.classList.add('selected')

        } else {
            if(document.getElementById(day).innerText !== '🫥') {
                setDiaryModalOpen(true);
            }

            if(parseInt(day) > today.getDate()) {
                setDiaryModalOpen(false );
                alert('미래의 일기는 작성할 수 없습니다');
            } else {
                setEditingDiary(day);
            }
        }
    }

    function reloadSessionTodoItemList() {
        setSessionTodoItemList({...sessionStorage});
        setDeletingTodo(-1);
        setModifyingTodo(-1);
    }

    function todoModeCheck(e) {
        if(e.target.value === 'on') {
            setCalendarMode(calendarModeEnum.TODO);
        }
    }

    function diaryModeCheck(e) {
        if(e.target.value === 'on') {
            setCalendarMode(calendarModeEnum.DIARY);
        }
    }

    function closeDiary() {
        if(utilModalShow) {
            setUtilModalShow(false);
        } else {
            setDiaryModalOpen(false);
            setEditingDiary(0);
        }
    }

    function confirmDiary(val, emoji) {
        const date = new Date(today.getFullYear(), today.getMonth() + monthFromToday, editingDiary);
        const diaryService = new DiaryService(date);

        if (val !== '' && emoji !== '🫥') {
            diaryService.setDiaryItem(JSON.stringify([emoji, val]));
            setUtilModalShow(false);
            setEditingDiary(0);
        } else if (emoji === '🫥') {
            alert('이모지를 입력해 주세요');
        } else if (val === '') {
            alert('텍스트를 입력해 주세요');
        }
    }

    function removeDiary() {
        const date = new Date(today.getFullYear(), today.getMonth() + monthFromToday, editingDiary);
        const diaryService = new DiaryService(date);

        diaryService.removeDiaryItem();
        setDiaryModalOpen(false);
        setEditingDiary(0);
    }

    const isDiaryModalOpen = diaryModalOpen ? <DiaryModalOpenPage closeDiary={closeDiary} editingDiary={editingDiary} monthFromToday={monthFromToday} confirmDiary={confirmDiary} removeDiary={removeDiary} utilModalShow={utilModalShow} setUtilModalShow={setUtilModalShow} setDiaryModalOpen={setDiaryModalOpen} /> : '';

    return editingDiary !== 0 && !diaryModalOpen
        ? <>
            <Diary  day={editingDiary} monthFromToday={monthFromToday} closeDiary={closeDiary} confirmDiary={confirmDiary} removeDiary={removeDiary} isModal={false} utilModalShow={utilModalShow} setUtilModalShow={setUtilModalShow} setDiaryModalOpen={setDiaryModalOpen}/>
        </>
        : <>
            <CalendarMain>
                <CalendarMonth today={today} monthFromToday={monthFromToday} onCurrentMonthChange={(n) => setMonthFromToday(n)} setSelectedDay={(n) => setSelectedDay(n)}/>
                <CalendarDate today={today} changeDayEventListener={changeDayEventListener} sessionTodoItemList={sessionTodoItemList} monthFromToday={monthFromToday} selectedDay={selectedDay} calendarMode={calendarMode} day={editingDiary}/>
                <RadioList>
                    <Radio>
                        <input type='radio' name='calendarMode' id='todoRadio' onChange={(e) => todoModeCheck(e)} checked={calendarMode === calendarModeEnum.TODO}/><label htmlFor='todoRadio'>할 일</label>
                        <input type='radio' name='calendarMode' id='diaryRadio' onChange={(e) => diaryModeCheck(e)} checked={calendarMode === calendarModeEnum.DIARY}/><label htmlFor='diaryRadio'>일기</label>
                    </Radio>
                </RadioList>
            </CalendarMain>
            <CalendarTodo>
                <Todo today={today} reloadSessionTodoItemList={reloadSessionTodoItemList} toggleModal={(n) => setIsModalOpen(n)} monthFromToday={monthFromToday} selectedDay={selectedDay}/>
            </CalendarTodo>
            <Modal monthFromToday={monthFromToday} selectedDay={selectedDay}/>
            {isDiaryModalOpen}
        </>
}

function DiaryModalOpenPage({closeDiary, editingDiary, monthFromToday, confirmDiary, removeDiary, utilModalShow, setUtilModalShow, setDiaryModalOpen}) {
    return (
        <DiaryModalContainer className='diaryModalContainer' onClick={closeDiary}>
            <DiaryModal className='diaryModal' onClick={(e) => e.stopPropagation()}>
                <Diary  day={editingDiary} monthFromToday={monthFromToday} closeDiary={closeDiary} confirmDiary={confirmDiary} removeDiary={removeDiary} isModal={true} utilModalShow={utilModalShow} setUtilModalShow={setUtilModalShow} setDiaryModalOpen={setDiaryModalOpen}/>
            </DiaryModal>
        </DiaryModalContainer>
    )
}