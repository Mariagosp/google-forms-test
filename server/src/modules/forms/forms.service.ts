import { Injectable } from '@nestjs/common';
import { Form } from 'src/graphql/models/form.model';
import { forms } from 'src/store/memory.store';

@Injectable()
export class FormsService {
  getAllForms(): Form[] {
    return forms;
  }

  // добавить форму (для теста)
  createForm(form: Form): Form {
    forms.push(form);
    return form;
  }
}
