type NavOverlayButtonProps = {
	navOverlayOpen: boolean;
	toggleNavOverlay: () => void;
};

const NavOverlayButton = ({
	navOverlayOpen,
	toggleNavOverlay,
}: NavOverlayButtonProps) => {
	return (
		<button
			className="md:hidden absolute top-0 right-0 z-30 w-10 h-10 m-1 rounded-lg bg-white dark:bg-transparent focus:outline-none"
			onClick={toggleNavOverlay}
		>
			<div className="absolute w-5">
				<span
					className={`absolute h-0.5 w-5 bg-gray-800 dark:bg-gray-200 transform transition duration-300 ease-in-out ${
						navOverlayOpen ? "rotate-45 delay-200" : "-translate-y-1.5"
					}`}
				/>
				<span
					className={`absolute h-0.5 w-5 bg-gray-800 dark:bg-gray-200 transform transition-all duration-200 ease-in-out ${
						navOverlayOpen ? "w-0 opacity-50" : "delay-200 opacity-100"
					}`}
				/>
				<span
					className={`absolute h-0.5 w-5 bg-gray-800 dark:bg-gray-200 transform transition duration-300 ease-in-out ${
						navOverlayOpen ? "-rotate-45 delay-200" : "translate-y-1.5"
					}`}
				/>
			</div>
		</button>
	);
};

export default NavOverlayButton;
