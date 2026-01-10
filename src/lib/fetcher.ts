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

export default async function fetcher<ResponseDataType>(
  url: string | URL | Request,
  options: RequestInit = {},
): Promise<ResponseDataType> {
  const response = await fetch(url, options);

  const isJson = response.headers.get("Content-Type")?.includes("application/json");

  let data;
  if (isJson) data = await response.json();
  else data = await response.text();

  if (!response.ok) throw new HttpError(response.status, response.statusText, isJson ? data?.message : data);

  return data as ResponseDataType;
}
