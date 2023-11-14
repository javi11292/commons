import type { Get, Post, Request, Upload } from "./fetch.types";

const parseResponse = async (response: Response) => {
	const text = await response.text();

	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
};

export class NetworkError<T extends { message: string }> extends Error {
	error: T;

	constructor(error: T) {
		super(error.message);
		this.name = "NetworkError";
		this.error = error;
	}
}

export const request: Request = async (url, init = {}, raw) => {
	if (typeof window !== "undefined") {
		init.credentials = "include";
	}

	const response = await fetch(url, init);

	const data = raw ? response : await parseResponse(response);

	if (!response.ok) {
		throw new NetworkError(data);
	}

	return data;
};

export const get: Get = (url, raw) => {
	return request(url, undefined, raw);
};

export const post: Post = (url, body, raw) => {
	return request(
		url,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		},
		raw,
	);
};

export const upload: Upload = (url, data) => {
	const formData = new FormData();

	Object.entries(data).forEach(([key, value]) => {
		if (value instanceof FileList) {
			for (let i = 0; i < value.length; i += 1) {
				formData.append(key, value[i]);
			}

			return;
		}
		formData.append(key, value);
	});

	return request(url, {
		method: "POST",
		body: formData,
	});
};
