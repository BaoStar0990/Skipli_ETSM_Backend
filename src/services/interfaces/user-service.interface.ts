import TaskDto from '~/dtos/task.dto'
import UserCreateDto from '~/dtos/user-create.dto'
import UsernameLoginDto from '~/dtos/username-login.dto'

export default interface IUserService {
  createEmployee(body: UserCreateDto): Promise<string>
  getEmployees(page: number, size: number): Promise<UserCreateDto[]>
  getEmployeeById(id: string): Promise<UserCreateDto>
  updateEmployeeById(id: string, dto: UserCreateDto): Promise<void>
  deleteEmployeeById(id: string): Promise<void>
  confirmAccount(id: string, body: UsernameLoginDto): Promise<void>
}
