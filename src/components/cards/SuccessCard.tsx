type SuccessCardProps = {
	message: string;
};

const SuccessCard = ({ message }: SuccessCardProps) => {
	return (
		<>
			{message && (
				<div className="p-10 m-5 bg-green-300/25 border-2 border-green-500 rounded-lg">
					<p className="font-semibold text-xl text-green-500">{message}</p>
				</div>
			)}
		</>
	);
};

export default SuccessCard;
