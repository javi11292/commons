import { useListener } from "hooks/listener";

type Message = { text: string; type?: "info" | "error" };

const messages: Message[] = [];
const listeners = new Set<(value: unknown) => void>();

const notify = (value: unknown) =>
  listeners.forEach((listener) => listener(value));

export const removeMessage = () => {
  messages.shift();
  notify([...messages]);
};

export const addMessage = (message: Message) => {
  messages.push(message);
  notify([...messages]);
};

export const useMessages = () => {
  return useListener(listeners, messages);
};
