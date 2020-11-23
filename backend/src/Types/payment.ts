import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class ReportResponse {
  @Field(() => Float)
  work_force_total!: number;
  @Field(() => Float)
  material_total!: number;
  @Field(() => Float)
  building_total!: number;
}
