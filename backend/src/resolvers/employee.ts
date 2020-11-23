import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Employee } from "../entities/Employee/Employee";
import { MyContext } from "../types";
import { EmployeeInput } from "../Types/Employee";
import { validationEmployee } from "../validation/validateRegister";
import { EmployeeResponse } from "./../Types/Employee";
@Resolver()
export class EmployeeResolver {
  @Mutation(() => EmployeeResponse)
  async addEmployee(
    @Arg("fields") fields: EmployeeInput,
    @Ctx() { req }: MyContext
  ): Promise<EmployeeResponse> {
    const { isValid, errors } = validationEmployee(fields);
    if (!isValid) {
      return {
        errors,
      };
    }

    const newEmployee = await Employee.create({
      INE: fields.INE,
      address: fields.address,
      heal_plan: fields.heal_plan,
      name: fields.name,
      phone: fields.phone,
    }).save();
    return { employee: newEmployee };
  }
}
