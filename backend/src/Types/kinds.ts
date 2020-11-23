import { Field, ObjectType } from "type-graphql";
import {
  BuildingStatus,
  PaymentMode,
  PurchaseKind,
  StatusPayment,
  StatusPurchase,
} from "../entities";

@ObjectType()
export class Kinds {
  @Field(() => [PurchaseKind])
  purchase_kind!: PurchaseKind[];
  @Field(() => [StatusPurchase])
  status_purchase!: StatusPurchase[];
  @Field(() => [BuildingStatus])
  building_status!: BuildingStatus[];
  @Field(() => [StatusPayment])
  status_payment!: StatusPayment[];
  @Field(() => [PaymentMode])
  payment_mode!: PaymentMode[];
}
