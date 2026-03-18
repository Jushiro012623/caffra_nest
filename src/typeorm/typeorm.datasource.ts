import 'dotenv/config';
import { DataSource } from 'typeorm';
import { createTypeOrmOptions } from './typeorm.config';

const typeormDatasource = new DataSource(createTypeOrmOptions(process.env));

export default typeormDatasource;