import moment from "moment";
import { PurchaseQuery } from "../../generated/graphql";

export default (data: PurchaseQuery): any[] => [
  {
    name: "note_number",
    value: data!.purchase?.note_number,
  },
  {
    name: "purchaseKindId",
    value: +data!.purchase!.purchase_kind.id,
  },
  {
    name: "material",
    value: data!.purchase?.material.description,
  },
  {
    name: "provider",
    value: data!.purchase?.material.provider.name,
  },
  {
    name: "cost",
    value: +data!.purchase!.cost,
  },
  {
    name: "purchase_date",
    value: moment(data!.purchase?.purchase_date),
  },
  {
    name: "statusPurchaseId",
    value: +data!.purchase!.status_purchase.id,
  },
  {
    name: "paymentModeId",
    value: +data!.purchase!.payment_mode.id,
  },
  {
    name: "buildingId",
    value: data!.purchase?.building.id,
  },
  {
    name: "buildingStatusId",
    value: +data!.purchase!.building_status.id,
  },
  {
    name: "observations",
    value: data!.purchase?.observations,
  },
];
