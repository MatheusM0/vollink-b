import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // const server = app.getHttpServer();
  // const router = server._events.request._router;
  // console.log("Rotas registradas no servidor:");
  // console.log(router.stack.map((r) => r.route?.path).filter(Boolean));

  await app.listen(3000, '127.0.0.1');
  console.log(await app.getUrl());
}
bootstrap();
