import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AllExceptionsFilter } from './filters/exceptions.filter';

@Global()
@Module({
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class CoreModule {}
