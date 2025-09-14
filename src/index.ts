import 'dotenv/config';

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { randomUUID } from 'crypto';
import { log } from './utils/logger';
import { getBookings, addBooking } from './controllers/bookings';
import { Booking } from './types/bookings';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

async function requestHandler(req: IncomingMessage, res: ServerResponse) {
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

    case url === '/bookings' && method === 'GET':
      const bookings = await getBookings();

      res.statusCode = 200;
      res.end(JSON.stringify({ data: bookings }));
      break;

    case url === '/bookings' && method === 'POST':
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        try {
          const { name, room, date }: Booking = JSON.parse(body);

          if (!name || !room || !date) {
            throw new Error('Invalid Request');
          }

          await addBooking({ id: randomUUID(), name, room, date });

          res.statusCode = 201;
          res.end(JSON.stringify({ message: 'Booking added successfully' }));
        } catch (err: Error | unknown) {
          res.statusCode = 400;
          res.end(
            JSON.stringify({
              error: err instanceof Error ? err.message : 'Unknown error',
            })
          );
        }
      });
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
