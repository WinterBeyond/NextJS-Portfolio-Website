"use client";

import {
	ReactNode,
	ChangeEvent,
	useEffect,
	useState,
	useCallback,
	useRef,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useFetcher from "@/hooks/useFetcher";
import Loading from "../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Pagination";
import getParsedNumberOrDefault from "@/lib/getParsedNumberOrDefault";
import DesktopDataTable from "./DesktopDataTable";
import MobileDataTable from "./MobileDataTable";

type Paginated<T> = {
	entries: T[];
	total: number;
};

export type Column<T> = {
	field?: string;
	label?: string;
	booleanLabel?: {
		true: ReactNode | string;
		false: ReactNode | string;
	};
	minWidth?: string | number;
	maxWidth?: string | number;
	isDate?: boolean;
	renderCell?: (data: T) => ReactNode;
};

type DataTableProps<T> = {
	id: string;
	title?: string;
	url?: string;
	columns: Column<T>[];
	rows?: T[];
	useParamsId?: boolean;
	summary?: string;
};

type ParamUpdateKey = "page" | "size" | "search";

export type IDataTable<T> = {
	id: string;
	summary: string;
	columns: Column<T>[];
	entries: T[];
};

export default function DataTable<T>({
	id,
	title,
	url,
	columns,
	rows = [],
	useParamsId = true,
	summary = "",
}: DataTableProps<T>) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const searchDebounceRef = useRef<NodeJS.Timeout>();
	const [display, setDisplay] = useState(false);
	const [stateRows, setStateRows] = useState<Paginated<T>>({
		entries: rows,
		total: rows.length,
	});

	const paramKeyPrefix = useParamsId ? `${id}-` : "";
	const pageParamKey = `${paramKeyPrefix}page`;
	const sizeParamKey = `${paramKeyPrefix}size`;
	const searchParamKey = `${paramKeyPrefix}search`;

	const page = getParsedNumberOrDefault(searchParams.get(pageParamKey), 1, 1);
	const size = getParsedNumberOrDefault(searchParams.get(sizeParamKey), 1, 1);
	const search = searchParams.get(searchParamKey) || "";

	const apiSearchParams = new URLSearchParams({
		page: page.toString(),
		size: size.toString(),
		search,
	});

	const apiUrl = url ? `${url}?${apiSearchParams}` : "";

	const { initial, loading, data, error, sendRequest } =
		useFetcher<Paginated<T>>(apiUrl);

	useEffect(() => setDisplay(true), []);

	useEffect(() => {
		if (data) setStateRows(data);
	}, [data]);

	const getNewSearchParams = useCallback(
		(key: string, value: string) => {
			const newSearchParams = new URLSearchParams(searchParams);
			if (!value && newSearchParams.has(key)) newSearchParams.delete(key);
			else {
				// If key is not page param & new search params has page param, then delete it as search/size update resets page to 1
				if (key !== pageParamKey && newSearchParams.has(pageParamKey))
					newSearchParams.delete(pageParamKey);
				newSearchParams.set(key, value);
			}
			return newSearchParams;
		},
		[searchParams, pageParamKey]
	);

	const handleParamUpdate = useCallback(
		(key: ParamUpdateKey, value: string) => {
			const paramKey =
				key === "page"
					? pageParamKey
					: key === "size"
					  ? sizeParamKey
					  : searchParamKey;

			router.replace(`?${getNewSearchParams(paramKey, value)}`, {
				scroll: false,
			});
		},
		[router, getNewSearchParams, pageParamKey, sizeParamKey, searchParamKey]
	);

	const handleSearch = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			clearTimeout(searchDebounceRef.current);
			searchDebounceRef.current = setTimeout(
				() => handleParamUpdate("search", e.target.value),
				500
			);
		},
		[handleParamUpdate]
	);

	const handlePage = (newPage: number) =>
		handleParamUpdate("page", newPage.toString());

	const handleSize = (newSize: string) => handleParamUpdate("size", newSize);

	useEffect(() => {
		const abortController = new AbortController();
		sendRequest({}, abortController.signal);
		return () => {
			abortController.abort();
		};
	}, [sendRequest, page, size, search]);

	if (!display) return null;

	return (
		<>
			{initial ? (
				<>
					<div className="flex items-center justify-center">
						{loading && <Loading active={true} size="lg" />}
					</div>
				</>
			) : (
				<div
					id={`table-container-${id}`}
					className="flex w-full flex-col gap-4 rounded-lg border border-neutral-700 bg-neutral-900 bg-opacity-30 bg-clip-padding p-4 text-white backdrop-blur-lg backdrop-filter"
				>
					{title && (
						<h4 className="text-center text-3xl font-semibold md:text-left">
							{title}
						</h4>
					)}
					<div className="flex flex-col items-center gap-2 md:flex-row">
						<button
							onClick={() => sendRequest()}
							disabled={loading}
							className="flex items-center gap-2 rounded-lg bg-neutral-800 px-2 py-1 disabled:bg-neutral-700"
							aria-label="Refresh server list"
						>
							<FontAwesomeIcon icon={faRefresh} spin={loading} />
							Refresh
						</button>
						<input
							placeholder="Search"
							className="rounded-lg border-2 border-neutral-800 bg-neutral-700 bg-opacity-30 bg-clip-padding p-2 text-gray-800 outline-none backdrop-blur-lg backdrop-filter focus:border-indigo-500 dark:text-gray-200"
							defaultValue={search}
							disabled={loading}
							onChange={handleSearch}
						/>
					</div>
					<DesktopDataTable<T>
						id={id}
						columns={columns}
						entries={stateRows.entries}
						summary={summary}
					/>
					<MobileDataTable<T>
						id={id}
						columns={columns}
						entries={stateRows.entries}
						summary={summary}
					/>
					<div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
						<select
							defaultValue={size}
							onChange={(e) => handleSize(e.target.value)}
							disabled={loading}
							className="rounded-md border-2 border-neutral-800 bg-neutral-800 p-2 font-body text-gray-800 dark:text-gray-200"
							aria-label="Page size"
						>
							<option value={1}>1</option>
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={25}>25</option>
							<option value={50}>50</option>
							<option value={100}>100</option>
						</select>
						<div
							className="flex flex-col gap-2"
							style={{ margin: "0 auto", textAlign: "center" }}
						>
							<div id={`table-${id}-pagination`}>
								<Pagination
									id={id}
									currentPage={page}
									totalCount={stateRows.total}
									pageSize={size}
									onPageChange={(newPage) =>
										handlePage(newPage)
									}
									disabled={loading}
								/>
							</div>
							{loading && <Loading active={true} size="lg" />}
							{error && (
								<p className="text-red-500">{error.message}</p>
							)}
						</div>
						<p>
							Displaying {(page - 1) * size + 1} to{" "}
							{(page - 1) * size + 1 + size - 1} of{" "}
							{stateRows.total} entries
						</p>
					</div>
				</div>
			)}
		</>
	);
}
