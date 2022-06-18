export const pageView = (url, title) => {
	if (process.env.NODE_ENV === "production")
		window.gtag("config", process.env.GOOGLE_ANALYTICS_ID, {
			page_location: url,
			page_title: title,
		});
};
