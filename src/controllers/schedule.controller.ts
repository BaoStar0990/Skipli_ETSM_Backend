import { Request, Response } from 'express'
import { ApiResponse } from '~/dtos/api-response.dto'
import workScheduleService from '~/services/impls/work-schedule-service.impl'

class WorkScheduleController {
  async deleteWorkSchedule(req: Request, res: Response) {
    const { scheduleId } = req.params
    await workScheduleService.deleteWorkSchedule(scheduleId as string)
    res.status(200).json(ApiResponse.builder().setCode(200).setMessage('Work schedule deleted successfully').build())
  }
}
export default new WorkScheduleController()
