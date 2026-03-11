import { Injectable } from '@nestjs/common';
import { Response } from 'src/graphql/models/response.model';
import { responses } from 'src/store/memory.store';

@Injectable()
export class ResponsesService {
  getResponsesByFormId(formId: string): Response[] {
    return responses.filter((response) => response.formId === formId);
  }

  createResponse(response: Response): Response {
    responses.push(response);
    return response;
  }
}
