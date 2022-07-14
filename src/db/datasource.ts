import { DataSource } from 'typeorm';

import { databaseConfig, makeDatabaseConfig } from './db.config';

const config = makeDatabaseConfig(databaseConfig());

export default new DataSource(config);
