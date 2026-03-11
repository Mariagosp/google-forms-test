import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResponsesService } from './responses.service';
import { Response } from 'src/graphql/models/response.model';
import { AnswerInput } from 'src/graphql/inputs/answer.input';
import { Answer } from 'src/graphql/models/answer.model';

const { v4: uuidv4 } = require('uuid');

@Resolver()
export class ResponsesResolver {
  constructor(private readonly responseService: ResponsesService) {}

  @Query(() => Response, { nullable: true })
  responses(@Args('formId') formId: string): Response[] {
    return this.responseService.getResponsesByFormId(formId);
  }

  @Mutation(() => Response)
  submitResponse(
    @Args('formId') formId: string,
    @Args({ name: 'answers', type: () => [AnswerInput] }) answers: Answer[],
  ): Response {
    const newResponse = {
      id: uuidv4(),
      formId,
      answers,
    };

    return this.responseService.createResponse(newResponse);
  }
}
