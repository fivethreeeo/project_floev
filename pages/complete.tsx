import React from "react";
import Layout from '../layout/DefaultLayout';
import Head from "next/head";
import { GetServerSideProps } from "next";
import { createApolloClient } from '../lib/apolloClient'
import { gql } from '@apollo/client'
import { getMDW, getHour } from '../utils/timeFormat'
import axios from "axios";
import { SHA256 } from '../utils/crypto'
import moment from "moment";

const CompletePage = (props: {
    user: any
}) => {
    const userSchedule: PurchaseRequest = props.user.requests[props.user.requests.length - 1]

    return (<>
        <Head>
            <script type="text/javascript" charSet="UTF-8" src="//t1.daumcdn.net/adfit/static/kp.js"></script>
            <script type="text/javascript">
                kakaoPixel('784604748053330030').pageView();
                kakaoPixel('784604748053330030').purchase('reservationcomp');
          </script>
        </Head>
        <Layout name={props.user ? props.user.name : undefined}>
            <div className="complete">
                <div className="request">
                    <div className="request__msg">설문이 완료되었어요.</div>
                    <div className="request__info">
                        <div className="request__info-inner">
                            <p>예약 정보</p>
                            {props.user === null ? '' : props.user.name}님 <strong>서비스 예약 일정</strong>은<br />
                            <strong className="schedule">{getMDW(userSchedule.date)} {getHour(userSchedule.date)}</strong><br />
                            <strong>예약 라운지는 </strong><strong className="lounge">{userSchedule.loungeCode === 1 ? '역삼성당' : '강남'}</strong> 입니다.
                            </div>
                        <div><a style={{ maxWidth: '260px', margin: '24px auto 0', display: 'block', fontSize: '14px', color: '#999', textDecoration: 'underline' }} href="/mypage">예약변경, 취소 하러가기 &#xE001;</a></div>
                    </div>
                </div>
                <div className="coupon">
                    <div className="coupon__img"><img src="/static/img/survey/coupon-welcome.jpg" alt="" /></div>
                    <div className="coupon__noti">
                        <ul>
                            <li>* 쿠폰은 라운지 체험 후 구매를 원하시면 자동 적용됩니다.</li>
                            <li>* 결제할 때 별도의 쿠폰 이미지를 제시하실 필요는 없습니다.</li>
                            <li>* 다른 할인 이벤트와 중복으로 사용 가능합니다.</li>
                            <li>* 예약 취소 시 쿠폰은 자동 소멸됩니다.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    </>)
}

const CHECKUP_USER = gql`
	query checkUpUser{
		checkUpUser{
			id
            name
            email
            phoneNumber
            requests{
              id
              date
              loungeCode
            }
		}
	}
`

export const getServerSideProps: GetServerSideProps = async (context) => { //{ req }: { req: any }
    const client = createApolloClient(context)
    const user: User = await client.query({ query: CHECKUP_USER })
        .then(({ data }) => {
            return data.checkUpUser;
        })
        .catch(() => {
            return { user: null };
        });
    if (user) {
        await axios.post("https://graph.facebook.com/v9.0/2371955746349798/events?access_token=EAAHcnHVaQ5ABAIPBnix9Y05zaLn4hZAt9mVCa2ZALzJ7BPPg27mO0KHtopUBZC4jYVsJWqQ9flFh3MWp0STyUwHxrY94FmHN0TyczBEQ39VRh2BDinQTv50eFgDqwmSQsjUSI2uOo0Nfp63wmf7RTyi7xdJNAdnEgycRZClyrUBeNsZAySEThqu0nreNBabUZD", {
            "data": [{
                "event_name": "Schedule",
                "event_time": moment().unix(),
                "user_data": {
                    "fn": SHA256(user.name),
                    "ph": SHA256(user.phoneNumber)
                }
            }]
        }).then((result) => {
            return result.data
        }).catch((errer: any) => {
            console.error(errer.message)
        })
    }
    return {
        props: {
            // this hydrates the clientside Apollo cache in the `withApollo` HOC
            apolloStaticCache: client.cache.extract(),
            user
        },
    }
}

// {
//     "data": [{
//         "event_name": "Schedule",
//         "event_time": moment().unix(),
//         "user_data": {
//             "fn": SHA256(user.name),
//             "pn": SHA256(user.phoneNumber)
//         }
//     }],
// }

export default CompletePage