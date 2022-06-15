import { StrictMode } from "react";
import { ThemeProvider } from "next-themes";
import "@/styles/global.css";

const Application = ({ Component, pageProps }) => {
	return (
		<StrictMode>
			<ThemeProvider attribute="class">
				<Component {...pageProps} />
			</ThemeProvider>
		</StrictMode>
	);
};

export default Application;
