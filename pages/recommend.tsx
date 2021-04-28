import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import jwt from 'jsonwebtoken'

const STYLEGUIDETOGO_URL = "https://imageadmin.floev.com"

interface FrameInfo {
  brand: string
  model: string
  color: string
  floevPrice: string
}

interface Props {
  frameInfos: FrameInfo[],
  name: string,
  requestDate: string,
  requestTime: string,
  lounge: string,
  frameIds: string[]
}

const StyleGuideToGo = ({
  frameInfos,
  name,
  requestDate,
  requestTime,
  lounge,
  frameIds
}: Props) => {
  const [imageList, setImageList] = useState<any[]>([])

  useEffect(() => {
    const getFrameImageSet = async (frameIds: string[]) => {
      let frameImageSet: any[] = []
      for (let idx in frameIds) {
        const frameImage = await axios.get('https://imageadmin.floev.com/api/recommendImage', {
          params: { frameId: frameIds[idx] },
          responseType: 'blob'
        }).then(async res => {
          return res.data
        }).catch(err => {
          console.error(err.message)
        });
        frameImageSet.push(frameImage)
      }
      setImageList(frameImageSet)
    }

    getFrameImageSet(frameIds)
    window.history.pushState("", "title", "/recommend");
  }, [])

  const viewImagesWithFrameInfos = () => {
    const liElements: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>[] = []

    if (imageList.length > 0 && frameInfos.length > 0) {
      const length = imageList.length <= 16 ? imageList.length : 16;
      for (let idx = 0; idx < length; idx++) {
        liElements.push(
          <li className="item" key={idx}>
            <div className="img"><img src={URL.createObjectURL(imageList[idx])} alt="" /></div>
            <div className="info-wrap">
              <div className="info"><span>brand</span>{frameInfos[idx].brand}</div>
              <div className="info"><span>model</span>{frameInfos[idx].model}</div>
              <div className="info"><span>color</span>{frameInfos[idx].color}</div>
              <div className="info"><span>floev price</span>{frameInfos[idx].floevPrice}</div>
            </div>
            <div className="clearfix"></div>
          </li>
        )
      }
    }
    if (liElements.length === 0) {
      return <p>추천된 테가 없습니다.</p>
    }
    return liElements
  }

  return (
    <div className="page_recommend">
      <div className="print">
        <header className="header">
          <div className="header__title">
            <h2>STYLE GUIDE</h2>
            <div className="img"><img src="/img/tog.png" alt="" /></div>
            <div className="clearfix"></div>
          </div>
          <div className="header__name">
            <div className="label">name</div>
            <div className="name">{name}</div>
          </div>
          <div className="header__schedule">
            <p className="label">service time</p>
            <p className="schedule">{requestDate}/{requestTime}/{lounge}</p>
          </div>
          {/* <div className="header__logo">
          <div className="img"><img src="/img/logo.png" alt="" /></div>
        </div> */}
        </header>

        <div className="clearfix"></div>

        <section className="content">
          <div className="content__header">
            <div className="desc1">플로브가 추천하는 나에게 어울리는 안경</div>
            <div className="img"><img src="/img/pick.svg" alt="" /></div>
            <div className="clearfix"></div>
          </div>
          <div className="content__main">
            <ul className="list-wrap">
              {viewImagesWithFrameInfos()}
              <div className="clearfix"></div>
            </ul>
          </div>
        </section>

        <div className="footer-after">
          <div className="txt">눈의 피로도를 줄여주는 미색 용지를 사용하였습니다.</div>
          <div className="img"><img src="/img/two-eyelashes.svg" alt="" /></div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7J207ISx7KSAIiwicmVxdWVzdERhdGUiOiIyMDIxLTA0LTI3IiwicmVxdWVzdFRpbWUiOiIxMzowMCIsImxvdW5nZSI6IuqwleuCqCIsImZyYW1lSWRzIjpbIjAxQjAwMDAwUkQwMDAzNSIsIjAxQjAwMDAwR0owMDAzMSIsIjAxQjAwMDAwSkowMDAyMSIsIjAxQjAwMDAwSkowMDAwNCIsIjAxQjAwMDAwRkYwMDAwOSIsIjAxQjAwMDAwRlcwMDA0OSIsIjAxQjAwMDAwUlAwMDAwMiIsIjAxQjAwMDAwUkIwMDAyOSIsIjAxQjAwMDAwUkUwMDAzNiIsIjAxQjAwMDAwUk8wMDExNCIsIjAxQjAwMDAwUkwwMDAwNiIsIjAxQjAwMDAwUk8wMDEyMiIsIjAxQjAwMDAwUkUwMDA3OCIsIjAxQjAwMDAwUkcwMDAzNyIsIjAxQjAwMDAwUk4wMDAzOSIsIjAxQjAwMDAwRU4wMDAwNSJdLCJpYXQiOjE2MTk1MDUzOTYsImV4cCI6MTYxOTU5MTc5Nn0.fiA2icmJrByu3iU4jb4w5OuhEKz1sQhmxG06an1dat8"
  const token = context.query.token as string;

  try {
    const { name, requestDate, requestTime, lounge, frameIds } = jwt.verify(token, 'secret') as any

    const frameInfos: FrameInfo[] = await axios.get(STYLEGUIDETOGO_URL + '/api/frameInfo', {
      params: { frameIds: frameIds }
    }).then(res => {
      return res.data.frameInfos
    }).catch(err => {
      console.error(err.message)
    })

    return {
      props: {
        name,
        requestDate,
        requestTime,
        lounge,
        frameIds,
        frameInfos
      }
    }
  } catch (e) {
    return ({
      props: {},
      redirect: {
        destination: '/error'
      }
    })
  }

}

export default StyleGuideToGo
