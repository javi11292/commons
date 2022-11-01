import { observable } from "mobx";
import { observer } from "mobx-react-lite";

type Message = { value: string };

const messages = observable<Message>([]);

export function addNotification(message: Message) {
  messages.push(message);
}

function Snackbar() {
  const [message] = messages;

  if (!message) return null;

  return <div>{message.value}</div>;
}

export default observer(Snackbar);
