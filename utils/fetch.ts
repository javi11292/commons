import { useState } from "react";

import { useEvent } from "commons/hooks";
import { DetailError } from "./error";

async function parseResponse(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export function useFetch(callback: (...args: unknown[]) => Promise<unknown>) {
  const [loading, setLoading] = useState(false);

  const trigger = useEvent(async (...args) => {
    setLoading(true);
    await callback(...args);
    setLoading(false);
  });

  return { loading, trigger };
}

export async function send(url: string, init?: RequestInit) {
  try {
    const response = await fetch(url, init);
    const result = await parseResponse(response);

    if (!response.ok) {
      throw new DetailError(
        typeof result === "object"
          ? result
          : { error: "Ha habido un error, inténtalo en otro momento" }
      );
    }

    return result;
  } catch (error) {
    if (error instanceof DetailError) throw error;
    throw new Error("Error de conexión");
  }
}

export function get(url: string) {
  return send(url, {
    credentials: "include",
  });
}

export function post(url: string, body: Record<string, unknown>) {
  return send(url, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function upload(url: string, data: Record<string, string | Blob>) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => formData.append(key, value));

  return send(url, {
    credentials: "include",
    method: "POST",
    body: formData,
  });
}
