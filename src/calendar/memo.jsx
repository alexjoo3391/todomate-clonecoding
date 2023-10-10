export default function Memo({memoConfirm, memoDelete, memoModalValue}) {

    return (
        <>
            <div className='memoMenu'>
                <button onClick={memoDelete}>삭제</button>
                <button onClick={memoConfirm}>확인</button>
            </div>
            <textarea id="memo" cols="30" rows="10" defaultValue={memoModalValue}></textarea>
        </>
    );
}