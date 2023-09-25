"use client";

import fetcher from "@/lib/fetcher";
import { useCallback, useState } from "react";

type FetcherState<T> = {
	initial: boolean;
	loading: boolean;
	error?: Error;
	data?: T;
};

export default function useFetcher<T>(
	url: string,
	rethrowError: boolean = false
) {
	const [fetcherState, setFetcherState] = useState<FetcherState<T>>({
		initial: true,
		loading: false,
	});

	const updateFetcherState = <T>(key: string, value: T) => {
		setFetcherState((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const sendRequest = useCallback(
		async (options: RequestInit = {}, abortSignal?: AbortSignal) => {
			try {
				updateFetcherState("sendRequestOnUpdate", false);

				if (!url) {
					updateFetcherState("initial", false);
					updateFetcherState("loading", false);
					return;
				}

				updateFetcherState("loading", true);

				const data = await fetcher<T>(url, {
					...options,
					signal: abortSignal,
				});

				updateFetcherState("error", undefined);
				updateFetcherState("data", data);
			} catch (error: any) {
				updateFetcherState("error", error);
				if (rethrowError) throw error;
			} finally {
				updateFetcherState("initial", false);
				updateFetcherState("loading", false);
			}
		},
		[url, rethrowError]
	);

	return {
		...fetcherState,
		sendRequest,
	};
}
