import Router from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

const redirect = (context: GetServerSidePropsContext<ParsedUrlQuery>, target: string) => {
    if (context.res) {
        // server-side
        // 303: "See other"
        context.res.writeHead(303, { Location: target });
        context.res.end();
    } else {
        // client-side
        // In the browser, we just pretend like this never even happened )
        Router.replace(target);
    }
};

export default redirect