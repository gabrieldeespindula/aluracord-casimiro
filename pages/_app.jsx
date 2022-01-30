import Head from "next/head";

function GlobalStyles() {
	return (
		<style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
	);
}

export default function app({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Aluracod do Cazé</title>
				<link rel="icon" type="image/x-icon" href="/favicon.png"></link>
			</Head>
			<GlobalStyles />
			<Component {...pageProps} />
		</>
	)
}