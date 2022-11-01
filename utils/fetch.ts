import { DetailError } from "./error";

const HOST = "/api";

async function parseResponse(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function send(path: string, init?: RequestInit) {
  try {
    const response = await fetch(path, init);
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

export function get(path: string) {
  return send(`${HOST}${path}`, {
    credentials: "include",
  });
}

export function post(path: string, body: Record<string, unknown>) {
  return send(`${HOST}${path}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function upload(path: string, data: Record<string, string | Blob>) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => formData.append(key, value));

  return send(`${HOST}${path}`, {
    credentials: "include",
    method: "POST",
    body: formData,
  });
}
