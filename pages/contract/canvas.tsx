import React, { useRef, useState } from 'react'
import ReactSignatureCanvas from 'react-signature-canvas';
import SignaturePad from 'react-signature-canvas'

const Contract = () => {
    const sigCanvas = useRef() as React.MutableRefObject<ReactSignatureCanvas>;
    const [imageURL, setImageURL] = useState('')


    const clear = () => {
        sigCanvas.current.clear()
    }
    const trim = () => {
        setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))
    }

    return <>
        <div>
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

export default Contract

// https://agilgur5.github.io/react-signature-canvas/