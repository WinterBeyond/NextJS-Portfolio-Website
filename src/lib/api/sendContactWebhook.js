import fetcher from "@/lib/fetcher";

export const sendContactWebhook = async (name, email, message) => {
	try {
		await fetcher(process.env.CONTACT_DISCORD_WEBHOOK, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				embeds: [
					{
						color: 0x3456c7,
						timestamp: new Date().toISOString(),
						title: "Contact Request",
						fields: [
							{
								name: "Name",
								value: `\`${name}\``,
								inline: true,
							},
							{
								name: "Email",
								value: `\`${email}\``,
								inline: true,
							},
							{
								name: "Message",
								value: `\`${message}\``,
							},
						],
					},
				],
			}),
		});
	} catch (error) {
		throw error;
	}
};

export default sendContactWebhook;
