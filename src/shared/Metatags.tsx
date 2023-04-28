import Head from 'next/head';

export default function Metatags({
  title = 'BR Devs | Brazilians Developers in Canada',
  description = 'BR Devs is a blog for Brazilians Developers to share their experiences and technical knowledge working in Canada',
  image = '',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
