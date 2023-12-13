const env_shared = {
	SPOTIFY_OAUTH_CLIENT_ID: process.env.SPOTIFY_OAUTH_CLIENT_ID,
	SPOTIFY_OAUTH_SECRET: process.env.SPOTIFY_OAUTH_SECRET,
	SPOTIFY_OAUTH_REDIRECT_URI: process.env.SPOTIFY_OAUTH_REDIRECT_URI,
	SPOTIFY_OAUTH_REFRESH_TOKEN: process.env.SPOTIFY_OAUTH_REFRESH_TOKEN,
};

module.exports = {
	apps: [
		{
			name: "personal-portfolio",
			script: "npm start",
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: "1G",
			env: {
				NODE_ENV: "development",
				...env_shared,
			},
			env_production: {
				NODE_ENV: "production",
                NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
				...env_shared,
			},
		},
	],
};
