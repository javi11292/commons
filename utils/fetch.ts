import { DetailError } from "./error";

const parseResponse = async (response: Response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const send = async (url: string, init?: RequestInit) => {
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
};

export const get = (url: string) => {
  return send(url);
};

export const post = (
  url: string,
  { arg }: { arg?: Record<string, unknown> } = {}
) => {
  return send(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: arg && JSON.stringify(arg),
  });
};

export const upload = (
  url: string,
  { arg }: { arg?: Record<string, string | Blob | FileList> } = {}
) => {
  const formData = arg && new FormData();

  formData &&
    Object.entries(arg).forEach(([key, value]) => {
      if (value instanceof FileList) {
        for (let i = 0; i < value.length; i += 1) {
          formData.append(key, value[i]);
        }

        return;
      }
      formData.append(key, value);
    });

  return send(url, {
    method: "POST",
    body: formData,
  });
};
