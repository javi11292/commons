import type { Get, Post, Request, Upload } from "./fetch.types";

const parseResponse = async (response: Response) => {
	const text = await response.text();

	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
};

export const request: Request = async (url, init, raw) => {
	const response = await fetch(url, init);
	return raw ? response : await parseResponse(response);
};

export const get: Get = (url, raw) => {
	return request(
		url,
		{
			credentials: "include",
		},
		raw
	);
};

export const post: Post = (url, body, raw) => {
	return request(
		url,
		{
			credentials: "include",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		},
		raw
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
		credentials: "include",
		method: "POST",
		body: formData,
	});
};
