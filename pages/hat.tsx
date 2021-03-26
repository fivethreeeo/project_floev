import axios from "axios"
import Head from 'next/head'
import Layout from "../layout/DefaultLayout"

const Hatchery = () => {

    const onClick = async () => {
        await axios.get('https://bigquery.googleapis.com/bigquery/v2/projects/pelagic-pathway-307805/serviceAccount')
            .then(res => {
                console.log(res)
            }).catch((err) => {
                console.error(err)
            })
    }

    return (
        <>
            <Head>


            </Head>
            <p>hello world!</p>
            {/* <div className="g-signin2" data-onsuccess="onSignIn" onClick={googleLogin}>구글 로그인</div> */}
            <button onClick={onClick}>계정 받기</button>
            {/* {onClick()} */}
        </>
    )
}

export default Hatchery


/*
{
    "client": {
        "type": "browser",
        "name": "Chrome",
        "version": "89.0",
        "engine": "Blink",
        "engineVersion": ""
    },
    "os": {
        "name": "Mac",
        "version": "11.1",
        "platform": ""
    },
    "device": {
        "type": "desktop",
        "brand": "Apple",
        "model": ""
    },
    "bot": null
}
*/