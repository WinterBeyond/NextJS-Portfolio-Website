const ExperienceCard = ({
	position,
	company,
	companyLink,
	timespan,
	description,
}) => {
	return (
		<div className="relative experience-card border p-4 rounded-md shadow-xl z-10 mx-4">
			<h1 className="absolute -top-10 md:-left-10 md:-top-10 text-4xl text-gray-300 font-bold dark:text-gray-600">
				{timespan}
			</h1>
			<h1 className="font-semibold text-xl">{position}</h1>
			<a
				href={companyLink}
				target="_blank"
				rel="noopener noreferrer"
				className="text-gray-500"
			>
				{company}
			</a>
			<p className="text-gray-600 dark:text-gray-400 my-2">{description}</p>
		</div>
	);
};

export default ExperienceCard;
