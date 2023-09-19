import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LoadingSize = "lg" | "md" | "sm";

type LoadingProps = {
	active: boolean;
	size?: LoadingSize;
};

export default function Loading({ active, size = "sm" }: LoadingProps) {
	const getFontSize = () => {
		let fontSize = "0.4em";
		switch (size) {
			case "lg":
				fontSize = "1.5em";
			case "md":
				fontSize = "0.75em";
		}
		return fontSize;
	};

	return (
		<div className="flex gap-2 justify-center items-center">
			<FontAwesomeIcon
				icon={faCircle}
				fade={active}
				bounce={active}
				style={{
					fontSize: getFontSize(),
				}}
			/>
			<FontAwesomeIcon
				icon={faCircle}
				fade={active}
				bounce={active}
				style={{
					animationDelay: "50ms",
					fontSize: getFontSize(),
				}}
			/>
			<FontAwesomeIcon
				icon={faCircle}
				fade={active}
				bounce={active}
				style={{
					animationDelay: "100ms",
					fontSize: getFontSize(),
				}}
			/>
		</div>
	);
}
