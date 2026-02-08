import { Request, Response } from 'express'
import { ApiResponse } from '~/dtos/api-response.dto'
import UserCreateDto from '~/dtos/user-create.dto'
import UsernameLoginDto from '~/dtos/username-login.dto'
import WorkScheduleDto from '~/dtos/work-schedule.dto'
import userServiceImpl from '~/services/impls/user-service.impl'
import workScheduleService from '~/services/impls/work-schedule-service.impl'

class UserController {
  async getWorkSchedules(req: Request, res: Response) {
    const schedules = await workScheduleService.getWorkSchedules()
    res
      .status(200)
      .json(
        ApiResponse.builder().setCode(200).setMessage('Work schedules fetched successfully').setData(schedules).build()
      )
  }
  async confirmAccount(req: Request, res: Response) {
    const { id } = req.params
    const body: UsernameLoginDto = req.body
    await userServiceImpl.confirmAccount(id as string, body)
    res.status(200).json(ApiResponse.builder().setCode(200).setMessage('Account confirmed successfully').build())
  }
  async createWorkSchedule(req: Request, res: Response) {
    const body: WorkScheduleDto = req.body
    const { id } = req.params
    await workScheduleService.createWorkSchedule(id as string, body)
    res.status(201).json(ApiResponse.builder().setCode(201).setMessage('Work schedule created successfully').build())
  }
  async deleteEmployeeById(req: Request, res: Response) {
    const { id } = req.params
    await userServiceImpl.deleteEmployeeById(id as string)
    res.status(200).json(ApiResponse.builder().setCode(200).setMessage('Employee deleted successfully').build())
  }
  async updateEmployeeById(req: Request, res: Response) {
    const { id } = req.params
    const dto: UserCreateDto = req.body
    await userServiceImpl.updateEmployeeById(id as string, dto)
    res.status(201).json(ApiResponse.builder().setCode(201).setMessage('Employee updated successfully').build())
  }
  async getEmployeeById(req: Request, res: Response) {
    const { id } = req.params
    const result = await userServiceImpl.getEmployeeById(id as string)
    res
      .status(200)
      .json(ApiResponse.builder().setCode(200).setMessage('Employee fetched successfully').setData(result).build())
  }
  async getEmployees(req: Request, res: Response) {
    const { page, size } = req.query
    const pageNumber = Number(page)
    const sizeNumber = Number(size)
    const safePage = Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1
    const safeSize = Number.isFinite(sizeNumber) && sizeNumber > 0 ? sizeNumber : 10
    const employees = await userServiceImpl.getEmployees(safePage, safeSize)
    res
      .status(200)
      .json(ApiResponse.builder().setCode(200).setMessage('Employees fetched successfully').setData(employees).build())
  }
  async createEmployee(req: Request, res: Response) {
    const dto: UserCreateDto = req.body
    const result = await userServiceImpl.createEmployee(dto)
    res
      .status(201)
      .json(ApiResponse.builder().setCode(201).setMessage('Employee created successfully').setData(result).build())
  }
}

export default new UserController()
