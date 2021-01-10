import React, { useState } from 'react'
import axios from 'axios'

const ImagePage = () => {
    const [selectedFile, setSelectedFile] = useState<File>()
    const fileSelectedHandler = (e: any) => {
        setSelectedFile(e.target.files[0])
        console.log(e.target.files[0])
    }
    const fileUploadHandler = () => {
        const fd = new FormData()
        if (selectedFile) {
            console.log('it works!')
            fd.append('first_image', selectedFile, selectedFile.name)
            axios.post('https://apollotest.floev.com/uplaod', fd)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }
    return <>
        <input type="file" multiple={true} onChange={e => fileSelectedHandler(e)} />
        <button type="button" onClick={() => fileUploadHandler()}>파일을 업로드하셈</button>
    </>
}

export default ImagePage