/** @param {Response} response */
const parseResponse = async (response) => {
	const text = await response.text();

	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
};

/**
 * @template {boolean} T
 * @param {string} url
 * @param {RequestInit} [init]
 * @param {T} [raw]
 * @returns {Promise<T extends true ? Response : any>}
 */
export const request = async (url, init, raw) => {
	const response = await fetch(url, init);
	return raw ? response : await parseResponse(response);
};

/**
 * @template {boolean} T
 * @param {string} url
 * @param {T} [raw]
 */
export const get = (url, raw) => {
	return request(
		url,
		{
			credentials: "include",
		},
		raw
	);
};

/**
 * @template {boolean} T
 * @param {string} url
 * @param {object} body
 * @param {T} [raw]
 */
export const post = (url, body, raw) => {
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

/**
 * @param {string} url
 * @param {Record<string, string | Blob | FileList>} data
 */
export const upload = (url, data) => {
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
