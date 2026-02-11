export class ApiResponse {
  private success: boolean = true
  private code: number = 200
  private data: any = undefined
  private message: string = 'Request successfully'

  constructor() {}

  public setCode(code: number) {
    this.code = code
    return this
  }

  public setData(data: any) {
    this.data = data
    return this
  }

  public setMessage(message: string) {
    this.message = message
    return this
  }

  public build() {
    return {
      success: this.success,
      code: this.code,
      data: this.data,
      message: this.message
    }
  }

  public static builder(): ApiResponse {
    return new ApiResponse()
  }
}
