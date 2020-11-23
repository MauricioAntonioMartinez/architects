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
export class PaymentMode extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  payment!: string;

  @OneToMany(() => Purchase, (prc) => prc.payment_mode)
  purchase?: Purchase;
}
