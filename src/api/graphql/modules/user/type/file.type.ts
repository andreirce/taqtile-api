import { FileModel } from '@domain/model/file.model';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class File implements FileModel {
  @Field(() => String)
  mimetype: string;

  @Field(() => String)
  filename: string;

  @Field(() => String)
  encoding: string;
}
