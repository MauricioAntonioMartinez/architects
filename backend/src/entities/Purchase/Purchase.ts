import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Building } from "../Building/Building";
import { BuildingStatus } from "../Building/BuildingStatus";
import { Material } from "../Material/Material";
import { PaymentMode } from "./PaymentMode";
import { PurchaseKind } from "./PurchaseKind";
import { StatusPurchase } from "./StatusPurchase";

@ObjectType()
@Entity()
export class Purchase extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column("text")
  note_number!: string;

  @Field()
  @Column("numeric")
  cost!: number;

  @Field()
  @Column("date", { nullable: true })
  purchase_date!: string;

  @Field()
  @Column("integer")
  paymentModeId!: number;

  @Field()
  @Column("text", { nullable: true })
  observations?: string;

  @Field(() => PaymentMode, { nullable: false })
  @ManyToOne(() => PaymentMode, (py) => py.purchase, { nullable: false })
  payment_mode!: PaymentMode;

  @Field()
  @Column("integer")
  purchaseKindId!: number;

  @Field(() => PurchaseKind, { nullable: false })
  @ManyToOne(() => PurchaseKind, (pr) => pr.purchase, { nullable: false })
  purchase_kind!: PurchaseKind;

  @Field()
  @Column("uuid")
  buildingId!: string;

  @Field(() => Building, { nullable: false })
  @ManyToOne(() => Building, (bld) => bld.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  building!: Building;

  @Field(() => Material, { nullable: false })
  @ManyToOne(() => Material, (m) => m.purchase, { nullable: false })
  material!: Material;

  @Field()
  @Column("integer")
  statusPurchaseId!: number;

  @Field(() => StatusPurchase, { nullable: false })
  @ManyToOne(() => StatusPurchase, (st) => st.purchase, { nullable: false })
  status_purchase!: StatusPurchase;

  @Field()
  @Column("integer")
  buildingStatusId!: number;

  @Field(() => BuildingStatus)
  @ManyToOne(() => BuildingStatus, (bld) => bld.purchase, { nullable: false })
  building_status!: BuildingStatus;
}
