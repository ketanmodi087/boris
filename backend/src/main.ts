import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  // Enable CORS
  app.enableCors({
    origin: "http://localhost:3000", // replace with your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // if you need to send cookies or other credentials
  });
  await app.listen(3001);
}
bootstrap();
