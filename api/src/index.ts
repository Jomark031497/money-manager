import express from 'express';
import { logger } from './utils/logger.js';
import cors from 'cors';
import { createServer } from 'http';
import { errorHandler } from './middlewares/errorHandler.js';
import { routes } from './routes.js';

async function main() {
  const app = express();
  const server = createServer(app);
  const PORT = process.env.PORT;

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  routes(app);

  app.use(errorHandler);

  server.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  logger.error(err);
});
