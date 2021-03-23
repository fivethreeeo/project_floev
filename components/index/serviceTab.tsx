

const serviceTab = (props: {
    tabName: string
    title: string[]
    caption: string
    imgNum: string
}) => {
    return (<> <div className="service__slide">
        <div className="content-txt">
            <div className="content-txt__inner">
                <div className="tabname">{props.tabName}</div>
                <div className="title">{props.title[0]}<br />{props.title[1]}</div>
                <div className="caption">{props.caption}</div>
            </div>
        </div>
        <div className="content-img">
            <div className="content-img__inner">
                <img src={`/img/home/home_service_${props.imgNum}.jpg`} alt="" />
            </div>
        </div>
    </div>
    </>)
}

export default serviceTab