type RequestResponse<R, T> = Promise<T extends true ? Response : R>;

export type Request = <R, T extends boolean = false>(
	url: string,
	init?: RequestInit,
	originalResponse?: T,
) => RequestResponse<R, T>;

export type Get = <R, T extends boolean = false>(
	url: string,
	originalResponse?: T,
) => RequestResponse<R, T>;

export type Post = <R, T extends boolean = false>(
	url: string,
	body: object,
	originalResponse?: T,
) => RequestResponse<R, T>;

export type Upload = <R>(
	url: string,
	data: Record<string, string | Blob | FileList>,
) => RequestResponse<R, false>;
