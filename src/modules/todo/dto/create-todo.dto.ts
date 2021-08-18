import { ApiProperty } from '@nestjs/swagger'

export default class CreateTodoDto {
  @ApiProperty()
  readonly text: string
}
