import React, { createRef, useRef, useState } from 'react'
import SignaturePad from 'react-signature-canvas'
import { useScreenshot } from 'use-react-screenshot'

const ScreenshotPage = () => {
    const sigCanvas = useRef(null)
    const [imageURL, setImageURL] = useState('')

    const clear = () => {
        sigCanvas.current.clear()
    }
    const trim = () => {
        setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))
    }
    const screenshotRef = createRef(null)
    const [image, takeScreenshot] = useScreenshot()
    const getImage = () => takeScreenshot(screenshotRef.current)
    return <>
        <div>
            <div ref={screenshotRef}>
                <div className="sigPad">
                    <SignaturePad ref={sigCanvas} penColor='black'
                        canvasProps={{ width: 500, height: 400 }} />
                </div>
                <div>
                    <button className="button" onClick={() => clear()}>
                        Clear</button>
                    <button className="button" onClick={() => trim()}>
                        Trim</button>
                </div>
                {imageURL
                    ? <img className="sigImage" src={imageURL} />
                    : null}

                <div>
                    <button style={{ marginBottom: '10px' }} onClick={getImage}>
                        Take screenshot</button>
                </div>
            </div>
            <br /><br />
            <img width={500} src={image} alt={'Screenshot'} />
        </div>
        <style jsx>{`
              .sigPad {
                border: 1px solid black;
                padding: 0px;
                width: 500px;
                min-height: 300px
              }
              .buttons {
                width: 100%;
                height: 30px;
                border: 1px solid black;
              }
              .sigImage {
                display: block;
                margin: 0 auto;
                border: 1px solid black;
                width: 150px;
              }
            `}</style>
    </>
}
export default ScreenshotPage