import {MemoMenu, MemoTextArea} from "../styles/style.js";

export default function Memo({confirmMemo, deleteMemo, memoModalValue}) {

    let memoValue = null;

    function updateMemoValue(e) {
        memoValue = e.target.value
    }

    return (
        <>
            <MemoMenu>
                <button onClick={deleteMemo}>삭제</button>
                <button onClick={() => confirmMemo(memoValue)}>확인</button>
            </MemoMenu>
            <MemoTextArea id="memo" cols="30" rows="10" defaultValue={memoModalValue} onChange={(e) => updateMemoValue(e)}></MemoTextArea>
        </>
    );
}