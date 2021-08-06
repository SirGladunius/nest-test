import { HttpStatus } from '@nestjs/common'

export interface LoginResp {
  // eslint-disable-next-line @typescript-eslint/ban-types
  date: {}
  status: HttpStatus
  errors?: []
}
