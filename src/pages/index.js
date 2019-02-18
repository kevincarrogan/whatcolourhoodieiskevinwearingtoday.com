import React from 'react';
import { Helmet } from 'react-helmet';

import Hoodie from '../components/hoodie';

import '../components/main.css';

const IndexPage = ()  => {
  const colour = 'dim grey';
  const hex = '696969';

  return (
    <>
      <Hoodie colour={colour} hex={hex} />
      <Helmet>
        <link href="https://fonts.googleapis.com/css?family=Nunito:700" rel="stylesheet" />
        <meta charSet="utf-8" />
        <title>It's {colour}</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://whatcolourhoodieiskevinwearingtoday.com/" />
        <meta property="og:title" content="What colour hoodie is Kevin wearing today?" />
        <meta property="og:description" content={`It's ${colour}`} />
        <meta property="og:image" content={`https://via.placeholder.com/600/${hex}/fff/?text=Kevin%27s%20hoodie`} />
      </Helmet>
    </>
  );
};

export default IndexPage;
