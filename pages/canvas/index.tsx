// import { useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'

const Canvas = () => {
    // const [ink, setInk] = useState('')
    // const clear = () => {
    //     setInk('rgba(0,0,0,0)')
    // }
    return <>
        <SignatureCanvas penColor='black'
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
    </>
}


export default Canvas

// https://agilgur5.github.io/react-signature-canvas/