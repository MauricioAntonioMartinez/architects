import { FieldError } from "../generated/graphql";

export const convertErrorsResponse = (errors: FieldError[]) =>
  errors.map((err) => {
    return {
      errors: [err.error],
      name: err.field,
    };
  });
