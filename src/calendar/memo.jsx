export default function ShowMemo({menuConfirm}) {
    return (
        <>
            <textarea id="memo" cols="30" rows="10"></textarea>
            <button onClick={menuConfirm}>확인</button>
        </>
    );
}