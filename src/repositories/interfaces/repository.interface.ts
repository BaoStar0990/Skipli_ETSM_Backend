export default interface IRepository<T> {
  create(entity: T): Promise<void | T>
  findById(id: string): Promise<T | null>
  update(id: string, entity: T): Promise<void>
  delete(id: string): Promise<void>
  findAll(options: { page: number; size: number }): Promise<T[]>
}
