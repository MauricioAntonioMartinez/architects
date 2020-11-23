import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Job } from "./Job";
import { WeekDate } from "./WeekDate";

@ObjectType()
@Entity()
export class Payment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column("numeric")
  working_days?: number;

  @Field(() => Job)
  @ManyToOne(() => Job, (jb) => jb.id)
  job!: Job;

  @Field()
  @Column()
  startWeekDateId?: number;

  @Field(() => WeekDate)
  @ManyToOne(() => WeekDate, (w) => w.payment)
  startWeekDate!: WeekDate;

  // @Field(() => StatusPayment)
  // @ManyToOne(() => StatusPayment, (st) => st.id)
  // status!: StatusPayment;
}
