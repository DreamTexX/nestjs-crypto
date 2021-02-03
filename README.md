# NestJS Password Crypto
This is a very basic module for hashing and verifying password.

## Installation

With npm
```shell
$ npm install --save @dreamtexx/nestjs-crypto
```

With yarn
```shell
$ yarn add @dreamtexx/nestjs-crypto
```

# Usage

Import CryptoModule in your root module.

**app.module.ts**
```ts
import { Module } from '@nestjs/common';
import { CryptoModule } from '@dreamtexx/nestjs-crypto';

@Module({
  imports: [
    CryptoModule.forRoot({
      pepper: 'SomeSecretString', //required
      saltLength: 16, //optional, default 16
      keyLength: 64, //optional, default 64
      delimiter: ':', //optional, default ':'
    }),
  ],
})
export class AppModule {}
```

Use `CryptoService` to hash or verify passwords.

**app.service.ts**
```ts
import { Injectable } from '@nestjs/common';
import { CryptoService } from '@dreamtexx/nestjs-crypto';

@Injectable()
export class AppService {
  constructor(private cryptoService: CryptoService) {}

  public getHash(password): string {
    return this.cryptoService.hash(password);
  }

  public checkPassword(password): boolean {
    // get hash from database for example:
    const hash = "...";
    return this.cryptoService.verify(password, hash);
  }
}
```