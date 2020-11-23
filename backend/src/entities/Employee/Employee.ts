import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Employee extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Field()
  @Column({ type: "varchar", length: 100 })
  phone!: string;

  @Field()
  @Column({ type: "varchar", length: 100 })
  heal_plan!: string;

  @Field()
  @Column("text")
  INE!: string;

  @Field()
  @Column("text")
  address!: string;

  @CreateDateColumn()
  createdAt?: string;
}
