export class DetailError extends Error {
  data?: unknown;
  code?: number;

  constructor({
    error,
    data,
    code,
  }: {
    error?: string;
    code?: number;
    data?: unknown;
  }) {
    super(error);
    this.code = code;
    this.data = data;
  }
}
