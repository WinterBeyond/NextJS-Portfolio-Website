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

export class HttpError extends Error {
  status: number;
  statusText: string;
  responseMessage?: string;

  constructor(status: number, statusText: string, responseMessage?: string) {
    super(statusText);
    this.status = status;
    this.statusText = statusText;
    this.responseMessage = responseMessage;
  }

  get formattedMessage(): string {
    return `HTTP ${this.status}: ${this.statusText}${this.responseMessage ? ` - ${this.responseMessage}` : ""}`;
  }
}

export default async function fetcher<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await fetch(url, options);

  const isJson = response.headers
    .get("Content-Type")
    ?.includes("application/json");

  let data;
  if (isJson) data = await response.json();
  else data = await response.text();

  if (!response.ok)
    throw new HttpError(
      response.status,
      response.statusText,
      isJson ? data?.message : data,
    );

  return data as T;
}
