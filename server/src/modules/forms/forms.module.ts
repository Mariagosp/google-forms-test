import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsResolver } from './forms.resolver';

@Module({
  providers: [FormsService, FormsResolver]
})
export class FormsModule {}
