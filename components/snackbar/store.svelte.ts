export enum types {
	ERROR,
	MESSAGE,
}

type Message = {
	text: string;
	type: types;
};

class Messages {
	value = $state<Message[]>([]);
}

export const messages = new Messages();

export const addError = (text: string) =>
	text && (messages.value = [...messages.value, { text, type: types.ERROR }]);
