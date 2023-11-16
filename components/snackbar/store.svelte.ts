import { createState } from "$lib/commons/utils/state.svelte";

export enum types {
	ERROR,
	MESSAGE,
}

type Message = {
	text: string;
	type: types;
};

export const messages = createState<Message[]>([]);

export const addError = (text: string) =>
	text && (messages.value = [...messages.value, { text, type: types.ERROR }]);
