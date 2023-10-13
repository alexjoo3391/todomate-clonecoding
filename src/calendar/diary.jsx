import {useEffect, useRef, useState} from "react";
import {
    DiaryContainer,
    DiaryEmoji,
    DiaryHeader,
    DiaryModal,
    DiaryModalContainer,
    NormalEmoji, StyledUtilModal, UtilModalContainer
} from "../styles/style.js";
import {DateService} from "./services/dateService.js";
import {emojiList} from "./constant.js";
import {DiaryService} from "./services/diaryService.js";

export default function Diary({day, monthFromToday, closeDiary, confirmDiary, removeDiary, isModal, utilModalShow, setUtilModalShow, setDiaryModalOpen}) {

    const [emojiModalShow, setEmojiModalShow] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState('🫥');

    const diaryRef = useRef(null);

    const today = new Date()
    const date = new Date(today.getFullYear(), today.getMonth() + monthFromToday, parseInt(day));

    const diaryService = new DiaryService(date);

    let weekDay = diaryService.getWeekDay();

    let diaryValue = '';
    let diaryEmojiValue = currentEmoji;


    if(diaryService.isDiaryHaveProperty() && currentEmoji === '🫥') {
        diaryEmojiValue = diaryService.getDiaryValue()[0];
        diaryValue = diaryService.getDiaryValue()[1];
    }

    return (
        <DiaryContainer>
            <DiaryHeader>
                <input type='button' onClick={closeDiary} value='✕'/>
                <p>일기</p>
                {
                    isModal
                    ? <input type='button' onClick={() => setUtilModalShow(true)} value='...'/>
                    : <input type='button' onClick={() => confirmDiary(diaryRef.current.value, currentEmoji)} value='완료'/>}
            </DiaryHeader>
            {
                isModal
                ? <ModalPage closeDiary={closeDiary} setUtilModalShow={setUtilModalShow} setDiaryModalOpen={setDiaryModalOpen} removeDiary={removeDiary} diaryValue={diaryValue} date={date} weekDay={weekDay} currentEmoji={diaryEmojiValue} utilModalShow={utilModalShow} />
                : <DefaultPage currentEmoji={diaryEmojiValue} date={date} weekDay={weekDay} diaryValue={diaryValue} emojiModalShow={emojiModalShow} setEmojiModalShow={setEmojiModalShow} setCurrentEmoji={setCurrentEmoji} diaryRef={diaryRef}/>
            }
        </DiaryContainer>
    );
}

function EmojiModal({setCurrentEmoji, setEmojiModalShow}) {

    function setEmoji(emoji) {
        setCurrentEmoji(emoji);
        setEmojiModalShow(false);
    }

    function closeModal() {
        setEmojiModalShow(false);
    }

    return (
        <DiaryModalContainer onClick={closeModal}>
            <DiaryModal onClick={(e) => e.stopPropagation()}>
                <table>
                    <thead></thead>
                    <tbody>
                        <EmojiTable setEmoji={setEmoji}/>
                    </tbody>
                </table>
            </DiaryModal>
        </DiaryModalContainer>
    )
}

function UtilModal({setDiaryModalOpen, removeDiary, closeDiary, setUtilModalShow}) {

    function modifyProcess() {
        setDiaryModalOpen(false);
        setUtilModalShow(false);
    }

    function removeProcess() {
        removeDiary();
        setUtilModalShow(false);
    }

    return (
        <UtilModalContainer onClick={(e) => e.stopPropagation()}>
            <StyledUtilModal>
                <input type='button' onClick={modifyProcess} defaultValue='수정' />
                <input type='button' onClick={removeProcess} defaultValue='삭제' />
                <input type='button' onClick={closeDiary} defaultValue='취소' />
            </StyledUtilModal>
        </UtilModalContainer>
    )
}

function DefaultPage({currentEmoji, date, weekDay, diaryValue, emojiModalShow, setEmojiModalShow, setCurrentEmoji, diaryRef}) {
    return (
        <>
            <DiaryEmoji>
                <NormalEmoji type='button' onClick={() => setEmojiModalShow(true)} value={currentEmoji} className={`${currentEmoji === '🫥' ? 'emojiNormal' : ''}`}/>
            </DiaryEmoji>
            <p>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${weekDay}요일` }</p>
            <textarea id='diary' defaultValue={diaryValue} placeholder='오늘은 어떤 하루였나요?' ref={diaryRef}></textarea>
            {emojiModalShow ? <EmojiModal setCurrentEmoji={setCurrentEmoji} setEmojiModalShow={setEmojiModalShow}/> : ''}
        </>
    )
}

function ModalPage({currentEmoji, date, weekDay, diaryValue, utilModalShow, setDiaryModalOpen, removeDiary, closeDiary, setUtilModalShow}) {
    return (
        <>
            <DiaryEmoji>
                <p>{currentEmoji}</p>
            </DiaryEmoji>
            <p>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${weekDay}요일` }</p>
            <pre>{diaryValue}</pre>
            {utilModalShow ? <UtilModal setDiaryModalOpen={setDiaryModalOpen} removeDiary={removeDiary} closeDiary={closeDiary} setUtilModalShow={setUtilModalShow}/> : ''}
        </>
    )
}

function EmojiTable({setEmoji}) {
    const emojiTable = [];
    for(let i = 0 ; i < emojiList.length / 6; i++) {
        const emojiTr = [];
        for(let j = 1; j <= 6; j++) {
            const emoji = emojiList[i * 6 + j];
            emojiTr.push(<td onClick={() => setEmoji(emoji)}>{emoji}</td>);
        }
        emojiTable.push(<tr key={`emojiTr${i}`}>{emojiTr}</tr>);
    }

    return emojiTable;
}