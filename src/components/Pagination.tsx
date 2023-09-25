import { usePagination, DOTS } from "@/hooks/usePagination";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PaginationProps = {
	onPageChange: (newPage: number) => void;
	id: string;
	totalCount: number;
	pageSize: number;
	siblingCount?: number;
	currentPage: number;
	disabled?: boolean;
	center?: boolean;
};

export function Pagination({
	onPageChange,
	id,
	totalCount,
	pageSize,
	siblingCount = 1,
	currentPage,
	disabled,
	center,
}: PaginationProps) {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || (paginationRange?.length ?? 0) < 2) return null;

	const navigateNextPage = () => {
		onPageChange(currentPage + 1);
	};

	const navigatePreviousPage = () => {
		onPageChange(currentPage - 1);
	};

	const lastPage = paginationRange?.[paginationRange.length - 1];
	return (
		<ul className={`flex ${center ? "justify-center" : ""} gap-2`}>
			<li>
				<button
					className={`rounded-full bg-neutral-700 px-3 py-1 text-gray-200 hover:bg-neutral-800 ${
						currentPage === 1 ? "opacity-50" : ""
					}`}
					onClick={navigatePreviousPage}
					disabled={currentPage === 1 || disabled}
					aria-label="Navigate previous page"
				>
					<FontAwesomeIcon icon={faChevronLeft} />
				</button>
			</li>
			{paginationRange?.map((pageNumber, idx) => {
				if (pageNumber === DOTS)
					return (
						<li
							key={`pagination-${id}-${pageNumber}-${idx}`}
							className="cursor-default rounded-full bg-neutral-700 px-3 py-1 text-gray-200 hover:bg-neutral-800"
						>
							&#8230;
						</li>
					);

				return (
					<li key={`pagination-${id}-${pageNumber}-${idx}`}>
						<button
							className={`rounded-full px-3 py-1 text-gray-200 ${
								pageNumber === currentPage
									? "bg-indigo-500 hover:bg-indigo-600"
									: "bg-neutral-700 hover:bg-neutral-800"
							}`}
							onClick={() => onPageChange(pageNumber as number)}
							disabled={pageNumber === currentPage || disabled}
							aria-label={`Navigate page ${pageNumber}`}
						>
							{pageNumber}
						</button>
					</li>
				);
			})}
			<li>
				<button
					className={`rounded-full bg-neutral-700 px-3 py-1 text-gray-200 hover:bg-neutral-800 ${
						currentPage === lastPage ? "opacity-50" : ""
					}`}
					onClick={navigateNextPage}
					disabled={currentPage === lastPage || disabled}
					aria-label="Navigate next page"
				>
					<FontAwesomeIcon icon={faChevronRight} />
				</button>
			</li>
		</ul>
	);
}

export default Pagination;
