import {Module} from '@nestjs/common';
import {TypeOrmModule} from './typeorm/typeorm.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
