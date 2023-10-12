import {MemoMenu, MemoTextArea} from "../styles/style.js";
import {useRef} from "react";

export default function Memo({memoConfirm, memoDelete, memoModalValue}) {

    let memoValue = null;

    function updateMemoValue(e) {
        memoValue = e.target.value
    }

    return (
        <>
            <MemoMenu>
                <button onClick={memoDelete}>삭제</button>
                <button onClick={() => memoConfirm(memoValue)}>확인</button>
            </MemoMenu>
            <MemoTextArea id="memo" cols="30" rows="10" defaultValue={memoModalValue} onChange={(e) => updateMemoValue(e)}></MemoTextArea>
        </>
    );
}