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
			script: "npm start -- -p 3020",
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: "1G",
			env: env_shared,
			env_production: env_shared,
		},
	],
};
