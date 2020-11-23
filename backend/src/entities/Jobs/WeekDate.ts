import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payment } from "./Payment";

@ObjectType()
@Entity()
export class WeekDate extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column("date", { nullable: true })
  date!: string;

  @OneToMany((_) => Payment, (py) => py.startWeekDate)
  payment?: Payment[];
}
