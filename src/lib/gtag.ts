export const pageView = (url: string, title: string) => {
	if (process.env.NODE_ENV === "production")
		(window as any).gtag("config", process.env.GOOGLE_ANALYTICS_ID, {
			page_location: url,
			page_title: title,
		});
};
