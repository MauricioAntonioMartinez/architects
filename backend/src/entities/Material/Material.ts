import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchase } from "../Purchase/Purchase";
import { Provider } from "./Provider";

@ObjectType()
@Entity()
export class Material extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column("text")
  description!: string;

  @Field(() => Provider)
  @ManyToOne(() => Provider, (prov) => prov.material)
  provider!: Provider;

  @OneToMany(() => Purchase, (pr) => pr.material)
  purchase?: Purchase;
}
