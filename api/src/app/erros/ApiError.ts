class ApiError extends Error {
  private error: string
  private status: number

  public constructor (error: string, message: string, status: number) {
    super(error)
    this.error = error
    this.message = message
    this.status = status
  }

  public toJSON () {
    return {
      error: this.error,
      message: this.message,
      status: this.status
    }
  }
}

export default ApiError
