import { Query, Resolver } from '@nestjs/graphql';
import { FormsService } from './forms.service';
import { Form } from 'src/graphql/models/form.model';

@Resolver()
export class FormsResolver {
  constructor(private readonly formsService: FormsService) {}

  @Query(() => [Form])
  forms(): Form[] {
    return this.formsService.getAllForms();
  }
}
