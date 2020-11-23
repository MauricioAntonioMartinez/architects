import { Field, InputType, ObjectType } from "type-graphql";
import { Job } from "../entities/Jobs/Job";
import { ErrorResponse } from "./Error";

@ObjectType()
export class JobsQuery {
  @Field(() => [Job])
  jobs!: Job[];

  @Field(() => Boolean)
  hasMore!: boolean;
}

@InputType()
export class JobInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field()
  nomina!: string;

  @Field()
  salary!: number;

  @Field()
  job!: string;

  @Field()
  building!: string;

  @Field(() => Boolean)
  isActive!: boolean;

  @Field(() => String, { nullable: true })
  observations?: string;
}

@ObjectType()
export class CreateJobResponse extends ErrorResponse {
  @Field(() => Job, { nullable: true })
  job?: Job;
}
