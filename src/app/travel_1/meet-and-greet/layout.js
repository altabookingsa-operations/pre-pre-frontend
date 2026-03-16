import Head from 'next/head';
import React from 'react';
export const metadata = {
  title: 'Stop searching, start booking your Airport Meet & Greet at once',
};
const MeetAndGreet = ({ children }) => {
  return (
    <>
      <Head>
        <title>Stop searching, start booking your Airport Meet & Greet at once</title>
      </Head>
      {children}
    </>
  );
};

export default MeetAndGreet;
