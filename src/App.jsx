import {RecoilRoot} from 'recoil'
import Calendar from './calendar/calendar.jsx'
import {GlobalStyle, StyledCalendar} from "./styles/style.js";

export default function App() {

    return (
        <>
            <GlobalStyle />
            <RecoilRoot>
                <StyledCalendar>
                    <Calendar/>
                </StyledCalendar>
            </RecoilRoot>
        </>
    )
}