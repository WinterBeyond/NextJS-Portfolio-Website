import Link from "next/link";

const ArrowUpIcon = ({ children, href }) => {
	return (
		<Link href={href}>
			<a className="flex flex-row mb-10 px-8 py-4 rounded-md bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 hover:dark:bg-gray-800 shadow-lg text-xl space-x-2 items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="h-5 w-5"
					stroke="4"
					strokeWidth="4"
					viewBox="0 0 16 16"
				>
					<path
						fillRule="evenodd"
						d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
					/>
				</svg>
				{children}
			</a>
		</Link>
	);
};

export default ArrowUpIcon;
