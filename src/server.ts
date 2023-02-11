import dotenv from 'dotenv';
import logger from './logger';
import { app } from './app';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5001;

app.listen(PORT, () => logger.info(`Server listening on port: ${PORT}`));
