import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();   // Enable CORS so the React app running on port 5173 localhost can make requests
  await app.listen(process.env.PORT ?? 3001);   //3000
}
void bootstrap();
