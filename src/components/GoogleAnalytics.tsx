"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
	return (
		<>
			{process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
				<>
					<Script
						src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
						strategy="afterInteractive"
					/>
					<Script
						id="google-analytics"
						strategy="afterInteractive"
						dangerouslySetInnerHTML={{
							__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
							`,
						}}
					/>
				</>
			)}
		</>
	);
}
