import sendContactWebhook from "@/lib/api/sendContactWebhook";

export const handler = async (req, res) => {
	try {
		if (req.method !== "POST")
			return res
				.status(405)
				.send({ message: "Only POST requests are allowed!" });

		const { name, email, message } = req.body;
		if (!name || !email || !message)
			return res.status(400).json({
				message: "The request is missing required data!",
			});

		if (name.length > 50 || email.length > 50 || message.length > 2000)
			return res.status(403).json({
				message:
					"Name/Email must only be 50 characters and Message must only be 2000 characters!",
			});

		await sendContactWebhook(name, email, message);
		res.status(200).json({
			message:
				"Your contact request has been received! I will get back to you as soon as possible!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "The server is unable to handle your contact request right now!",
		});
	}
};

export default handler;
