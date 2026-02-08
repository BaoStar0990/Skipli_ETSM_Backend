export default abstract class BaseEntity {
  protected id!: string
  protected createdAt!: number
  protected updatedAt!: number
  protected createdBy: number | null = null
  protected updatedBy: number | null = null

  setId(id: string): void {
    this.id = id
  }

  getId(): string {
    return this.id
  }

  setCreatedAt(unix: number): void {
    this.createdAt = unix
  }

  setUpdatedAt(unix: number): void {
    this.updatedAt = unix
  }

  constructor() {}
}
