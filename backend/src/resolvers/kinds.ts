import { Query, Resolver } from "type-graphql";
import {
  BuildingStatus,
  PaymentMode,
  PurchaseKind,
  StatusPayment,
  StatusPurchase,
} from "../entities";
import { Kinds } from "../Types/kinds";

@Resolver()
export class KindsResolver {
  @Query(() => Kinds)
  async kinds(): Promise<Kinds> {
    const args = await Promise.all([
      StatusPayment.find(),
      StatusPurchase.find(),
      BuildingStatus.find(),
      PurchaseKind.find(),
      PaymentMode.find(),
    ]);
    return {
      status_payment: args[0],
      status_purchase: args[1],
      building_status: args[2],
      purchase_kind: args[3],
      payment_mode: args[4],
    };
  }
}
