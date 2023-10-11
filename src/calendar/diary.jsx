import {useEffect, useState} from "react";
import {
    DiaryContainer,
    DiaryEmoji,
    DiaryHeader,
    DiaryModal,
    DiaryModalContainer,
    NormalEmoji, StyledUtilModal, UtilModalContainer
} from "../styles/style.js";

export default function Diary({day, currentMonth, closeDiary, confirmDiary, removeDiary, isModal, utilModalShow, setUtilModalShow, setDiaryModalOpen}) {

    const [emojiModalShow, setEmojiModalShow] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState('🫥');

    const today = new Date()
    const date = new Date(today.getFullYear(), today.getMonth() + currentMonth, day);
    const dayString = date.getFullYear().toString()
        + (('0' + (date.getMonth() + 1)).slice(-2)).toString()
        + (('0' + date.getDate()).slice(-2)).toString();

    let weekDay = '';
    switch (date.getDay()) {
        case 0: weekDay = '일'; break;
        case 1: weekDay = '월'; break;
        case 2: weekDay = '화'; break;
        case 3: weekDay = '수'; break;
        case 4: weekDay = '목'; break;
        case 5: weekDay = '금'; break;
        case 6: weekDay = '토'; break;
    }

    let diaryValue = '';

    if(sessionStorage.hasOwnProperty(`diary${dayString}`)) {
        useEffect(() => {
            setCurrentEmoji(JSON.parse(sessionStorage.getItem(`diary${dayString}`))[0]);
        }, []);
        diaryValue = JSON.parse(sessionStorage.getItem(`diary${dayString}`))[1];
    }

    return (
        <DiaryContainer>
            <DiaryHeader>
                <input type='button' onClick={closeDiary} value='✕'/>
                <p>일기</p>
                {
                    isModal
                    ? <input type='button' onClick={() => setUtilModalShow(true)} value='...'/>
                    : <input type='button' onClick={() => confirmDiary(document.querySelector('#diary').value, currentEmoji)} value='완료'/>}
            </DiaryHeader>
            {
                isModal
                ? <ModalPage closeDiary={closeDiary} setUtilModalShow={setUtilModalShow} setDiaryModalOpen={setDiaryModalOpen} removeDiary={removeDiary} diaryValue={diaryValue} date={date} weekDay={weekDay} currentEmoji={currentEmoji} utilModalShow={utilModalShow} />
                : <DefaultPage currentEmoji={currentEmoji} date={date} weekDay={weekDay} diaryValue={diaryValue} emojiModalShow={emojiModalShow} setEmojiModalShow={setEmojiModalShow} setCurrentEmoji={setCurrentEmoji}/>
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

    const emojiList = ['😀', '😃', '😄', '😁', '😆', '😅', '🙂', '🙃', '😉', '😌'];

    const emojiTable = [];
    for(let i = 0 ; i < emojiList.length / 6; i++) {
        const emojiTr = [];
        for(let j = 1; j <= 6; j++) {
            const emoji = emojiList[i * 6 + j];
            emojiTr.push(<td onClick={() => setEmoji(emoji)}>{emoji}</td>);
        }
        emojiTable.push(<tr key={`emojiTr${i}`}>{emojiTr}</tr>);
    }



    return (
        <DiaryModalContainer onClick={closeModal}>
            <DiaryModal onClick={(e) => e.stopPropagation()}>
                <table>
                    <thead></thead>
                    <tbody>
                        {emojiTable}
                    </tbody>
                </table>
            </DiaryModal>
        </DiaryModalContainer>
    )
}

function UtilModal({setDiaryModalOpen, removeDiary, closeDiary, setUtilModalShow}) {

    function modifyProcess() {
        console.log('asd')
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

function DefaultPage({currentEmoji, date, weekDay, diaryValue, emojiModalShow, setEmojiModalShow, setCurrentEmoji}) {
    return (
        <>
            <DiaryEmoji>
                <NormalEmoji type='button' onClick={() => setEmojiModalShow(true)} value={currentEmoji} className={`${currentEmoji === '🫥' ? 'emojiNormal' : ''}`}/>
            </DiaryEmoji>
            <p>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${weekDay}요일` }</p>
            <textarea id='diary' defaultValue={diaryValue} placeholder='오늘은 어떤 하루였나요?'></textarea>
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