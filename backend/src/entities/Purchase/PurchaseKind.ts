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
export class PurchaseKind extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  kind!: string;

  @OneToMany(() => Purchase, (or) => or.purchase_kind)
  purchase?: Purchase;
}
