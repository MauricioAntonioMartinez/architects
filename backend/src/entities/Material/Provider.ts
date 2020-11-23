import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Material } from "./Material";

@Entity()
@ObjectType()
export class Provider extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column({ type: "varchar", length: 100 })
  name!: string;

  @OneToMany(() => Material, (or) => or.provider)
  material?: Material[];
}
