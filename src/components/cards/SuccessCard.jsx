const SuccessCard = ({ message }) => {
	return (
		<>
			{message && (
				<div className="p-10 m-5 bg-green-300/25 border-2 border-green-500 rounded-lg">
					<h1 className="font-semibold text-xl text-green-500">{message}</h1>
				</div>
			)}
		</>
	);
};

export default SuccessCard;
