import 'dotenv/config';

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { log } from './logger';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

function requestHandler(req: IncomingMessage, res: ServerResponse) {
  const method = req.method ?? 'GET';
  const url = req.url ?? '/';

  log(`${method} ${url}`);

  res.setHeader('Content-Type', 'application/json');

  switch (true) {
    case url === '/' && method === 'GET':
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Kumusta Mundo!' }));
      break;

    case url === '/status' && method === 'GET':
      res.statusCode = 200;
      res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
      break;

    default:
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Not Found' }));
      break;
  }
}

const server = createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
