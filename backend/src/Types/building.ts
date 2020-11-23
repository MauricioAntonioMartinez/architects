import { Field, InputType, ObjectType } from "type-graphql";
import { Building } from "../entities/Building/Building";
import { ErrorResponse } from "./Error";

@ObjectType()
export class AddBuildingResponse extends ErrorResponse {
  @Field(() => Building, { nullable: true })
  building?: Building;
}

@ObjectType()
export class BuildingsResponse {
  @Field(() => [Building], { nullable: true })
  buildings?: Building[];
}

@InputType()
export class BuildingInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field()
  name!: string;

  @Field()
  date!: string;

  @Field()
  status!: string;
}
