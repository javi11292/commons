import { DetailError } from "./error";

async function parseResponse(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
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

export function upload(
  url: string,
  data: Record<string, string | Blob | FileList>
) {
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

  return send(url, {
    credentials: "include",
    method: "POST",
    body: formData,
  });
}
