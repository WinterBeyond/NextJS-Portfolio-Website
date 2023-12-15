type RequestOptions = {
	/** A BodyInit object or null to set request's body. */
	body?: BodyInit | null;
	/** A string indicating how the request will interact with the browser's cache to set request's cache. */
	cache?: RequestCache;
	/** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
	credentials?: RequestCredentials;
	/** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
	headers?: HeadersInit;
	/** A string to set request's method. */
	method?: string;
	/** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
	mode?: RequestMode;
	/** An AbortSignal to set request's signal. */
	signal?: AbortSignal | null;
} & RequestInit;

export default async function fetcher<T>(
	url: string,
	options: RequestOptions = {}
): Promise<T> {
	const response = await fetch(url, options);

	let data;
	if (response.headers.get("Content-Type")?.includes("application/json"))
		data = await response.json();
	else data = await response.text();

	if (!response.ok) throw new Error(data?.message ?? response.statusText);
	return data as T;
}
