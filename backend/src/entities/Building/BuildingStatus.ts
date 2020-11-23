import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchase } from "../Purchase/Purchase";
import { Building } from "./Building";

@ObjectType()
@Entity()
export class BuildingStatus extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column("text")
  status!: string;

  @OneToMany((type) => Building, (bld) => bld.status)
  building!: Building;

  @OneToMany(() => Purchase, (pr) => pr.building_status)
  purchase!: Purchase;
}
