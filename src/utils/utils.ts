export class HttpError extends Error {
  status: number
  data: object

  constructor(msg: string, status: number, data: object = {}) {
    super(msg)
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpError.prototype)
    this.status = status
    this.data = data
  }
}
