import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { DeepPartial, getManager } from "typeorm";
import { Building, Payment, WeekDate } from "../entities";
import { Employee } from "../entities/Employee/Employee";
import { Job } from "../entities/Jobs/Job";
import { EmployeeInput } from "../Types/Employee";
import { CreateJobResponse, JobInput, JobsQuery } from "../Types/Job";
import {
  validateJob,
  validationEmployee,
} from "../validation/validateRegister";

function getMonday(d: Date) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

@Resolver(Job)
export class JobResolver {
  // @FieldResolver(() => Building)
  // building(@Root() building: Building) {
  //   return Building.find({
  //     where: {
  //       id: building.id,
  //     },
  //     relations: ["status"],
  //   });
  //   // return createBuildingLoader.load(building.id);
  // }

  @Query(() => Job, { nullable: true })
  async getJob(@Arg("jobId") jobId: string): Promise<Job | undefined> {
    return Job.findOne(jobId, { relations: ["building", "employee"] });
  }

  @Mutation(() => CreateJobResponse)
  async addJob(
    @Arg("employee") employee: EmployeeInput,
    @Arg("job") job: JobInput
  ): Promise<CreateJobResponse> {
    const {
      isValid: isValidEmployee,
      errors: errorsEmployee,
    } = validationEmployee(employee);
    const { isValid: isValidJob, errors: errorsJob } = await validateJob(job);
    if (!isValidEmployee || !isValidJob) {
      return {
        errors: [...errorsEmployee, ...errorsJob],
      };
    }
    let jobCreated;
    await getManager().transaction(async (tx) => {
      const newEmployee = await tx
        .create(Employee, {
          ...employee,
        })
        .save();
      const building = await tx.findOne(Building, job.building);
      if (!building) throw new Error("No building found");
      jobCreated = await tx
        .create(Job, {
          building: building,
          employee: newEmployee,
          nomina: job.nomina,
          salary: job.salary,
          job: job.job,
          observations: job?.observations,
          isActive: job.isActive,
        })
        .save();
      if (job.isActive) {
        const currentDay = new Date().getDay();
        let monday = new Date();
        let working_days;
        if (currentDay > 0 && currentDay < 6) {
          working_days = 6 - currentDay;
          monday = getMonday(new Date());
        } else {
          monday.setDate(monday.getDate() + ((1 + 7 - monday.getDay()) % 7));
          working_days = 5;
        }

        let date = await WeekDate.findOne({
          where: {
            date: monday.toLocaleDateString(),
          },
        });
        if (!date) {
          date = await WeekDate.create({
            date: monday.toLocaleDateString(),
          }).save();
        }
        await Payment.create({
          job: jobCreated,
          working_days,
          startWeekDate: date,
        }).save();
      }
    });

    if (!jobCreated) return { errors: [{ error: "error ", field: "job" }] };

    return {
      job: jobCreated,
    };
  }

  @Mutation(() => CreateJobResponse)
  async editJob(
    @Arg("employee") employee: EmployeeInput,
    @Arg("job") job: JobInput
  ): Promise<CreateJobResponse> {
    const {
      isValid: isValidEmployee,
      errors: errorsEmployee,
    } = validationEmployee(employee);
    const { isValid: isValidJob, errors: errorsJob } = await validateJob(job);
    if (!isValidEmployee || !isValidJob) {
      return {
        errors: [...errorsEmployee, ...errorsJob],
      };
    }
    let jobUpdated;

    await getManager().transaction(async (tx) => {
      await tx.update(Employee, employee.id, {
        ...employee,
      });
      jobUpdated = await tx.update(Job, job.id, {
        ...(job as DeepPartial<Job>),
      });
    });

    if (!jobUpdated) return { errors: [{ error: "error ", field: "job" }] };

    const updatedJob = await Job.findOne(job.id, {
      relations: ["building", "employee"],
    });

    if (!updatedJob)
      return { errors: [{ field: "job", error: "Algo salio mal" }] };
    return { job: updatedJob };
  }

  @Query(() => JobsQuery)
  async getJobs(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true })
    cursor: string
  ): Promise<JobsQuery> {
    const countJob = await Job.count();
    const fetchedLimit = limit + 1;
    let jobs;
    if (cursor && countJob > 0)
      jobs = await Job.find({
        relations: ["employee", "building"],
        take: fetchedLimit,
        order: {
          cratedAt: "DESC",
        },
        where: (db: any) => {
          db.where(
            `"Job__employee".name LIKE '${cursor}%' OR "Job__building".name LIKE '${cursor}%' OR "Job"."job" LIKE '${cursor}%'`
          );
        },
      });
    else
      jobs = await Job.find({
        relations: ["employee", "building"],
        order: {
          cratedAt: "DESC",
        },
        take: fetchedLimit,
      });
    const hasMore = fetchedLimit == jobs.length;
    return { jobs: jobs.slice(0, hasMore ? -1 : jobs.length), hasMore };
  }
}
