import {Module} from '@nestjs/common';
import {HashService} from './hash.service';
import {CipherService} from "@app/crypto/cipher.service";

@Module({
    providers: [HashService, CipherService],
    exports: [HashService, CipherService],
})
export class CryptoModule {
}
