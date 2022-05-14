import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          {/*@ts-ignore*/}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Roboto:wght@100;400&display=swap"
                rel="stylesheet" />
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="https://telegram.org/js/telegram-web-app.js"></script>
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;