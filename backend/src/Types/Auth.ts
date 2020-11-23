import { InputType, Field, ObjectType } from "type-graphql";
import { ErrorResponse } from "./Error";
import { User } from "../entities/Auth/User";
import { Role } from "../entities/Auth/Role";

@InputType()
export class UsernamePasswordInput {
  @Field()
  email!: string;
  @Field()
  password!: string;
}

@ObjectType()
export class UserResponse extends ErrorResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class LogInResponse extends ErrorResponse {
  @Field(() => Credentials, { nullable: true })
  credentials?: Credentials;
}

@ObjectType()
export class Credentials {
  @Field()
  token!: string;
  @Field()
  expiresIn!: number;
  @Field()
  role!: Role;
}
