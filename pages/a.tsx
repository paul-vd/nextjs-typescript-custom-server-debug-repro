import React from 'react';
import { NextPage } from 'next';

const Page: NextPage = props => {
  debugger;
  console.log('Page A: render. props:', props);
  return <div>a</div>;
};

Page.getInitialProps = async ctx => {
  console.log('Page A: getInitialProps. ctx:', ctx);
  return {};
};

export default Page;
