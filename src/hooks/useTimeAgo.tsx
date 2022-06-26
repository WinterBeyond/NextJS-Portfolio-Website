import { useEffect, useState } from "react";

type TimeAgoProps = {
	date: Date;
};

const useTimeAgo = ({ date }: TimeAgoProps) => {
	const [timeAgo, setTimeAgo] = useState<string>("");

	useEffect(() => {
		const getTimeAgo = (currentDate: Date) => {
			const millisecondDifference = Date.now() - currentDate.getTime();
			const secondDifference = Math.floor(millisecondDifference / 1000);
			const minutesDifference = Math.floor(secondDifference / 60);
			const hoursDifference = Math.floor(minutesDifference / 60);
			const daysDifference = Math.floor(hoursDifference / 24);
			const monthsDifference = Math.floor(daysDifference / 31);

			let text = "Never";

			if (secondDifference < 6) text = "A few moments ago";
			else if (secondDifference < 60)
				text = `${secondDifference} second${
					secondDifference > 1 ? "s" : ""
				} ago`;
			else if (minutesDifference < 60)
				text = `${minutesDifference} minute${
					minutesDifference > 1 ? "s" : ""
				} ago`;
			else if (hoursDifference < 24)
				text = `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
			else if (daysDifference < 31)
				text = `${daysDifference} day${daysDifference > 1 ? "s" : ""} ago`;
			else if (monthsDifference > 0)
				text = `${monthsDifference} month${
					monthsDifference > 1 ? "s" : ""
				} ago`;

			return text;
		};

		const timeInterval = setInterval(() => {
			setTimeAgo(getTimeAgo(new Date(date)));
		}, 1000);

		return () => {
			clearInterval(timeInterval);
		};
	}, [date]);

	return timeAgo ? timeAgo : <span className="line-through">----------</span>;
};

export default useTimeAgo;
