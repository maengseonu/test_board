import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      // html 태그에 언어 설정
      <Html>
        <Head>
          {/* <meta
            http-equiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
