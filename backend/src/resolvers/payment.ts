import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { default as validate, default as validator } from "validator";
import { Payment, Purchase } from "../entities/index";
import { MyContext } from "../types";
import { ReportResponse } from "../Types/payment";
@Resolver(Payment)
export class PaymentResolver {
  // @FieldResolver(() => WeekDate)
  // startWeekDate(@Root() payment: Payment, @Ctx() { dateLoader }: MyContext) {
  //   return dateLoader.load(payment.startWeekDateId || 1);
  // }

  @Query(() => [Payment], { nullable: true })
  async getEmployeePayments(
    @Arg("initialDate") initialDate: string,
    @Arg("endDate") endDate: string,
    @Arg("buildingId", { nullable: true }) buildingId: string
  ): Promise<Payment[] | null> {
    if (
      !validate.toDate(initialDate) ||
      !validate.toDate(endDate) ||
      !validator.isUUID(buildingId)
    )
      return null;

    return Payment.find({
      relations: ["job", "job.employee", "startWeekDate"],
      where: (db: any) => {
        db.where(
          `"Payment__job"."buildingId" = :bld AND "Payment__job"."isActive" = true
           AND  ("Payment__startWeekDate".date  BETWEEN :ini AND :end)`,
          {
            bld: buildingId,
            ini: initialDate,
            end: endDate,
          }
        );
      },
    });
  }

 

  @Mutation(() => Payment, { nullable: true })
  async changeWorkingDays(
    @Arg("paymentId") paymentId: string,
    @Arg("working_days", () => Int) working_days: number
  ) {
    if (
      !(working_days >= 0 && working_days <= 5) ||
      !validate.isUUID(paymentId)
    )
      return null;

    await Payment.update(paymentId, {
      working_days: working_days,
    });

    return Payment.findOne(paymentId);
  }
}
