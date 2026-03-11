import { Module } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { ResponsesResolver } from './responses.resolver';

@Module({
  providers: [ResponsesService, ResponsesResolver]
})
export class ResponsesModule {}
