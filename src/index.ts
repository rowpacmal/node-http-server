import { createServer, IncomingMessage, ServerResponse } from 'http';
import 'dotenv/config';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

function requestHandler(req: IncomingMessage, res: ServerResponse) {
  const method = req.method ?? 'GET';
  const url = req.url ?? '/';

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(`Method: ${method}\nURL: ${url}`);
}

const server = createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
