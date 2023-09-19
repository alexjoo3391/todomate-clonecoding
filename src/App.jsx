import {RecoilRoot} from 'recoil'
import Calendar from './calendar/calendar.jsx'

export default function App() {

    return (
        <>
            <RecoilRoot>
                <Calendar/>
            </RecoilRoot>
        </>
    )
}