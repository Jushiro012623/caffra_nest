import {DataSource} from 'typeorm';
import {databaseSource} from "@app/config/typeorm.config";

const typeormDatasource = new DataSource(databaseSource());

export default typeormDatasource;