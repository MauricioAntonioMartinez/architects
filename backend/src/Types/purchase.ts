import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Purchase } from "../entities/Purchase/Purchase";
import { ErrorResponse } from "./Error";

@ObjectType()
export class PurchasesResponse {
  @Field(() => [Purchase])
  purchases!: Purchase[];

  @Field(() => Boolean)
  hasMore!: boolean;
}

@ObjectType()
export class CreatePurchase extends ErrorResponse {
  @Field(() => Purchase, { nullable: true })
  purchase?: Purchase;
}

@InputType()
export class MaterialInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field()
  note_number!: string;

  @Field(() => Int)
  purchaseKindId!: number;

  @Field()
  material!: string;

  @Field()
  provider!: string;

  @Field()
  cost!: number;

  @Field()
  purchase_date!: string;

  @Field(() => Int)
  statusPurchaseId!: number;

  @Field(() => Int)
  paymentModeId!: number;

  @Field()
  buildingId!: string;

  @Field(() => Int)
  buildingStatusId!: number;

  @Field(() => String, { nullable: true })
  observations?: string;
}

@ObjectType()
export class Search {
  @Field(() => String, { nullable: true })
  value?: string;
}
