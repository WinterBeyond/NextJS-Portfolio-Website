const ecosystemConfig = {
  apps: [
    {
      name: "personal-portfolio",
      script: "npm start -- -p 3020",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};

export default ecosystemConfig;
