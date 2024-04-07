import express from 'express';
import { logger } from './utils/logger';
import cors from 'cors';
import { createServer } from 'http';
import { errorHandler } from './middlewares/errorHandler';
import { routes } from './routes';
import { Server } from 'socket.io';

async function main() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });
  const PORT = process.env.PORT;

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  io.on('connection', (socket) => {
    socket.on('chat_message', (msg: string) => {
      io.emit('chat_message', msg);
    });
  });

  routes(app);

  app.use(errorHandler);

  server.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  logger.error(err);
});
