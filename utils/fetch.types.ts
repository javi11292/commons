type RequestResponse<T> = Promise<T extends true ? Response : unknown>;

export type Request = <T extends boolean>(
	url: string,
	init?: RequestInit,
	raw?: T
) => RequestResponse<T>;

export type Get = <T extends boolean>(url: string, raw?: T) => RequestResponse<T>;

export type Post = <T extends boolean>(url: string, body: object, raw?: T) => RequestResponse<T>;

export type Upload = (
	url: string,
	data: Record<string, string | Blob | FileList>
) => RequestResponse<false>;
