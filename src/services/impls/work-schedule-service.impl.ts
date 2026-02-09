import WorkSchedule from '~/entities/work-schedule.entity'
import IWorkScheduleService from '../interfaces/work-schedule-service.interface'
import UuidGenerator from '~/utils/uuid-generator.util'
import { plainToInstance } from 'class-transformer'
import workScheduleRepositoryImpl from '~/repositories/impls/work-schedule.repository.impl'
import WorkScheduleDto from '~/dtos/work-schedule.dto'
import WorkDay from '~/entities/work-day.entity'
import workDayRepositoryImpl from '~/repositories/impls/work-day.repository.impl'
import WorkHour from '~/entities/work-hour.entity'
import workHourRepositoryImpl from '~/repositories/impls/work-hour.repository.impl'
import WorkDayDto from '~/dtos/work-day.dto'
import WorkHourDto from '~/dtos/work-hour.dto'
import UserCreateDto from '~/dtos/user-create.dto'
import userRepositoryImpl from '~/repositories/impls/user.repository.impl'

class WorkScheduleService implements IWorkScheduleService {
  async deleteWorkSchedule(scheduleId: string): Promise<void> {
    const schedules = await workScheduleRepositoryImpl.findById(scheduleId)
    if (!schedules) {
      throw new Error('Work schedule not found')
    }
    const workDays = await workDayRepositoryImpl.findByWorkScheduleId(scheduleId)
    workDays.forEach(async (day) => {
      const workHours = await workHourRepositoryImpl.findByWorkDayId(day.getId())
      workHours.forEach(async (hour) => {
        await workHourRepositoryImpl.delete(hour.getId())
      })
      await workDayRepositoryImpl.delete(day.getId())
    })
    await workScheduleRepositoryImpl.delete(scheduleId)
  }
  async getWorkSchedules(): Promise<WorkScheduleDto[]> {
    const schedules = await workScheduleRepositoryImpl.findAll({ page: 1, size: 20 })
    const result = await Promise.all(
      schedules.map(async (schedule) => {
        const scheduleDto = plainToInstance(WorkScheduleDto, schedule, { excludeExtraneousValues: true })
        const workDays = await workDayRepositoryImpl.findByWorkScheduleId(schedule.getId())
        scheduleDto.workDays = await Promise.all(
          workDays.map(async (day) => {
            const dayDto = plainToInstance(WorkDayDto, day, { excludeExtraneousValues: true })
            const workHours = await workHourRepositoryImpl.findByWorkDayId(day.getId())
            dayDto.workHours = workHours.map((hour) =>
              plainToInstance(WorkHourDto, hour, { excludeExtraneousValues: true })
            )
            return dayDto
          })
        )
        scheduleDto.employee = plainToInstance(UserCreateDto, await userRepositoryImpl.findById(schedule.employeeId), {
          excludeExtraneousValues: true
        })
        return scheduleDto
      })
    )
    return result
  }
  async createWorkSchedule(userId: string, body: WorkScheduleDto): Promise<void> {
    const workSchedule = plainToInstance(WorkSchedule, body, { excludeExtraneousValues: true })
    const workScheduleId = UuidGenerator.generate()
    workSchedule.setId(workScheduleId)
    workSchedule.employeeId = userId
    workSchedule.setCreatedAt(Date.now())
    workSchedule.setUpdatedAt(Date.now())

    await workScheduleRepositoryImpl.create(workSchedule)

    body.workDays.forEach(async (day) => {
      const workDay = plainToInstance(WorkDay, day, { excludeExtraneousValues: true })
      const workDayId = UuidGenerator.generate()
      workDay.setId(workDayId)
      workDay.workScheduleId = workScheduleId
      workDay.setCreatedAt(Date.now())
      workDay.setUpdatedAt(Date.now())
      await workDayRepositoryImpl.create(workDay)

      day.workHours.forEach(async (hour) => {
        const workHour = plainToInstance(WorkHour, hour, { excludeExtraneousValues: true })
        const workHourId = UuidGenerator.generate()
        workHour.setId(workHourId)
        workHour.workDayId = workDayId
        workHour.setCreatedAt(Date.now())
        workHour.setUpdatedAt(Date.now())
        await workHourRepositoryImpl.create(workHour)
      })
    })
  }
}

export default new WorkScheduleService()
