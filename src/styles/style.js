import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    user-select: none;
  }

  * button:hover {
    cursor: pointer;
  }
`;

export const StyledCalendar = styled.div`
  padding: 10px;

  @media (min-width: 700px) {
    display: flex;
    gap: 50px;
  }
`;

export const CalendarMain = styled.div`
  @media (min-width: 700px) {
    width: 400px;
  }
`;

export const CalendarTodo = styled.div``;

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100% - 180px);
  background-color: #00000066;
  display: none;
  padding-bottom: 180px;

  &.modalShow {
    display: block !important;
  }
`;

export const StyledCalendarMonth = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;

  & button {
    background-color: white;
    border: none;
    width: 20px;
    height: 20px;
  }
`;

export const Table = styled.table`
  width: 100%;
  text-align: center;
`;

export const Thead = styled.thead`

  margin-top: 10px;

  & th {
    font-size: 10px;
  }
`;

export const Td = styled.td`
  &.td p {
    font-size: 13px;
    line-height: 20px;
    width: 20px;
    margin: 0 auto;
  }

  &.td p:hover {
    cursor: pointer;
  }

  &.td div {
    margin-bottom: 5px;
    height: 20px;
  }
`

export const TextInput = styled.input`
  &[type=text] {
    width: calc(100% - 20px);
    margin-top: 1px;
    border: none;
    border-bottom: 1px solid black;
  }
`;

export const DayBox = styled.div`
  &.dayBox {
    font-size: 20px;
    width: 20px;
    height: 30px;
    margin: 0 auto 5px;
    border-radius: 5px;
    line-height: 20px;
  }

  &.dayBox:hover {
    cursor: pointer;
  }

  &.dayBoxTodo {
    font-size: 15px;
    background-color: #C9CFD3;
    color: white;
    text-shadow: 0 0 1px black;
  }

  &.dayBoxCheck {
    background-color: black;
  }

  &.diary {
    color: transparent;
    text-shadow: 0 0 0 #999999;
  }

  &.diaryToday {
    text-shadow: 0 0 0 dodgerblue !important;
  }
`;

export const SelectedDay = styled.div`
  &.selected p {
    border-radius: 50%;
    background-color: dodgerblue !important;
    color: white;
  }

  &.today p {
    margin: 0 auto;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    background-color: black;
    color: white;
  }
`;

export const RadioList = styled.div`
  display: flex;
  justify-content: center;
`;

export const Radio = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px;
  background-color: #EFEFEF;
  border-radius: 1.5em;

  & label {
    font-weight: bold;
    font-size: 14px;
  }

  & label:hover {
    cursor: pointer;
  }

  & input {
    margin-top: .5em;
    vertical-align: middle;
    appearance: none;
    width: .4em;
    height: .4em;
    border: .2em solid white;
    border-radius: 50%;
  }

  & input:checked {
    border-color: #31E94C;
  }
`;

export const StyledTodo = styled.div`
  & > p > button {
    background-color: white;
    border: none;
    width: 20px;
    height: 20px;
  }

  @media (min-width: 700px) {
    min-width: 226px;
  }
`;

export const TodoList = styled.div`
  & > p {
    display: inline-flex;
    background-color: #EFEFEF;
    margin-bottom: 10px;
    margin-top: 20px;
    padding: 7px;
    border-radius: 50px;
    font-size: 14px;
    line-height: 20px;

    & > i {
      line-height: 20px;
      margin-right: 5px;
      color: #BEC2C6;
    }
  }

  & button {
    margin-left: 8px;
    border: none;
    width: 1.5em;
    height: 1.5em;
    background-color: white;
    border-radius: .75em;
  }
`;

export const TodoCheck = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;

  & button {
    background-color: white;
    border: none;
    width: 20px;
    height: 20px;
  }
`;

export const TodoCheckBox = styled.div`
  display: flex;
  width: 100%;

  & input[type=checkbox] {
    display: none;
  }

  & label {
    font-size: 15px;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    text-align: center;
    line-height: 20px;
    background-color: #C9CFD3;
    color: white;
    margin-right: 10px;
  }

  & input:checked ~ label {
    background-color: black !important;
    color: white !important;
  }
`;

export const TodoInput = styled.div`
  &.display {
    display: flex !important;

    & button {
      background-color: white;
      border: none;
      width: 20px;
      height: 20px;

      &:hover {
        cursor: pointer;
      }
    }

  }

  &.todoInput1, &.todoInput2, &.todoInput3 {
    display: none;
  }
`;

export const TodoMemo = styled.div`
  & p {
    padding-left: 30px;
    font-weight: bold;
    font-size: 12px;
    color: black;
  }

  & p i {
    color: lightgray;
    font-size: 13px;
    margin-right: 5px;
  }
`;

export const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 40px);
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  background-color: white;
  padding: 20px;
  border-radius: 20px;

  & button {
    font-size: 14px;
    margin-bottom: 20px;
    border: none;
  }

  & > button {
    display: flex;
    text-align: left;
    line-height: 30px;
    background-color: transparent;
  }

  & > button div {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: white;
    border-radius: 15px;
    margin-right: 10px;
  }

  & > button:nth-child(2) div {
    background-color: slateblue;
  }

  & > button:nth-child(3) div {
    background-color: gold;
  }

  @media (min-width: 500px) {
    width: 460px;
  }
`;

export const ModalMenu = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  & button {
    width: calc(50% - 5px);
    border-radius: 10px;
    height: 70px;
  }

  & button:first-child i {
    color: dodgerblue;
  }

  & button:last-child i {
    color: crimson;
  }
`;

export const ModalTable = styled.table`
  text-align: center;
  width: 100%;

  & .selected {
    background-color: dodgerblue;
    color: white;
  }

  & p {
    font-size: 16px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
  }

  & td {
    width: 40px;
    height: 40px;
  }
`;

export const MemoBox = styled.pre`
  padding: 10px;
  background-color: lemonchiffon;
  border-radius: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MemoMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & button {
    background-color: transparent;
    font-size: 16px;
    display: inline-flex;
  }

  & button:first-child {
    color: red;
  }
`;

export const MemoTextArea = styled.textarea`
  resize: none;
  border: none;
  background-color: lemonchiffon;
  border-radius: 20px;
  padding: 10px;
`;

export const DiaryModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100% - 180px);
  background-color: #00000066;
  padding-bottom: 180px;
`;

export const DiaryModal = styled.div`
  width: calc(100% - 40px);
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  background-color: white;
  padding: 20px;
  min-height: 350px;

  & table {
    width: 100%;
    text-align: center;
  }

  & td {
    font-size: 20px;
  }

  @media (min-width: 500px) {
    width: 460px;
  }
`;

export const DiaryContainer = styled.div`
  padding: 10px;

  & > p {
    margin: 10px 0;
  }

  & input[type=button]:hover {
    cursor: pointer;
  }

  & textarea {
    border: none;
    resize: none;
    width: 100%;
    height: 100px;
  }
`;

export const DiaryHeader = styled.div`
  display: flex;
  justify-content: space-between;

  & p {
    font-size: 20px;
  }

  & input {
    background-color: transparent;
    border: none;
    font-size: 15px;
    line-height: 15px;
  }
`;

export const DiaryEmoji = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;

  & p {
    font-size: 40px;
  }

  & input {
    font-size: 40px;
    background-color: transparent;
    border: none;
  }
`;

export const NormalEmoji = styled.input`
  &.emojiNormal {
    color: transparent;
    text-shadow: 0 0 0 dodgerblue;
  }
`;

export const UtilModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100% - 180px);
  background-color: #00000011;
  padding-bottom: 180px;
`;

export const StyledUtilModal = styled.div`
  width: calc(100% - 20px);
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  padding: 10px;

  & input {
    width: 100%;
    height: 60px;
    border: none;
    background-color: #dddddd;
    color: dodgerblue;
    border-radius: 10px;

    &:first-child {
      border-radius: 10px 10px 0 0;
      border-bottom: 1px solid #999999;
    }

    &:nth-child(2) {
      border-radius: 0 0 10px 10px;
      margin-bottom: 10px;
    }
  }
`;