import WorkScheduleDto from '~/dtos/work-schedule.dto'

export default interface IWorkScheduleService {
  createWorkSchedule(userId: string, workSchedule: WorkScheduleDto): Promise<void>
  getWorkSchedules(): Promise<WorkScheduleDto[]>
  deleteWorkSchedule(scheduleId: string): Promise<void>
}
