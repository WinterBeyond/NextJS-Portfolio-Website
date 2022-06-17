const ErrorCard = ({ message }) => {
	return (
		<>
			{message && (
				<div className="flex flex-row">
					<div className="p-5 my-5 bg-red-300/25 border-2 border-red-500 rounded-lg">
						<h1 className="font-semibold text-xl text-red-500">{message}</h1>
					</div>
				</div>
			)}
		</>
	);
};

export default ErrorCard;
