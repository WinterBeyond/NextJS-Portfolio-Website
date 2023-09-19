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
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";

type Paginated<T> = {
	entries: T[];
	total: number;
};

type Column<T> = {
	field?: string;
	label?: string;
	booleanLabel?: {
		true: ReactNode | string;
		false: ReactNode | string;
	};
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
};

function getParsedNumberOrDefault(
	str: string | null = "",
	defaultValue: number,
	minimumValue?: number
) {
	const parsedNumber = parseInt(str ?? "");
	return isNaN(parsedNumber)
		? defaultValue
		: minimumValue && parsedNumber < minimumValue
		? minimumValue
		: parsedNumber;
}

export default function DataTable<T>({
	id,
	title,
	url,
	columns,
	rows = [],
	useParamsId = true,
}: DataTableProps<T>) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const searchDebounceRef = useRef<NodeJS.Timeout>();
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

	const { initial, loading, data, error, sendRequest } = useFetcher<
		Paginated<T>
	>(
		url
			? `${url}?${new URLSearchParams({
					page: page.toString(),
					size: size.toString(),
					search,
			  })}`
			: ""
	);

	useEffect(() => {
		if (data) setStateRows(data);
	}, [data]);

	const getParsedFieldValue = (column: Column<T>, data: any) => {
		if (column.isDate) {
			if (data instanceof Date) data = data.toLocaleString();
			else data = new Date(data).toLocaleString();
		}

		if (column.booleanLabel && typeof data === "boolean") {
			if (data) {
				if (typeof column.booleanLabel.true === "string")
					data = (
						<span className="bg-green-500 text-white font-semibold px-2 py-0.5 rounded-xl text-xs">
							{column.booleanLabel.true}
						</span>
					);
				else data = column.booleanLabel.true;
			} else {
				if (typeof column.booleanLabel.false === "string")
					data = (
						<span className="bg-red-500 text-white font-semibold px-2 py-0.5 rounded-xl text-xs">
							{column.booleanLabel.false}
						</span>
					);
				else data = column.booleanLabel.false;
			}
		}

		return data;
	};

	const getNewSearchParams = useCallback(
		(key: string, value: string) => {
			const newSearchParams = new URLSearchParams(searchParams);
			if (!value && newSearchParams.has(key)) newSearchParams.delete(key);
			else newSearchParams.set(key, value);
			return newSearchParams;
		},
		[searchParams]
	);

	const handleSearch = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			clearTimeout(searchDebounceRef.current);
			searchDebounceRef.current = setTimeout(() => {
				router.replace(
					`?${getNewSearchParams(searchParamKey, e.target.value)}`,
					{
						scroll: false,
					}
				);
			}, 500);
		},
		[getNewSearchParams, router, searchParamKey]
	);

	const handlePage = (newPage: number) => {
		router.replace(`?${getNewSearchParams(pageParamKey, newPage.toString())}`, {
			scroll: false,
		});
	};

	const handleSize = (e: ChangeEvent<HTMLSelectElement>) => {
		router.replace(`?${getNewSearchParams(sizeParamKey, e.target.value)}`, {
			scroll: false,
		});
	};

	useEffect(() => {
		const abortController = new AbortController();
		sendRequest({}, abortController.signal);
		return () => {
			abortController.abort();
		};
	}, [sendRequest, page, size, search]);

	return (
		<>
			{initial ? (
				<>
					<div className="flex justify-center items-center">
						{loading && <Loading active={true} size="lg" />}
					</div>
				</>
			) : (
				<div
					id={`table-container-${id}`}
					className="flex flex-col w-full gap-4 bg-neutral-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-neutral-700 text-white rounded-lg p-4"
				>
					{title && (
						<h4 className="text-3xl font-semibold text-center md:text-left">
							{title}
						</h4>
					)}
					<div className="flex flex-col md:flex-row items-center gap-2">
						<button
							onClick={() => sendRequest()}
							disabled={loading}
							className="flex bg-neutral-800 disabled:bg-neutral-700 py-1 px-2 rounded-lg items-center gap-2"
							aria-label="Refresh server list"
						>
							<FontAwesomeIcon icon={faRefresh} spin={loading} />
							Refresh
						</button>
						<input
							placeholder="Search"
							className="bg-neutral-700 border-2 border-neutral-600 p-2 rounded-md text-gray-800 dark:text-gray-200"
							defaultValue={search}
							disabled={loading}
							onChange={handleSearch}
						/>
					</div>
					<table
						id={`table-${id}`}
						key={`table-${id}`}
						className="bg-neutral-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-lg"
						role="table"
						summary="Punishments issued on the server"
					>
						<thead key={`table-head-${id}`} role="rowgroup">
							{/* MOBILE ONLY */}
							{stateRows.entries.map((row, idx) => (
								<tr
									key={`table-${id}-head-row-${idx}`}
									role="row"
									className="flex flex-col justify-start border-neutral-700 border-t py-4 first:pt-0 [&:nth-last-child(2)]:pb-0 xl:hidden"
								>
									{columns.map((columnData, idx2) => {
										const data = row as any;
										return (
											<td
												key={`table-${id}-head-${idx2}-${
													columnData.field ?? columnData.label
												}`}
												className="flex gap-2 items-center py-1 px-4"
												role="cell"
											>
												{columnData.label && (
													<span className="font-semibold">
														{columnData.label}:
													</span>
												)}
												{columnData.renderCell?.(data) ??
													(columnData.field &&
														getParsedFieldValue(
															columnData,
															data[columnData.field]
														))}
											</td>
										);
									})}
								</tr>
							))}

							{/* DESKTOP ONLY */}
							<tr
								key={`table-${id}-head-row`}
								role="row"
								className="hidden xl:contents"
							>
								{columns.map((column) => (
									<th
										key={`table-${id}-head-${column.field ?? column.label}`}
										className="py-2 px-4"
										role="columnheader"
									>
										{column.label}
									</th>
								))}
							</tr>
						</thead>

						{/* DESKTOP ONLY */}
						<tbody
							key={`table-${id}-data`}
							role="rowgroup"
							className="hidden xl:contents"
						>
							{stateRows.entries.map((row, idx) => (
								<tr key={`table-${id}-data-row-${idx}`} role="row">
									{columns.map((columnData, idx2) => {
										const data = row as any;
										return (
											<td
												key={`table-${id}-data-${idx2}`}
												className="text-center py-2 px-4 border-neutral-700 border-t"
												role="cell"
											>
												{columnData.renderCell?.(data) ??
													(columnData.field &&
														getParsedFieldValue(
															columnData,
															data[columnData.field]
														))}
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
					<div className="flex flex-col lg:flex-row gap-2 justify-center items-center">
						<select
							defaultValue={size}
							onChange={handleSize}
							className="font-body bg-neutral-800 border-2 border-neutral-800 p-2 rounded-md text-gray-800 dark:text-gray-200"
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
									onPageChange={(newPage) => handlePage(newPage)}
									disabled={loading}
								/>
							</div>
							{loading && <Loading active={true} size="lg" />}
							{error && <p className="text-red-500">{error.message}</p>}
						</div>
						<p>
							Displaying {(page - 1) * size + 1} to{" "}
							{(page - 1) * size + 1 + size - 1} of {stateRows.total} entries
						</p>
					</div>
				</div>
			)}
		</>
	);
}
