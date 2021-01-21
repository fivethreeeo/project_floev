import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { createApolloClient } from '../lib/apolloClient'
import { gql } from '@apollo/client'
import { getMDW, getHour } from '../utils/timeFormat'

const CompletePage = (props: {
    user: any
}) => {
    const userSchedule: Schedule = props.user.reservations[props.user.reservations.length - 1]


    return (<>
        <Head>
            <script type="text/javascript" charSet="UTF-8" src="//t1.daumcdn.net/adfit/static/kp.js"></script>
            <script type="text/javascript">
                kakaoPixel('784604748053330030').pageView();
                kakaoPixel('784604748053330030').purchase('reservationcomp');
          </script>
        </Head>
        <div className="contentWrap">
            <p className="qDesc3">{props.user.name}님 <strong>서비스 예약 일정</strong>은<br />
                <strong>{getMDW(userSchedule.date)} {getHour(userSchedule.date)}</strong><br />
                <strong>예약 라운지</strong>는 {userSchedule.loungeCode === 1 ? '역삼성당' : '강남'}입니다.<br />
            </p>
            <p>- 쿠폰은 라운지에서 체험 후 구매를 원하시면 자동 적용됩니다.</p>
            <p>- 결제할 때 별도의 쿠폰 이미지를 제시하실 필요는 없습니다.</p>
            <p>- 다른 할인 이벤트와 중복으로 사용 가능합니다.</p>
            <p>- 예약 취소 시 쿠폰은 자동 소멸됩니다.</p>
        </div>
    </>)
}

const CHECKUP_USER = gql`
	query checkUpUser{
		checkUpUser{
			id
            name
            email
            phoneNumber
            reservations{
              id
              date
              loungeCode
            }
		}
	}
`

export const getServerSideProps: GetServerSideProps = async (context) => { //{ req }: { req: any }
    const client = createApolloClient(context)
    const { user } = await client.query({ query: CHECKUP_USER })
        .then(({ data }) => {
            return { user: data.checkUpUser };
        })
        .catch(() => {
            // Fail gracefully
            return { user: null };
        });

    return {
        props: {
            // this hydrates the clientside Apollo cache in the `withApollo` HOC
            apolloStaticCache: client.cache.extract(),
            user
        },
    }
}

export default CompletePage