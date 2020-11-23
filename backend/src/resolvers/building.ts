import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import validator from "validator";
import { Payment, Purchase } from "../entities";
import { Building } from "../entities/Building/Building";
import { MyContext } from "../types";
import { AddBuildingResponse, BuildingInput } from "../Types/building";
import { ReportResponse } from "../Types/payment";
import { validateBuilding } from "../validation/validateRegister";
import { BuildingStatus } from "./../entities/Building/BuildingStatus";

@Resolver()
export class BuildingResolver {
  @Query(() => [Building])
  async buildings(@Ctx() {}: MyContext): Promise<Building[]> {
    return Building.find({ relations: ["status"] });
  }

  @Mutation(() => AddBuildingResponse)
  async addBuilding(
    @Arg("fields") fields: BuildingInput
  ): Promise<AddBuildingResponse> {
    const { isValid, errors } = validateBuilding(fields);
    if (!isValid) {
      return {
        errors,
      };
    }

    const bld = await BuildingStatus.find({ where: { status: fields.status } });
    if (bld.length < 1) {
      return {
        errors: [{ error: "Status no encontrado", field: "date" }],
      };
    }

    const newBuilding = await Building.create({
      name: fields.name,
      status: bld[0],
      date: fields.date,
    }).save();

    return {
      building: newBuilding,
    };
  }

  @Mutation(() => AddBuildingResponse)
  async updateBuilding(
    @Arg("building") building: BuildingInput,
    @Ctx() {}: MyContext
  ): Promise<AddBuildingResponse> {
    const { isValid, errors } = validateBuilding(building);
    if (!isValid) {
      return {
        errors,
      };
    }
    const status = await BuildingStatus.find({
      where: { status: building.status },
    });

    if (status.length === 0)
      return { errors: [{ field: "status", error: "Estado no encontrado" }] };

    const newBuilding = await getRepository(Building).save({
      id: building.id,
      name: building.name,
      date: building.date,
      status: status[0],
    });
    return { building: newBuilding };
  }

  @Mutation(() => String, { nullable: true })
  async deleteBuilding(
    @Arg("buildingId") buildingId: string
  ): Promise<String | null> {
    if (!buildingId || !validator.isUUID(buildingId)) return null;
    await Building.delete({ id: buildingId });
    return buildingId;
  }

  @Query(() => ReportResponse, { nullable: true })
  async generateReport(
    @Arg("initialDate") initialDate: string,
    @Arg("endDate") endDate: string,
    @Ctx() { db }: MyContext,
    @Arg("buildingId", { nullable: true }) buildingId: string
  ): Promise<ReportResponse | null> {
    if (
      !validator.toDate(initialDate) ||
      !validator.toDate(endDate) ||
      !validator.isUUID(buildingId)
    )
      return null;

    const work_force_total = await db
      .getRepository(Payment)
      .createQueryBuilder("payment")
      .innerJoin("payment.job", "job")
      .innerJoin("job.employee", "employee")
      .innerJoin("payment.startWeekDate", "week_date")
      .select(`SUM("job"."salary"*working_days)`, "sum")
      .where(`"buildingId" = :bld AND date BETWEEN :ini AND :end`, {
        bld: buildingId,
        ini: initialDate,
        end: endDate,
      })
      .execute();

    //AND "job"."isActive" = true

    const material_total = await db
      .getRepository(Purchase)
      .createQueryBuilder("material")
      .select(`SUM(cost)`)
      .where(
        "material.buildingId = :bld  AND purchase_date BETWEEN :ini AND :end",
        { bld: buildingId, ini: initialDate, end: endDate }
      )
      .execute();

    return {
      building_total: +material_total[0].sum + +work_force_total[0].sum,
      material_total: material_total[0].sum || 0.0,
      work_force_total: work_force_total[0].sum,
    };
  }

  // @Query()
  // async downloadReport() {
  //   //TODO: make the excel
  //   //TODO: send the excel via pipe
  // }
}
