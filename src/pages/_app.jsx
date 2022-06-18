import { StrictMode, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { pageView } from "@/lib/gtag";
import "@/styles/global.css";

const Application = ({ Component, pageProps, router }) => {
	useEffect(() => {
		const handleRouteChange = (url) => {
			pageView(url, document.title);
		};

		router.events.on("routeChangeComplete", handleRouteChange);

		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router]);

	return (
		<StrictMode>
			<ThemeProvider attribute="class">
				<Component {...pageProps} />
			</ThemeProvider>
		</StrictMode>
	);
};

export default Application;
