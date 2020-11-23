import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Job } from "../Jobs/Job";
import { BuildingStatus } from "./BuildingStatus";

@ObjectType()
@Entity()
export class Building extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column("text")
  name!: string;

  @Field()
  @Column("date")
  date!: string;

  @Field()
  @UpdateDateColumn()
  updatedAt?: string;

  @Field()
  @ManyToOne((type) => BuildingStatus, (st) => st.building)
  status!: BuildingStatus;

  @OneToMany((type) => Job, (jb) => jb.building) 
  job!: Job[];
}
