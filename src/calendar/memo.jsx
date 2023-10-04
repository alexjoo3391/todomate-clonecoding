export default function ShowMemo({memoConfirm, memoDelete, memoModalValue}) {

    return (
        <>
            <textarea id="memo" cols="30" rows="10" defaultValue={memoModalValue}></textarea>
            <div className='memoMenu'>
                <button onClick={memoDelete}>삭제</button>
                <button onClick={memoConfirm}>확인</button>
            </div>


        </>
    );
}