import { startWebSocketServer } from './websocket';
import express from 'express';
import cors from 'cors';
import http from 'http';
import routes from './routes';
import { getPort } from './config';
import logger from './utils/logger';
import { handleUnifyAiRequest } from './agents/unifyAiAgent';
import express from 'express';

const port = getPort();

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', routes);
app.get('/api', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

startWebSocketServer(server);

app.post('/api/unify', async (req, res) => {
  const { content } = req.body;
  try {
      const response = await handleUnifyAiRequest(content);
      res.json({ response });
  } catch (error) {
      console.error(`Error in Unify.ai request: ${error}`);
      res.status(500).json({ error: error.message });
  }
});



