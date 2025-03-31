import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const server = app.getHttpServer();
  // const router = server._events.request._router;
  // console.log("Rotas registradas no servidor:");
  // console.log(router.stack.map((r) => r.route?.path).filter(Boolean));

  await app.listen(process.env.PORT ?? 3000);
  console.log(await app.getUrl());
}
bootstrap();
