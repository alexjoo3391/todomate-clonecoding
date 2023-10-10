import {useEffect, useState} from "react";

export default function Diary({day, currentMonth, cancelDiary, confirmDiary, removeDiary, isModal, utilModalShow, setUtilModalShow, setDiaryModal}) {

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
        <div className='diaryContainer'>
            <div className='diaryHeader'>
                <input type='button' onClick={cancelDiary} value='✕'/>
                <p>일기</p>
                {
                    isModal
                    ? <input type='button' onClick={() => setUtilModalShow(true)} value='...'/>
                    : <input type='button' onClick={() => confirmDiary(document.querySelector('#diary').value, currentEmoji)} value='완료'/>}
            </div>
            {
                isModal
                ? <ModalPage cancelDiary={cancelDiary} setUtilModalShow={setUtilModalShow} setDiaryModal={setDiaryModal} removeDiary={removeDiary} diaryValue={diaryValue} date={date} weekDay={weekDay} currentEmoji={currentEmoji} utilModalShow={utilModalShow} />
                : <DefaultPage currentEmoji={currentEmoji} date={date} weekDay={weekDay} diaryValue={diaryValue} emojiModalShow={emojiModalShow} setEmojiModalShow={setEmojiModalShow} setCurrentEmoji={setCurrentEmoji}/>
            }
        </div>
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
        <div className='emojiModalContainer' onClick={closeModal}>
            <div className='emojiModal' onClick={(e) => e.stopPropagation()}>
                <table>
                    <thead></thead>
                    <tbody>
                        {emojiTable}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function UtilModal({setDiaryModal, removeDiary, cancelDiary, setUtilModalShow}) {

    function modifyProcess() {
        setDiaryModal(false);
        setUtilModalShow(false);
    }

    function removeProcess() {
        removeDiary();
        setUtilModalShow(false);
    }

    return (
        <div className='utilModalContainer' onClick={(e) => e.stopPropagation()}>
            <div className='utilModal'>
                <input type='button' onClick={modifyProcess} defaultValue='수정' />
                <input type='button' onClick={removeProcess} defaultValue='삭제' />
                <input type='button' onClick={cancelDiary} defaultValue='취소' />
            </div>
        </div>
    )
}

function DefaultPage({currentEmoji, date, weekDay, diaryValue, emojiModalShow, setEmojiModalShow, setCurrentEmoji}) {
    return (
        <>
            <div className='diaryEmoji'>
                <input type='button' onClick={() => setEmojiModalShow(true)} value={currentEmoji} className={`${currentEmoji === '🫥' ? 'emojiNormal' : ''}`}/>
            </div>
            <p>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${weekDay}요일` }</p>
            <textarea id='diary' defaultValue={diaryValue} placeholder='오늘은 어떤 하루였나요?'></textarea>
            {emojiModalShow ? <EmojiModal setCurrentEmoji={setCurrentEmoji} setEmojiModalShow={setEmojiModalShow}/> : ''}
        </>
    )
}

function ModalPage({currentEmoji, date, weekDay, diaryValue, utilModalShow, setDiaryModal, removeDiary, cancelDiary, setUtilModalShow}) {
    return (
        <>
            <div className='diaryEmoji'>
                <p>{currentEmoji}</p>
            </div>
            <p>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${weekDay}요일` }</p>
            <p>{diaryValue}</p>
            {utilModalShow ? <UtilModal setDiaryModal={setDiaryModal} removeDiary={removeDiary} cancelDiary={cancelDiary} setUtilModalShow={setUtilModalShow}/> : ''}
        </>
    )
}