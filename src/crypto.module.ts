import { DynamicModule, Global, Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoOptions } from './interfaces/crypto-options';

@Global()
@Module({})
export class CryptoModule {
  static forRoot(options: CryptoOptions): DynamicModule {
    return {
      module: CryptoModule,
      providers: [
        {
          provide: 'CRYPTO_OPTIONS',
          useValue: options,
        },
        CryptoService,
      ],
      exports: [CryptoService],
    };
  }
}
