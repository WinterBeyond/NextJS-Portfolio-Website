import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
	return (
		<Html lang="en">
			<Head>
				{process.env.NODE_ENV === "production" && (
					<>
						<script
							async
							src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
						/>
						<script
							dangerouslySetInnerHTML={{
								__html: `
									window.dataLayer = window.dataLayer || [];
									function gtag(){window.dataLayer.push(arguments);}
									gtag("set", "linker", {domains: ["${
										process.env.NEXT_PUBLIC_DOMAIN.split("//")[1]
									}"]});
									gtag("js", new Date());
									gtag("config", "${
										process.env.GOOGLE_ANALYTICS_ID
									}", {cookie_flags: "Max-Age=7200;SameSite=None;Secure"});
								`,
							}}
						/>
					</>
				)}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
