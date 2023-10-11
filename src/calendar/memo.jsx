import {MemoMenu, MemoTextArea} from "../styles/style.js";

export default function Memo({memoConfirm, memoDelete, memoModalValue}) {

    return (
        <>
            <MemoMenu>
                <button onClick={memoDelete}>삭제</button>
                <button onClick={memoConfirm}>확인</button>
            </MemoMenu>
            <MemoTextArea id="memo" cols="30" rows="10" defaultValue={memoModalValue}></MemoTextArea>
        </>
    );
}