type ErrorType = 'INTERNAL' | 'NOT_INTERNAL'
class ApiError extends Error {
  private error: string
  private type: ErrorType
  private status: number

  public constructor (error: string, type: ErrorType, message: string, status: number) {
    super(error)
    this.error = error
    this.type = type
    this.message = message
    this.status = status
  }

  public toJSON () {
    return {
      error: this.error,
      type: this.type,
      message: this.message,
      status: this.status
    }
  }
}

export default ApiError
