import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FormsService } from './forms.service';
import { Form } from 'src/graphql/models/form.model';
import { QuestionInput } from 'src/graphql/inputs/question.input';

const { v4: uuidv4 } = require('uuid');

@Resolver()
export class FormsResolver {
  constructor(private readonly formsService: FormsService) {}

  @Query(() => [Form])
  forms(): Form[] {
    return this.formsService.getAllForms();
  }

  @Query(() => Form, { nullable: true })
  form(@Args('id') id: string): Form | null {
    return this.formsService.getFormById(id);
  }

  @Mutation(() => Form)
  createForm(
    @Args('title') title: string,
    @Args('description', { nullable: true }) description?: string,
    @Args({ name: 'questions', type: () => [QuestionInput], nullable: true })
    questions?: QuestionInput[],
  ): Form {
    const form: Form = {
      id: uuidv4(),
      title,
      description,
      questions:
        questions?.map((q) => ({
          id: uuidv4(),
          title: q.title,
          type: q.type,
          options: q.options || [],
        })) || [],
    };

    return this.formsService.createForm(form);
  }
}
