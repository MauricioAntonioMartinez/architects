import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Building } from "../Building/Building";
import { Employee } from "../Employee/Employee";
import { Payment } from "./Payment";

@ObjectType()
@Entity()
export class Job extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column("numeric")
  salary!: number;

  @Field()
  @Column("varchar", { length: 50 })
  job!: string;

  @Field()
  @Column("text")
  nomina!: string;

  @Field(() => String)
  @CreateDateColumn()
  cratedAt!: Date;

  @Field()
  @Column("text", { default: "" })
  observations?: string;

  @Field()
  @Column("boolean", { default: true })
  isActive?: boolean;

  @Field()
  @OneToOne((type) => Employee)
  @JoinColumn()
  employee!: Employee;

  @Field(() => Building)
  @ManyToOne((type) => Building, (bl) => bl.job)
  building?: Building;

  @Field(() => [Payment])
  @OneToMany((type) => Payment, (bl) => bl.id)
  payments?: Payment[];
}
