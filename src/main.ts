import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(5000)
}

try {
  bootstrap()
} catch (err) {
  console.log(err)
}
