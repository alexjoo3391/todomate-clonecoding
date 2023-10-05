import {useEffect, useState} from "react";

// todo - 이모지 모달 추가, 기존 일기 선택 시 뜨는 모달 추가, 일기 삭제 기능 추가, css styled component 사용, 코드 개선.

export default function ShowDiary({day, currentMonth, diaryCancel, diaryConfirm}) {

    const [emojiModalShow, setEmojiModalShow] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState('🫥')
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
        <>
            <input type='button' onClick={diaryCancel} value='✕'/>
            <p>일기</p>
            <input type='button' onClick={() => diaryConfirm(document.querySelector('#diary').value, currentEmoji)} value='완료'/>
            <input type='button' onClick={() => setEmojiModalShow(true)} value={currentEmoji}/>
            {`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${weekDay}요일` }
            <textarea id='diary' defaultValue={diaryValue}></textarea>
            {emojiModalShow ? <ShowEmojiModal setCurrentEmoji={setCurrentEmoji}/> : ''}
        </>
    );
}

function ShowEmojiModal({setCurrentEmoji}) {

    function setEmoji(emoji) {
        setCurrentEmoji(emoji);
    }

    const emojiList = ['😀', '😃', '😄', '😁', '😆', '😅', '🙂', '🙃', '😉', '😌'];

    const emojiTable = [];
    for(let i = 0 ; i < emojiList.length / 6; i++) {
        const emojiTr = [];
        for(let j = 1; j <= 6; j++) {
            const emoji = emojiList[i * 6 + j];
            emojiTr.push(<td onClick={() => setEmoji(emoji)}>{emoji}</td>);
        }
        emojiTable.push(<tr>{emojiTr}</tr>);
    }



    return (
        <div className='emojiModalContainer'>
            <div className='emojiModal'>
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