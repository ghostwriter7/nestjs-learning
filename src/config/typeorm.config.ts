import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DB_PASSWORD } from '../../environment';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: DB_PASSWORD,
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true
};
