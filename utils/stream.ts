export const stream = async <T>(promise: Promise<T>, callback: (value: T) => unknown) => {
	return callback(await promise);
};
