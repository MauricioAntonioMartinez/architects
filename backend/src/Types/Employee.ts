import { Field, InputType, ObjectType } from "type-graphql";
import { Employee } from "../entities";
import { ErrorResponse } from "./Error";

@ObjectType()
export class EmployeeResponse extends ErrorResponse {
  @Field(() => Employee, { nullable: true })
  employee?: Employee;
}

@InputType()
export class EmployeeInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field()
  name!: string;

  @Field()
  phone!: string;

  @Field()
  heal_plan!: string;

  @Field()
  INE!: string;

  @Field()
  address!: string;
}
