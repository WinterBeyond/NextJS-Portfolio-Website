import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
	if (typeof window !== "undefined") {
		window.dataLayer = window.dataLayer || [];
		const gtag = () => {
			window.dataLayer.push(arguments);
		};

		gtag("js", new Date());
		gtag("config", process.env.GOOGLE_ANALYTICS_ID);
	}

	return (
		<Html lang="en">
			<Head>
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
