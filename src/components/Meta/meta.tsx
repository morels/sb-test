import Head from 'next/head';
import React from 'react';

type Props = {
  description?: string;
  image?: string;
  title?: string;
  name?: string;
}

export const Meta: React.FC<Props> = ({
  title,
  description,
  image,
  name,
  children,
}) => (
  <Head>
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta name="og:description" property="og:description" content={description} />
    <meta property="og:site_name" content={name} />
    <meta property="og:url" content={`${process.env.NEXT_PUBLIC_DOMAIN}`} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="SB test" />
    <meta name="twitter:creator" content="Luca Morelli" />
    <link rel="icon" type="image/png" href="/favicon-32x32.png" />
    <link rel="apple-touch-icon" href="/favicon-32x32.png" />
    <meta property="og:image" content={image} />
    <meta name="twitter:image" content={image} />
    {children}
  </Head>
);
