import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchase } from "./Purchase";
@ObjectType()
@Entity()
export class StatusPurchase extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  status!: string;

  @OneToMany(() => Purchase, (prc) => prc.status_purchase)
  purchase!: Purchase;
}
