import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  buildings: Array<Building>;
  generateReport?: Maybe<ReportResponse>;
  getJob?: Maybe<Job>;
  getJobs: JobsQuery;
  kinds: Kinds;
  getEmployeePayments?: Maybe<Array<Payment>>;
  purchases: PurchasesResponse;
  purchase?: Maybe<Purchase>;
  materialSearch?: Maybe<Array<Search>>;
  providerSearch?: Maybe<Array<Search>>;
};

export type QueryGenerateReportArgs = {
  buildingId?: Maybe<Scalars["String"]>;
  endDate: Scalars["String"];
  initialDate: Scalars["String"];
};

export type QueryGetJobArgs = {
  jobId: Scalars["String"];
};

export type QueryGetJobsArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type QueryGetEmployeePaymentsArgs = {
  buildingId?: Maybe<Scalars["String"]>;
  endDate: Scalars["String"];
  initialDate: Scalars["String"];
};

export type QueryPurchasesArgs = {
  limit: Scalars["Int"];
  cursor?: Maybe<Scalars["String"]>;
};

export type QueryPurchaseArgs = {
  purchase_id: Scalars["String"];
};

export type QueryMaterialSearchArgs = {
  material?: Maybe<Scalars["String"]>;
};

export type QueryProviderSearchArgs = {
  provider?: Maybe<Scalars["String"]>;
};

export type Building = {
  __typename?: "Building";
  id: Scalars["String"];
  name: Scalars["String"];
  date: Scalars["String"];
  updatedAt: Scalars["String"];
  status: BuildingStatus;
};

export type BuildingStatus = {
  __typename?: "BuildingStatus";
  id: Scalars["String"];
  status: Scalars["String"];
};

export type ReportResponse = {
  __typename?: "ReportResponse";
  work_force_total: Scalars["Float"];
  material_total: Scalars["Float"];
  building_total: Scalars["Float"];
};

export type Job = {
  __typename?: "Job";
  id: Scalars["String"];
  salary: Scalars["Float"];
  job: Scalars["String"];
  nomina: Scalars["String"];
  cratedAt: Scalars["String"];
  observations: Scalars["String"];
  isActive: Scalars["Boolean"];
  employee: Employee;
  building: Building;
  payments: Array<Payment>;
};

export type Employee = {
  __typename?: "Employee";
  id: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
  heal_plan: Scalars["String"];
  INE: Scalars["String"];
  address: Scalars["String"];
};

export type Payment = {
  __typename?: "Payment";
  id: Scalars["String"];
  working_days: Scalars["Float"];
  job: Job;
  startWeekDateId: Scalars["Float"];
  startWeekDate: WeekDate;
};

export type WeekDate = {
  __typename?: "WeekDate";
  id: Scalars["String"];
  date: Scalars["String"];
};

export type JobsQuery = {
  __typename?: "JobsQuery";
  jobs: Array<Job>;
  hasMore: Scalars["Boolean"];
};

export type Kinds = {
  __typename?: "Kinds";
  purchase_kind: Array<PurchaseKind>;
  status_purchase: Array<StatusPurchase>;
  building_status: Array<BuildingStatus>;
  status_payment: Array<StatusPayment>;
  payment_mode: Array<PaymentMode>;
};

export type PurchaseKind = {
  __typename?: "PurchaseKind";
  id: Scalars["String"];
  kind: Scalars["String"];
};

export type StatusPurchase = {
  __typename?: "StatusPurchase";
  id: Scalars["String"];
  status: Scalars["String"];
};

export type StatusPayment = {
  __typename?: "StatusPayment";
  id: Scalars["String"];
  status: Scalars["String"];
};

export type PaymentMode = {
  __typename?: "PaymentMode";
  id: Scalars["String"];
  payment: Scalars["String"];
};

export type PurchasesResponse = {
  __typename?: "PurchasesResponse";
  purchases: Array<Purchase>;
  hasMore: Scalars["Boolean"];
};

export type Purchase = {
  __typename?: "Purchase";
  id: Scalars["String"];
  note_number: Scalars["String"];
  cost: Scalars["Float"];
  purchase_date: Scalars["String"];
  paymentModeId: Scalars["Float"];
  observations: Scalars["String"];
  payment_mode: PaymentMode;
  purchaseKindId: Scalars["Float"];
  purchase_kind: PurchaseKind;
  buildingId: Scalars["String"];
  building: Building;
  material: Material;
  statusPurchaseId: Scalars["Float"];
  status_purchase: StatusPurchase;
  buildingStatusId: Scalars["Float"];
  building_status: BuildingStatus;
};

export type Material = {
  __typename?: "Material";
  id: Scalars["String"];
  description: Scalars["String"];
  providerId: Scalars["String"];
  provider: Provider;
};

export type Provider = {
  __typename?: "Provider";
  id: Scalars["String"];
  name: Scalars["String"];
};

export type Search = {
  __typename?: "Search";
  value?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  loginUser: LogInResponse;
  createUser: UserResponse;
  addBuilding: AddBuildingResponse;
  updateBuilding: AddBuildingResponse;
  deleteBuilding?: Maybe<Scalars["String"]>;
  addEmployee: EmployeeResponse;
  addJob: CreateJobResponse;
  editJob: CreateJobResponse;
  changeWorkingDays?: Maybe<Payment>;
  addEditPurchase: CreatePurchase;
};

export type MutationLoginUserArgs = {
  fields: UsernamePasswordInput;
};

export type MutationCreateUserArgs = {
  fields: UsernamePasswordInput;
};

export type MutationAddBuildingArgs = {
  fields: BuildingInput;
};

export type MutationUpdateBuildingArgs = {
  building: BuildingInput;
};

export type MutationDeleteBuildingArgs = {
  buildingId: Scalars["String"];
};

export type MutationAddEmployeeArgs = {
  fields: EmployeeInput;
};

export type MutationAddJobArgs = {
  job: JobInput;
  employee: EmployeeInput;
};

export type MutationEditJobArgs = {
  job: JobInput;
  employee: EmployeeInput;
};

export type MutationChangeWorkingDaysArgs = {
  working_days: Scalars["Int"];
  paymentId: Scalars["String"];
};

export type MutationAddEditPurchaseArgs = {
  isEditMode?: Maybe<Scalars["Boolean"]>;
  fields: MaterialInput;
};

export type LogInResponse = {
  __typename?: "LogInResponse";
  errors?: Maybe<Array<FieldError>>;
  credentials?: Maybe<Credentials>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  error: Scalars["String"];
};

export type Credentials = {
  __typename?: "Credentials";
  token: Scalars["String"];
  expiresIn: Scalars["Float"];
  role: Role;
};

export type Role = {
  __typename?: "Role";
  id: Scalars["Float"];
  role: Scalars["String"];
};

export type UsernamePasswordInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type AddBuildingResponse = {
  __typename?: "AddBuildingResponse";
  errors?: Maybe<Array<FieldError>>;
  building?: Maybe<Building>;
};

export type BuildingInput = {
  id?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  date: Scalars["String"];
  status: Scalars["String"];
};

export type EmployeeResponse = {
  __typename?: "EmployeeResponse";
  errors?: Maybe<Array<FieldError>>;
  employee?: Maybe<Employee>;
};

export type EmployeeInput = {
  id?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  phone: Scalars["String"];
  heal_plan: Scalars["String"];
  INE: Scalars["String"];
  address: Scalars["String"];
};

export type CreateJobResponse = {
  __typename?: "CreateJobResponse";
  errors?: Maybe<Array<FieldError>>;
  job?: Maybe<Job>;
};

export type JobInput = {
  id?: Maybe<Scalars["String"]>;
  nomina: Scalars["String"];
  salary: Scalars["Float"];
  job: Scalars["String"];
  building: Scalars["String"];
  isActive: Scalars["Boolean"];
  observations?: Maybe<Scalars["String"]>;
};

export type CreatePurchase = {
  __typename?: "CreatePurchase";
  errors?: Maybe<Array<FieldError>>;
  purchase?: Maybe<Purchase>;
};

export type MaterialInput = {
  id?: Maybe<Scalars["String"]>;
  note_number: Scalars["String"];
  purchaseKindId: Scalars["Int"];
  material: Scalars["String"];
  provider: Scalars["String"];
  cost: Scalars["Float"];
  purchase_date: Scalars["String"];
  statusPurchaseId: Scalars["Int"];
  paymentModeId: Scalars["Int"];
  buildingId: Scalars["String"];
  buildingStatusId: Scalars["Int"];
  observations?: Maybe<Scalars["String"]>;
};

export type BuildingSnippetFragment = { __typename?: "Building" } & Pick<
  Building,
  "id" | "name" | "date"
> & {
    status: { __typename?: "BuildingStatus" } & Pick<
      BuildingStatus,
      "id" | "status"
    >;
  };

export type JobSnippetFragment = { __typename?: "Job" } & Pick<
  Job,
  "id" | "salary" | "job" | "nomina" | "cratedAt" | "observations" | "isActive"
> & {
    employee: { __typename?: "Employee" } & Pick<
      Employee,
      "id" | "name" | "heal_plan" | "phone" | "INE" | "address"
    >;
    building: { __typename?: "Building" } & Pick<Building, "id" | "name">;
  };

export type PurchaseSnippetFragment = { __typename?: "Purchase" } & Pick<
  Purchase,
  "id" | "note_number" | "cost" | "purchase_date"
> & {
    building: { __typename?: "Building" } & Pick<Building, "id" | "name">;
    material: { __typename?: "Material" } & Pick<
      Material,
      "id" | "description"
    > & {
        provider: { __typename?: "Provider" } & Pick<Provider, "id" | "name">;
      };
    building_status: { __typename?: "BuildingStatus" } & Pick<
      BuildingStatus,
      "id" | "status"
    >;
  };

export type LoginUserMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginUserMutation = { __typename?: "Mutation" } & {
  loginUser: { __typename?: "LogInResponse" } & {
    credentials?: Maybe<
      { __typename?: "Credentials" } & Pick<
        Credentials,
        "token" | "expiresIn"
      > & { role: { __typename?: "Role" } & Pick<Role, "role"> }
    >;
    errors?: Maybe<
      Array<{ __typename?: "FieldError" } & Pick<FieldError, "field" | "error">>
    >;
  };
};

export type CreateUserMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type CreateUserMutation = { __typename?: "Mutation" } & {
  createUser: { __typename?: "UserResponse" } & {
    user?: Maybe<
      { __typename?: "User" } & Pick<
        User,
        "id" | "email" | "createdAt" | "updatedAt"
      >
    >;
    errors?: Maybe<
      Array<{ __typename?: "FieldError" } & Pick<FieldError, "field" | "error">>
    >;
  };
};

export type AddBuildingMutationVariables = Exact<{
  name: Scalars["String"];
  date: Scalars["String"];
  status: Scalars["String"];
}>;

export type AddBuildingMutation = { __typename?: "Mutation" } & {
  addBuilding: { __typename?: "AddBuildingResponse" } & {
    building?: Maybe<{ __typename?: "Building" } & BuildingSnippetFragment>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError" } & Pick<FieldError, "field" | "error">>
    >;
  };
};

export type DeleteBuildingMutationVariables = Exact<{
  buildingId: Scalars["String"];
}>;

export type DeleteBuildingMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteBuilding"
>;

export type UpdateBuildingMutationVariables = Exact<{
  id: Scalars["String"];
  name: Scalars["String"];
  date: Scalars["String"];
  status: Scalars["String"];
}>;

export type UpdateBuildingMutation = { __typename?: "Mutation" } & {
  updateBuilding: { __typename?: "AddBuildingResponse" } & {
    building?: Maybe<{ __typename?: "Building" } & BuildingSnippetFragment>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError" } & Pick<FieldError, "field" | "error">>
    >;
  };
};

export type AddJobMutationVariables = Exact<{
  nomina: Scalars["String"];
  salary: Scalars["Float"];
  buildingId: Scalars["String"];
  job: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
  address: Scalars["String"];
  heal_plan: Scalars["String"];
  INE: Scalars["String"];
  isActive: Scalars["Boolean"];
  observations?: Maybe<Scalars["String"]>;
}>;

export type AddJobMutation = { __typename?: "Mutation" } & {
  addJob: { __typename?: "CreateJobResponse" } & {
    job?: Maybe<{ __typename?: "Job" } & JobSnippetFragment>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError" } & Pick<FieldError, "field" | "error">>
    >;
  };
};

export type EditJobMutationVariables = Exact<{
  nomina: Scalars["String"];
  salary: Scalars["Float"];
  buildingId: Scalars["String"];
  job: Scalars["String"];
  jobId: Scalars["String"];
  employeeId: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
  address: Scalars["String"];
  heal_plan: Scalars["String"];
  INE: Scalars["String"];
  isActive: Scalars["Boolean"];
  observations?: Maybe<Scalars["String"]>;
}>;

export type EditJobMutation = { __typename?: "Mutation" } & {
  editJob: { __typename?: "CreateJobResponse" } & {
    job?: Maybe<{ __typename?: "Job" } & JobSnippetFragment>;
    errors?: Maybe<
      Array<{ __typename?: "FieldError" } & Pick<FieldError, "field" | "error">>
    >;
  };
};

export type ChangeWorkingDaysMutationVariables = Exact<{
  working_days: Scalars["Int"];
  paymentId: Scalars["String"];
}>;

export type ChangeWorkingDaysMutation = { __typename?: "Mutation" } & {
  changeWorkingDays?: Maybe<
    { __typename?: "Payment" } & Pick<Payment, "id" | "working_days">
  >;
};

export type AddEditPurchaseMutationVariables = Exact<{
  id?: Maybe<Scalars["String"]>;
  note_number: Scalars["String"];
  purchaseKindId: Scalars["Int"];
  material: Scalars["String"];
  provider: Scalars["String"];
  cost: Scalars["Float"];
  purchase_date: Scalars["String"];
  statusPurchaseId: Scalars["Int"];
  paymentModeId: Scalars["Int"];
  buildingId: Scalars["String"];
  buildingStatusId: Scalars["Int"];
  observations?: Maybe<Scalars["String"]>;
  isEditMode?: Maybe<Scalars["Boolean"]>;
}>;

export type AddEditPurchaseMutation = { __typename?: "Mutation" } & {
  addEditPurchase: { __typename?: "CreatePurchase" } & {
    purchase?: Maybe<
      { __typename?: "Purchase" } & Pick<Purchase, "observations"> & {
          status_purchase: { __typename?: "StatusPurchase" } & Pick<
            StatusPurchase,
            "id" | "status"
          >;
          purchase_kind: { __typename?: "PurchaseKind" } & Pick<
            PurchaseKind,
            "id" | "kind"
          >;
          payment_mode: { __typename?: "PaymentMode" } & Pick<
            PaymentMode,
            "id" | "payment"
          >;
        } & PurchaseSnippetFragment
    >;
    errors?: Maybe<
      Array<{ __typename?: "FieldError" } & Pick<FieldError, "field" | "error">>
    >;
  };
};

export type BuildingsQueryVariables = Exact<{ [key: string]: never }>;

export type BuildingsQuery = { __typename?: "Query" } & {
  buildings: Array<{ __typename?: "Building" } & BuildingSnippetFragment>;
};

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: "Query" } & Pick<Query, "hello">;

export type JobQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type JobQuery = { __typename?: "Query" } & {
  getJob?: Maybe<
    { __typename?: "Job" } & Pick<
      Job,
      | "id"
      | "salary"
      | "job"
      | "nomina"
      | "cratedAt"
      | "observations"
      | "isActive"
    > & {
        employee: { __typename?: "Employee" } & Pick<
          Employee,
          "id" | "name" | "heal_plan" | "phone" | "INE" | "address"
        >;
        building: { __typename?: "Building" } & Pick<Building, "id" | "name">;
      }
  >;
};

export type GetJobsQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: Maybe<Scalars["String"]>;
}>;

export type GetJobsQuery = { __typename?: "Query" } & {
  getJobs: { __typename?: "JobsQuery" } & Pick<JobsQuery, "hasMore"> & {
      jobs: Array<
        { __typename?: "Job" } & Pick<
          Job,
          "id" | "salary" | "nomina" | "job"
        > & {
            employee: { __typename?: "Employee" } & Pick<
              Employee,
              "id" | "name" | "heal_plan"
            >;
            building: { __typename?: "Building" } & Pick<
              Building,
              "id" | "name"
            >;
          }
      >;
    };
};

export type KindsQueryVariables = Exact<{ [key: string]: never }>;

export type KindsQuery = { __typename?: "Query" } & {
  kinds: { __typename?: "Kinds" } & {
    payment_mode: Array<
      { __typename?: "PaymentMode" } & Pick<PaymentMode, "id" | "payment">
    >;
    purchase_kind: Array<
      { __typename?: "PurchaseKind" } & Pick<PurchaseKind, "id" | "kind">
    >;
    status_payment: Array<
      { __typename?: "StatusPayment" } & Pick<StatusPayment, "id" | "status">
    >;
    building_status: Array<
      { __typename?: "BuildingStatus" } & Pick<BuildingStatus, "id" | "status">
    >;
    status_purchase: Array<
      { __typename?: "StatusPurchase" } & Pick<StatusPurchase, "id" | "status">
    >;
  };
};

export type PaymentsQueryVariables = Exact<{
  buildingId: Scalars["String"];
  endDate: Scalars["String"];
  initialDate: Scalars["String"];
}>;

export type PaymentsQuery = { __typename?: "Query" } & {
  getEmployeePayments?: Maybe<
    Array<
      { __typename?: "Payment" } & Pick<Payment, "id" | "working_days"> & {
          startWeekDate: { __typename?: "WeekDate" } & Pick<WeekDate, "date">;
          job: { __typename?: "Job" } & Pick<Job, "salary"> & {
              employee: { __typename?: "Employee" } & Pick<Employee, "name">;
            };
        }
    >
  >;
};

export type PurchaseQueryVariables = Exact<{
  purchaseId: Scalars["String"];
}>;

export type PurchaseQuery = { __typename?: "Query" } & {
  purchase?: Maybe<
    { __typename?: "Purchase" } & Pick<
      Purchase,
      "id" | "note_number" | "cost" | "purchase_date" | "observations"
    > & {
        building: { __typename?: "Building" } & Pick<Building, "id">;
        material: { __typename?: "Material" } & Pick<
          Material,
          "id" | "description"
        > & {
            provider: { __typename?: "Provider" } & Pick<
              Provider,
              "id" | "name"
            >;
          };
        status_purchase: { __typename?: "StatusPurchase" } & Pick<
          StatusPurchase,
          "id"
        >;
        purchase_kind: { __typename?: "PurchaseKind" } & Pick<
          PurchaseKind,
          "id"
        >;
        payment_mode: { __typename?: "PaymentMode" } & Pick<PaymentMode, "id">;
        building_status: { __typename?: "BuildingStatus" } & Pick<
          BuildingStatus,
          "id"
        >;
      }
  >;
};

export type PurchasesQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor: Scalars["String"];
}>;

export type PurchasesQuery = { __typename?: "Query" } & {
  purchases: { __typename?: "PurchasesResponse" } & Pick<
    PurchasesResponse,
    "hasMore"
  > & {
      purchases: Array<{ __typename?: "Purchase" } & PurchaseSnippetFragment>;
    };
};

export type ReportQueryVariables = Exact<{
  buildingId: Scalars["String"];
  initialDate: Scalars["String"];
  endDate: Scalars["String"];
}>;

export type ReportQuery = { __typename?: "Query" } & {
  generateReport?: Maybe<
    { __typename?: "ReportResponse" } & Pick<
      ReportResponse,
      "work_force_total" | "material_total" | "building_total"
    >
  >;
};

export type MaterialSearchQueryVariables = Exact<{
  material?: Maybe<Scalars["String"]>;
}>;

export type MaterialSearchQuery = { __typename?: "Query" } & {
  materialSearch?: Maybe<
    Array<{ __typename?: "Search" } & Pick<Search, "value">>
  >;
};

export type ProviderSearchQueryVariables = Exact<{
  provider?: Maybe<Scalars["String"]>;
}>;

export type ProviderSearchQuery = { __typename?: "Query" } & {
  providerSearch?: Maybe<
    Array<{ __typename?: "Search" } & Pick<Search, "value">>
  >;
};

export const BuildingSnippetFragmentDoc = gql`
  fragment BuildingSnippet on Building {
    id
    name
    date
    status {
      id
      status
    }
  }
`;
export const JobSnippetFragmentDoc = gql`
  fragment JobSnippet on Job {
    id
    salary
    job
    nomina
    cratedAt
    observations
    isActive
    employee {
      id
      name
      heal_plan
      phone
      INE
      address
    }
    building {
      id
      name
    }
  }
`;
export const PurchaseSnippetFragmentDoc = gql`
  fragment PurchaseSnippet on Purchase {
    id
    note_number
    cost
    purchase_date
    building {
      id
      name
    }
    material {
      id
      description
      provider {
        id
        name
      }
    }
    building_status {
      id
      status
    }
  }
`;
export const LoginUserDocument = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(fields: { email: $email, password: $password }) {
      credentials {
        token
        expiresIn
        role {
          role
        }
      }
      errors {
        field
        error
      }
    }
  }
`;
export type LoginUserMutationFn = Apollo.MutationFunction<
  LoginUserMutation,
  LoginUserMutationVariables
>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginUserMutation,
    LoginUserMutationVariables
  >
) {
  return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument,
    baseOptions
  );
}
export type LoginUserMutationHookResult = ReturnType<
  typeof useLoginUserMutation
>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<
  LoginUserMutation,
  LoginUserMutationVariables
>;
export const CreateUserDocument = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(fields: { password: $password, email: $email }) {
      user {
        id
        email
        createdAt
        updatedAt
      }
      errors {
        field
        error
      }
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    baseOptions
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult = Apollo.MutationResult<
  CreateUserMutation
>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const AddBuildingDocument = gql`
  mutation AddBuilding($name: String!, $date: String!, $status: String!) {
    addBuilding(fields: { name: $name, date: $date, status: $status }) {
      building {
        ...BuildingSnippet
      }
      errors {
        field
        error
      }
    }
  }
  ${BuildingSnippetFragmentDoc}
`;
export type AddBuildingMutationFn = Apollo.MutationFunction<
  AddBuildingMutation,
  AddBuildingMutationVariables
>;

/**
 * __useAddBuildingMutation__
 *
 * To run a mutation, you first call `useAddBuildingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBuildingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBuildingMutation, { data, loading, error }] = useAddBuildingMutation({
 *   variables: {
 *      name: // value for 'name'
 *      date: // value for 'date'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useAddBuildingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddBuildingMutation,
    AddBuildingMutationVariables
  >
) {
  return Apollo.useMutation<AddBuildingMutation, AddBuildingMutationVariables>(
    AddBuildingDocument,
    baseOptions
  );
}
export type AddBuildingMutationHookResult = ReturnType<
  typeof useAddBuildingMutation
>;
export type AddBuildingMutationResult = Apollo.MutationResult<
  AddBuildingMutation
>;
export type AddBuildingMutationOptions = Apollo.BaseMutationOptions<
  AddBuildingMutation,
  AddBuildingMutationVariables
>;
export const DeleteBuildingDocument = gql`
  mutation DeleteBuilding($buildingId: String!) {
    deleteBuilding(buildingId: $buildingId)
  }
`;
export type DeleteBuildingMutationFn = Apollo.MutationFunction<
  DeleteBuildingMutation,
  DeleteBuildingMutationVariables
>;

/**
 * __useDeleteBuildingMutation__
 *
 * To run a mutation, you first call `useDeleteBuildingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBuildingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBuildingMutation, { data, loading, error }] = useDeleteBuildingMutation({
 *   variables: {
 *      buildingId: // value for 'buildingId'
 *   },
 * });
 */
export function useDeleteBuildingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteBuildingMutation,
    DeleteBuildingMutationVariables
  >
) {
  return Apollo.useMutation<
    DeleteBuildingMutation,
    DeleteBuildingMutationVariables
  >(DeleteBuildingDocument, baseOptions);
}
export type DeleteBuildingMutationHookResult = ReturnType<
  typeof useDeleteBuildingMutation
>;
export type DeleteBuildingMutationResult = Apollo.MutationResult<
  DeleteBuildingMutation
>;
export type DeleteBuildingMutationOptions = Apollo.BaseMutationOptions<
  DeleteBuildingMutation,
  DeleteBuildingMutationVariables
>;
export const UpdateBuildingDocument = gql`
  mutation UpdateBuilding(
    $id: String!
    $name: String!
    $date: String!
    $status: String!
  ) {
    updateBuilding(
      building: { id: $id, name: $name, date: $date, status: $status }
    ) {
      building {
        ...BuildingSnippet
      }
      errors {
        field
        error
      }
    }
  }
  ${BuildingSnippetFragmentDoc}
`;
export type UpdateBuildingMutationFn = Apollo.MutationFunction<
  UpdateBuildingMutation,
  UpdateBuildingMutationVariables
>;

/**
 * __useUpdateBuildingMutation__
 *
 * To run a mutation, you first call `useUpdateBuildingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBuildingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBuildingMutation, { data, loading, error }] = useUpdateBuildingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      date: // value for 'date'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateBuildingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBuildingMutation,
    UpdateBuildingMutationVariables
  >
) {
  return Apollo.useMutation<
    UpdateBuildingMutation,
    UpdateBuildingMutationVariables
  >(UpdateBuildingDocument, baseOptions);
}
export type UpdateBuildingMutationHookResult = ReturnType<
  typeof useUpdateBuildingMutation
>;
export type UpdateBuildingMutationResult = Apollo.MutationResult<
  UpdateBuildingMutation
>;
export type UpdateBuildingMutationOptions = Apollo.BaseMutationOptions<
  UpdateBuildingMutation,
  UpdateBuildingMutationVariables
>;
export const AddJobDocument = gql`
  mutation addJob(
    $nomina: String!
    $salary: Float!
    $buildingId: String!
    $job: String!
    $name: String!
    $phone: String!
    $address: String!
    $heal_plan: String!
    $INE: String!
    $isActive: Boolean!
    $observations: String
  ) {
    addJob(
      job: {
        nomina: $nomina
        salary: $salary
        building: $buildingId
        job: $job
        observations: $observations
        isActive: $isActive
      }
      employee: {
        name: $name
        address: $address
        heal_plan: $heal_plan
        INE: $INE
        phone: $phone
      }
    ) {
      job {
        ...JobSnippet
      }
      errors {
        field
        error
      }
    }
  }
  ${JobSnippetFragmentDoc}
`;
export type AddJobMutationFn = Apollo.MutationFunction<
  AddJobMutation,
  AddJobMutationVariables
>;

/**
 * __useAddJobMutation__
 *
 * To run a mutation, you first call `useAddJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addJobMutation, { data, loading, error }] = useAddJobMutation({
 *   variables: {
 *      nomina: // value for 'nomina'
 *      salary: // value for 'salary'
 *      buildingId: // value for 'buildingId'
 *      job: // value for 'job'
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *      address: // value for 'address'
 *      heal_plan: // value for 'heal_plan'
 *      INE: // value for 'INE'
 *      isActive: // value for 'isActive'
 *      observations: // value for 'observations'
 *   },
 * });
 */
export function useAddJobMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddJobMutation,
    AddJobMutationVariables
  >
) {
  return Apollo.useMutation<AddJobMutation, AddJobMutationVariables>(
    AddJobDocument,
    baseOptions
  );
}
export type AddJobMutationHookResult = ReturnType<typeof useAddJobMutation>;
export type AddJobMutationResult = Apollo.MutationResult<AddJobMutation>;
export type AddJobMutationOptions = Apollo.BaseMutationOptions<
  AddJobMutation,
  AddJobMutationVariables
>;
export const EditJobDocument = gql`
  mutation editJob(
    $nomina: String!
    $salary: Float!
    $buildingId: String!
    $job: String!
    $jobId: String!
    $employeeId: String!
    $name: String!
    $phone: String!
    $address: String!
    $heal_plan: String!
    $INE: String!
    $isActive: Boolean!
    $observations: String
  ) {
    editJob(
      job: {
        id: $jobId
        nomina: $nomina
        salary: $salary
        building: $buildingId
        job: $job
        observations: $observations
        isActive: $isActive
      }
      employee: {
        id: $employeeId
        name: $name
        address: $address
        heal_plan: $heal_plan
        INE: $INE
        phone: $phone
      }
    ) {
      job {
        ...JobSnippet
      }
      errors {
        field
        error
      }
    }
  }
  ${JobSnippetFragmentDoc}
`;
export type EditJobMutationFn = Apollo.MutationFunction<
  EditJobMutation,
  EditJobMutationVariables
>;

/**
 * __useEditJobMutation__
 *
 * To run a mutation, you first call `useEditJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editJobMutation, { data, loading, error }] = useEditJobMutation({
 *   variables: {
 *      nomina: // value for 'nomina'
 *      salary: // value for 'salary'
 *      buildingId: // value for 'buildingId'
 *      job: // value for 'job'
 *      jobId: // value for 'jobId'
 *      employeeId: // value for 'employeeId'
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *      address: // value for 'address'
 *      heal_plan: // value for 'heal_plan'
 *      INE: // value for 'INE'
 *      isActive: // value for 'isActive'
 *      observations: // value for 'observations'
 *   },
 * });
 */
export function useEditJobMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditJobMutation,
    EditJobMutationVariables
  >
) {
  return Apollo.useMutation<EditJobMutation, EditJobMutationVariables>(
    EditJobDocument,
    baseOptions
  );
}
export type EditJobMutationHookResult = ReturnType<typeof useEditJobMutation>;
export type EditJobMutationResult = Apollo.MutationResult<EditJobMutation>;
export type EditJobMutationOptions = Apollo.BaseMutationOptions<
  EditJobMutation,
  EditJobMutationVariables
>;
export const ChangeWorkingDaysDocument = gql`
  mutation changeWorkingDays($working_days: Int!, $paymentId: String!) {
    changeWorkingDays(working_days: $working_days, paymentId: $paymentId) {
      id
      working_days
    }
  }
`;
export type ChangeWorkingDaysMutationFn = Apollo.MutationFunction<
  ChangeWorkingDaysMutation,
  ChangeWorkingDaysMutationVariables
>;

/**
 * __useChangeWorkingDaysMutation__
 *
 * To run a mutation, you first call `useChangeWorkingDaysMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeWorkingDaysMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeWorkingDaysMutation, { data, loading, error }] = useChangeWorkingDaysMutation({
 *   variables: {
 *      working_days: // value for 'working_days'
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function useChangeWorkingDaysMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeWorkingDaysMutation,
    ChangeWorkingDaysMutationVariables
  >
) {
  return Apollo.useMutation<
    ChangeWorkingDaysMutation,
    ChangeWorkingDaysMutationVariables
  >(ChangeWorkingDaysDocument, baseOptions);
}
export type ChangeWorkingDaysMutationHookResult = ReturnType<
  typeof useChangeWorkingDaysMutation
>;
export type ChangeWorkingDaysMutationResult = Apollo.MutationResult<
  ChangeWorkingDaysMutation
>;
export type ChangeWorkingDaysMutationOptions = Apollo.BaseMutationOptions<
  ChangeWorkingDaysMutation,
  ChangeWorkingDaysMutationVariables
>;
export const AddEditPurchaseDocument = gql`
  mutation AddEditPurchase(
    $id: String
    $note_number: String!
    $purchaseKindId: Int!
    $material: String!
    $provider: String!
    $cost: Float!
    $purchase_date: String!
    $statusPurchaseId: Int!
    $paymentModeId: Int!
    $buildingId: String!
    $buildingStatusId: Int!
    $observations: String
    $isEditMode: Boolean
  ) {
    addEditPurchase(
      fields: {
        id: $id
        note_number: $note_number
        purchaseKindId: $purchaseKindId
        material: $material
        provider: $provider
        cost: $cost
        purchase_date: $purchase_date
        statusPurchaseId: $statusPurchaseId
        paymentModeId: $paymentModeId
        buildingId: $buildingId
        buildingStatusId: $buildingStatusId
        observations: $observations
      }
      isEditMode: $isEditMode
    ) {
      purchase {
        ...PurchaseSnippet
        observations
        status_purchase {
          id
          status
        }
        purchase_kind {
          id
          kind
        }
        payment_mode {
          id
          payment
        }
      }
      errors {
        field
        error
      }
    }
  }
  ${PurchaseSnippetFragmentDoc}
`;
export type AddEditPurchaseMutationFn = Apollo.MutationFunction<
  AddEditPurchaseMutation,
  AddEditPurchaseMutationVariables
>;

/**
 * __useAddEditPurchaseMutation__
 *
 * To run a mutation, you first call `useAddEditPurchaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEditPurchaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEditPurchaseMutation, { data, loading, error }] = useAddEditPurchaseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      note_number: // value for 'note_number'
 *      purchaseKindId: // value for 'purchaseKindId'
 *      material: // value for 'material'
 *      provider: // value for 'provider'
 *      cost: // value for 'cost'
 *      purchase_date: // value for 'purchase_date'
 *      statusPurchaseId: // value for 'statusPurchaseId'
 *      paymentModeId: // value for 'paymentModeId'
 *      buildingId: // value for 'buildingId'
 *      buildingStatusId: // value for 'buildingStatusId'
 *      observations: // value for 'observations'
 *      isEditMode: // value for 'isEditMode'
 *   },
 * });
 */
export function useAddEditPurchaseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddEditPurchaseMutation,
    AddEditPurchaseMutationVariables
  >
) {
  return Apollo.useMutation<
    AddEditPurchaseMutation,
    AddEditPurchaseMutationVariables
  >(AddEditPurchaseDocument, baseOptions);
}
export type AddEditPurchaseMutationHookResult = ReturnType<
  typeof useAddEditPurchaseMutation
>;
export type AddEditPurchaseMutationResult = Apollo.MutationResult<
  AddEditPurchaseMutation
>;
export type AddEditPurchaseMutationOptions = Apollo.BaseMutationOptions<
  AddEditPurchaseMutation,
  AddEditPurchaseMutationVariables
>;
export const BuildingsDocument = gql`
  query Buildings {
    buildings {
      ...BuildingSnippet
    }
  }
  ${BuildingSnippetFragmentDoc}
`;

/**
 * __useBuildingsQuery__
 *
 * To run a query within a React component, call `useBuildingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuildingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuildingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBuildingsQuery(
  baseOptions?: Apollo.QueryHookOptions<BuildingsQuery, BuildingsQueryVariables>
) {
  return Apollo.useQuery<BuildingsQuery, BuildingsQueryVariables>(
    BuildingsDocument,
    baseOptions
  );
}
export function useBuildingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BuildingsQuery,
    BuildingsQueryVariables
  >
) {
  return Apollo.useLazyQuery<BuildingsQuery, BuildingsQueryVariables>(
    BuildingsDocument,
    baseOptions
  );
}
export type BuildingsQueryHookResult = ReturnType<typeof useBuildingsQuery>;
export type BuildingsLazyQueryHookResult = ReturnType<
  typeof useBuildingsLazyQuery
>;
export type BuildingsQueryResult = Apollo.QueryResult<
  BuildingsQuery,
  BuildingsQueryVariables
>;
export const HelloDocument = gql`
  query hello {
    hello
  }
`;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(
  baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  return Apollo.useQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    baseOptions
  );
}
export function useHelloLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    baseOptions
  );
}
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<
  HelloQuery,
  HelloQueryVariables
>;
export const JobDocument = gql`
  query Job($id: String!) {
    getJob(jobId: $id) {
      id
      salary
      job
      nomina
      cratedAt
      observations
      isActive
      employee {
        id
        name
        heal_plan
        phone
        INE
        address
      }
      building {
        id
        name
      }
    }
  }
`;

/**
 * __useJobQuery__
 *
 * To run a query within a React component, call `useJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJobQuery(
  baseOptions?: Apollo.QueryHookOptions<JobQuery, JobQueryVariables>
) {
  return Apollo.useQuery<JobQuery, JobQueryVariables>(JobDocument, baseOptions);
}
export function useJobLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<JobQuery, JobQueryVariables>
) {
  return Apollo.useLazyQuery<JobQuery, JobQueryVariables>(
    JobDocument,
    baseOptions
  );
}
export type JobQueryHookResult = ReturnType<typeof useJobQuery>;
export type JobLazyQueryHookResult = ReturnType<typeof useJobLazyQuery>;
export type JobQueryResult = Apollo.QueryResult<JobQuery, JobQueryVariables>;
export const GetJobsDocument = gql`
  query getJobs($limit: Int!, $cursor: String) {
    getJobs(limit: $limit, cursor: $cursor) {
      jobs {
        id
        salary
        nomina
        job
        employee {
          id
          name
          heal_plan
        }
        building {
          id
          name
        }
      }
      hasMore
    }
  }
`;

/**
 * __useGetJobsQuery__
 *
 * To run a query within a React component, call `useGetJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetJobsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetJobsQuery, GetJobsQueryVariables>
) {
  return Apollo.useQuery<GetJobsQuery, GetJobsQueryVariables>(
    GetJobsDocument,
    baseOptions
  );
}
export function useGetJobsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetJobsQuery, GetJobsQueryVariables>
) {
  return Apollo.useLazyQuery<GetJobsQuery, GetJobsQueryVariables>(
    GetJobsDocument,
    baseOptions
  );
}
export type GetJobsQueryHookResult = ReturnType<typeof useGetJobsQuery>;
export type GetJobsLazyQueryHookResult = ReturnType<typeof useGetJobsLazyQuery>;
export type GetJobsQueryResult = Apollo.QueryResult<
  GetJobsQuery,
  GetJobsQueryVariables
>;
export const KindsDocument = gql`
  query kinds {
    kinds {
      payment_mode {
        id
        payment
      }
      purchase_kind {
        id
        kind
      }
      status_payment {
        id
        status
      }
      building_status {
        id
        status
      }
      status_purchase {
        id
        status
      }
    }
  }
`;

/**
 * __useKindsQuery__
 *
 * To run a query within a React component, call `useKindsQuery` and pass it any options that fit your needs.
 * When your component renders, `useKindsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKindsQuery({
 *   variables: {
 *   },
 * });
 */
export function useKindsQuery(
  baseOptions?: Apollo.QueryHookOptions<KindsQuery, KindsQueryVariables>
) {
  return Apollo.useQuery<KindsQuery, KindsQueryVariables>(
    KindsDocument,
    baseOptions
  );
}
export function useKindsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<KindsQuery, KindsQueryVariables>
) {
  return Apollo.useLazyQuery<KindsQuery, KindsQueryVariables>(
    KindsDocument,
    baseOptions
  );
}
export type KindsQueryHookResult = ReturnType<typeof useKindsQuery>;
export type KindsLazyQueryHookResult = ReturnType<typeof useKindsLazyQuery>;
export type KindsQueryResult = Apollo.QueryResult<
  KindsQuery,
  KindsQueryVariables
>;
export const PaymentsDocument = gql`
  query payments(
    $buildingId: String!
    $endDate: String!
    $initialDate: String!
  ) {
    getEmployeePayments(
      buildingId: $buildingId
      endDate: $endDate
      initialDate: $initialDate
    ) {
      id
      working_days
      startWeekDate {
        date
      }
      job {
        employee {
          name
        }
        salary
      }
    }
  }
`;

/**
 * __usePaymentsQuery__
 *
 * To run a query within a React component, call `usePaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentsQuery({
 *   variables: {
 *      buildingId: // value for 'buildingId'
 *      endDate: // value for 'endDate'
 *      initialDate: // value for 'initialDate'
 *   },
 * });
 */
export function usePaymentsQuery(
  baseOptions?: Apollo.QueryHookOptions<PaymentsQuery, PaymentsQueryVariables>
) {
  return Apollo.useQuery<PaymentsQuery, PaymentsQueryVariables>(
    PaymentsDocument,
    baseOptions
  );
}
export function usePaymentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PaymentsQuery,
    PaymentsQueryVariables
  >
) {
  return Apollo.useLazyQuery<PaymentsQuery, PaymentsQueryVariables>(
    PaymentsDocument,
    baseOptions
  );
}
export type PaymentsQueryHookResult = ReturnType<typeof usePaymentsQuery>;
export type PaymentsLazyQueryHookResult = ReturnType<
  typeof usePaymentsLazyQuery
>;
export type PaymentsQueryResult = Apollo.QueryResult<
  PaymentsQuery,
  PaymentsQueryVariables
>;
export const PurchaseDocument = gql`
  query purchase($purchaseId: String!) {
    purchase(purchase_id: $purchaseId) {
      id
      note_number
      cost
      purchase_date
      observations
      building {
        id
      }
      material {
        id
        description
        provider {
          id
          name
        }
      }
      status_purchase {
        id
      }
      purchase_kind {
        id
      }
      payment_mode {
        id
      }
      building_status {
        id
      }
    }
  }
`;

/**
 * __usePurchaseQuery__
 *
 * To run a query within a React component, call `usePurchaseQuery` and pass it any options that fit your needs.
 * When your component renders, `usePurchaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePurchaseQuery({
 *   variables: {
 *      purchaseId: // value for 'purchaseId'
 *   },
 * });
 */
export function usePurchaseQuery(
  baseOptions?: Apollo.QueryHookOptions<PurchaseQuery, PurchaseQueryVariables>
) {
  return Apollo.useQuery<PurchaseQuery, PurchaseQueryVariables>(
    PurchaseDocument,
    baseOptions
  );
}
export function usePurchaseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PurchaseQuery,
    PurchaseQueryVariables
  >
) {
  return Apollo.useLazyQuery<PurchaseQuery, PurchaseQueryVariables>(
    PurchaseDocument,
    baseOptions
  );
}
export type PurchaseQueryHookResult = ReturnType<typeof usePurchaseQuery>;
export type PurchaseLazyQueryHookResult = ReturnType<
  typeof usePurchaseLazyQuery
>;
export type PurchaseQueryResult = Apollo.QueryResult<
  PurchaseQuery,
  PurchaseQueryVariables
>;
export const PurchasesDocument = gql`
  query purchases($limit: Int!, $cursor: String!) {
    purchases(limit: $limit, cursor: $cursor) {
      purchases {
        ...PurchaseSnippet
      }
      hasMore
    }
  }
  ${PurchaseSnippetFragmentDoc}
`;

/**
 * __usePurchasesQuery__
 *
 * To run a query within a React component, call `usePurchasesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePurchasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePurchasesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePurchasesQuery(
  baseOptions?: Apollo.QueryHookOptions<PurchasesQuery, PurchasesQueryVariables>
) {
  return Apollo.useQuery<PurchasesQuery, PurchasesQueryVariables>(
    PurchasesDocument,
    baseOptions
  );
}
export function usePurchasesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PurchasesQuery,
    PurchasesQueryVariables
  >
) {
  return Apollo.useLazyQuery<PurchasesQuery, PurchasesQueryVariables>(
    PurchasesDocument,
    baseOptions
  );
}
export type PurchasesQueryHookResult = ReturnType<typeof usePurchasesQuery>;
export type PurchasesLazyQueryHookResult = ReturnType<
  typeof usePurchasesLazyQuery
>;
export type PurchasesQueryResult = Apollo.QueryResult<
  PurchasesQuery,
  PurchasesQueryVariables
>;
export const ReportDocument = gql`
  query report($buildingId: String!, $initialDate: String!, $endDate: String!) {
    generateReport(
      buildingId: $buildingId
      initialDate: $initialDate
      endDate: $endDate
    ) {
      work_force_total
      material_total
      building_total
    }
  }
`;

/**
 * __useReportQuery__
 *
 * To run a query within a React component, call `useReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportQuery({
 *   variables: {
 *      buildingId: // value for 'buildingId'
 *      initialDate: // value for 'initialDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useReportQuery(
  baseOptions?: Apollo.QueryHookOptions<ReportQuery, ReportQueryVariables>
) {
  return Apollo.useQuery<ReportQuery, ReportQueryVariables>(
    ReportDocument,
    baseOptions
  );
}
export function useReportLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ReportQuery, ReportQueryVariables>
) {
  return Apollo.useLazyQuery<ReportQuery, ReportQueryVariables>(
    ReportDocument,
    baseOptions
  );
}
export type ReportQueryHookResult = ReturnType<typeof useReportQuery>;
export type ReportLazyQueryHookResult = ReturnType<typeof useReportLazyQuery>;
export type ReportQueryResult = Apollo.QueryResult<
  ReportQuery,
  ReportQueryVariables
>;
export const MaterialSearchDocument = gql`
  query materialSearch($material: String) {
    materialSearch(material: $material) {
      value
    }
  }
`;

/**
 * __useMaterialSearchQuery__
 *
 * To run a query within a React component, call `useMaterialSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useMaterialSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMaterialSearchQuery({
 *   variables: {
 *      material: // value for 'material'
 *   },
 * });
 */
export function useMaterialSearchQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MaterialSearchQuery,
    MaterialSearchQueryVariables
  >
) {
  return Apollo.useQuery<MaterialSearchQuery, MaterialSearchQueryVariables>(
    MaterialSearchDocument,
    baseOptions
  );
}
export function useMaterialSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MaterialSearchQuery,
    MaterialSearchQueryVariables
  >
) {
  return Apollo.useLazyQuery<MaterialSearchQuery, MaterialSearchQueryVariables>(
    MaterialSearchDocument,
    baseOptions
  );
}
export type MaterialSearchQueryHookResult = ReturnType<
  typeof useMaterialSearchQuery
>;
export type MaterialSearchLazyQueryHookResult = ReturnType<
  typeof useMaterialSearchLazyQuery
>;
export type MaterialSearchQueryResult = Apollo.QueryResult<
  MaterialSearchQuery,
  MaterialSearchQueryVariables
>;
export const ProviderSearchDocument = gql`
  query providerSearch($provider: String) {
    providerSearch(provider: $provider) {
      value
    }
  }
`;

/**
 * __useProviderSearchQuery__
 *
 * To run a query within a React component, call `useProviderSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderSearchQuery({
 *   variables: {
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useProviderSearchQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ProviderSearchQuery,
    ProviderSearchQueryVariables
  >
) {
  return Apollo.useQuery<ProviderSearchQuery, ProviderSearchQueryVariables>(
    ProviderSearchDocument,
    baseOptions
  );
}
export function useProviderSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProviderSearchQuery,
    ProviderSearchQueryVariables
  >
) {
  return Apollo.useLazyQuery<ProviderSearchQuery, ProviderSearchQueryVariables>(
    ProviderSearchDocument,
    baseOptions
  );
}
export type ProviderSearchQueryHookResult = ReturnType<
  typeof useProviderSearchQuery
>;
export type ProviderSearchLazyQueryHookResult = ReturnType<
  typeof useProviderSearchLazyQuery
>;
export type ProviderSearchQueryResult = Apollo.QueryResult<
  ProviderSearchQuery,
  ProviderSearchQueryVariables
>;
