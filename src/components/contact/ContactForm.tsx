import { ChangeEvent, FormEvent, useState } from "react";

import constants from "@/constants/index";
import fetcher from "@/lib/fetcher";

import GithubIcon from "@/components/icons/GithubIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import ErrorCard from "@/components/cards/ErrorCard";
import SuccessCard from "@/components/cards/SuccessCard";

type FormState = {
	name: string;
	email: string;
	message: string;
};

const ContactForm = () => {
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const [isLoading, setLoading] = useState<boolean>(false);
	const [form, setForm] = useState<FormState>({
		name: "",
		email: "",
		message: "",
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setSuccess("");
		setError("");

		try {
			const data = await fetcher(
				`${process.env.NEXT_PUBLIC_DOMAIN}/api/contact`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(form),
				}
			);

			setForm({ name: "", email: "", message: "" });
			setSuccess(data?.message);
		} catch (error: any) {
			setError(error?.message);
		}

		setLoading(false);
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm((previousForm) => {
			return { ...previousForm, [e.target.name]: e.target.value };
		});
	};

	return (
		<section>
			<div className="max-w-6xl mx-auto">
				<h1 className=" text-5xl md:text-9xl font-bold my-10 md:my-20 text-center md:text-left">
					Contact
				</h1>
			</div>
			<div className="relative z-10 rounded-md shadow-md p-4 md:p-10 lg:p-20 max-w-6xl mx-auto mb-20 -mt-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="text-center md:text-left">
						<h2 className="text-gray-800 dark:text-gray-200 font-semibold text-2xl">
							Get in touch, let&apos;s talk.
						</h2>
						<p className="font-light text-base text-gray-800 dark:text-gray-200 mt-2">
							Fill in your contact details and I will get back to you as soon as
							possible!
						</p>
						<a
							href={`mailto:${constants.email}`}
							className="icons-container inline-flex flex-col my-20"
						>
							<div className="flex flex-row items-center space-x-6 rounded-md border hover:border hover:border-blue-500 p-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-envelope-fill h-4 w-4 text-blue-500"
									viewBox="0 0 16 16"
								>
									<path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
								</svg>
								<p className="text-gray-800 dark:text-gray-200 font-light text-md">
									{constants.email}
								</p>
							</div>
						</a>
						<div className="social-icons flex flex-row justify-center md:justify-start space-x-8">
							<GithubIcon size="lg" />
							<LinkedinIcon size="lg" />
						</div>
					</div>
					<form
						onSubmit={handleSubmit}
						className="form rounded-lg flex flex-col"
					>
						<SuccessCard message={success} />
						<ErrorCard message={error} />
						<label
							htmlFor="name"
							className="text-sm text-gray-800 dark:text-gray-200 mx-4"
						>
							Your Name
						</label>
						<input
							type="text"
							className="font-light rounded-md border focus:outline-none py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-blue-500"
							name="name"
							value={form.name}
							onChange={handleChange}
						/>

						<label
							htmlFor="email"
							className="text-sm text-gray-800 dark:text-gray-200 mx-4 mt-4"
						>
							Email
						</label>
						<input
							type="email"
							className="font-light rounded-md border focus:outline-none py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-blue-500"
							name="email"
							value={form.email}
							onChange={handleChange}
						/>

						<label
							htmlFor="message"
							className="text-sm text-gray-800 dark:text-gray-200 mx-4 mt-4"
						>
							Message
						</label>
						<textarea
							rows={4}
							className="font-light rounded-md border focus:outline-none py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-blue-500"
							name="message"
							value={form.message}
							onChange={handleChange}
						/>
						<button
							type="submit"
							disabled={isLoading}
							className="bg-blue-500 disabled:bg-blue-500/50 rounded-md w-3/4 md:w-1/2 mx-4 mt-8 p-2 text-gray-50 text-md font-bold"
						>
							Send Message
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
