import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payment } from "..";

@ObjectType()
@Entity()
export class StatusPayment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  status!: string;

  @OneToMany(() => Payment, (pm) => pm.id)
  payment?: Payment[];
}
