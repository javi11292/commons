"use client";

import { action, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import Transition from "commons/components/transition";
import { classNames } from "commons/utils";

type Message = { text: string; type?: "info" | "error" };

const DELAY = 3000;
const messages = observable<Message>([]);

const removeMessage = action(() => {
  messages.shift();
});

export const addMessage = action((message: Message) => {
  messages.push(message);
});

const Snackbar = () => {
  const [message] = messages;
  const [show, setShow] = useState(false);

  const handleTransitionEnd = (
    { propertyName }: React.TransitionEvent<HTMLDivElement>,
    transition: boolean
  ) => {
    if (propertyName !== "opacity") {
      return;
    }

    if (transition) {
      setTimeout(() => {
        setShow(false);
      }, DELAY);
    } else {
      removeMessage();
    }
  };

  useEffect(() => {
    setShow(!!message);
  }, [message]);

  return (
    <Transition
      show={show}
      className={classNames(
        "fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-full rounded p-3 opacity-0",
        message?.type === "error" ? "bg-red-700" : "bg-lime-500 text-black"
      )}
      transitionClassName="[&]:-translate-y-10 [&]:opacity-100"
      onTransitionEnd={handleTransitionEnd}
    >
      {message?.text}
    </Transition>
  );
};

export default observer(Snackbar);
