const ErrorCard = ({ message }) => {
	return (
		<div className="p-10">
			<h1 className="font-semibold text-xl text-red-500">{message}</h1>
		</div>
	);
};

export default ErrorCard;
