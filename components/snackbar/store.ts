import { writable } from "svelte/store";

export enum types {
	ERROR,
	MESSAGE,
}

type Message = {
	text: string;
	type: types;
};

export const store = writable<Message[]>([]);

export const addError = (text: string) =>
	text &&
	store.update((value) => {
		value.push({ text, type: types.ERROR });
		return value;
	});
