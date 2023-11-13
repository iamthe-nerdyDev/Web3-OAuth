'use client'

import {useTheme} from 'next-themes'
// import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider'

const ThemeButton = () =>{
    const {resolvedTheme, setTheme} =useTheme()

    return(
        <button onClick={() => setTheme(resolvedTheme ==='dark' ? 'light' : 'dark') }>
            {resolvedTheme === 'dark' ? 'light' : 'dark'}
        </button>
    )
}
export default ThemeButton