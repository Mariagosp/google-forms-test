import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { FormsModule } from './modules/forms/forms.module';
import { ResponsesModule } from './modules/responses/responses.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

      playground: true,
    }),
    FormsModule,
    ResponsesModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
