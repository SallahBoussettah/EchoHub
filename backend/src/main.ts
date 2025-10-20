import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix for all routes
  app.setGlobalPrefix(process.env.API_PREFIX || 'api/v1');

  // Enable CORS for both localhost and local network
  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://192.168.100.10:3000', // Your local network IP
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if origin is in allowed list or matches local network pattern
      if (
        allowedOrigins.includes(origin) ||
        /^http:\/\/192\.168\.\d+\.\d+:3000$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;

  // Listen on all network interfaces (0.0.0.0) to accept connections from local network
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 EchoHub Backend running on:`);
  console.log(`   - Local:   http://localhost:${port}`);
  console.log(`   - Network: http://192.168.100.10:${port}`);
  console.log(`📚 API available at:`);
  console.log(
    `   - Local:   http://localhost:${port}/${process.env.API_PREFIX || 'api/v1'}`,
  );
  console.log(
    `   - Network: http://192.168.100.10:${port}/${process.env.API_PREFIX || 'api/v1'}`,
  );
}

bootstrap();
