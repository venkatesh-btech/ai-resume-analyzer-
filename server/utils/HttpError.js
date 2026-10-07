export default class HttpError extends Error {
  constructor(statusCode, message, expose = statusCode < 500) {
    super(message);
    this.statusCode = statusCode;
    this.expose = expose;
  }
}
