const ErrorCard = ({ message }) => {
	return (
		<>
			{message && (
				<div className="flex flex-row">
					<div className="p-5 my-5 bg-red-300/25 border-2 border-red-500 rounded-lg">
						<p className="font-semibold text-xl text-red-500">{message}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default ErrorCard;
