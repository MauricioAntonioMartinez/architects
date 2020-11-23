import validator from "validator";
import { Building } from "../entities";
import { UsernamePasswordInput } from "../Types/Auth";
import { JobInput } from "../Types/Job";
import { BuildingInput } from "./../Types/building";
import { EmployeeInput } from "./../Types/Employee";

export const validateRegister = (fields: UsernamePasswordInput) => {
  let isValid = true;
  const errors = [];
  if (!validator.isEmail(fields.email)) {
    isValid = false;
    errors.push({
      field: "email",
      error: "Not an email",
    });
  }

  if (!validator.isLength(fields.password, { min: 5 })) {
    isValid = false;
    errors.push({
      field: "password",
      error: "Invalid password",
    });
  }

  return { isValid, errors };
};

export const validationEmployee = (fields: EmployeeInput) => {
  let isValid = true;
  const errors = [];
  if (!validator.isLength(fields.name, { min: 5 })) {
    isValid = false;
    errors.push({
      field: "name",
      error: "Nombre muy corto",
    });
  }

  if (!validator.isMobilePhone(fields.phone)) {
    isValid = false;
    errors.push({
      field: "phone",
      error: "Teléfono no valido",
    });
  }

  if (!validator.isLength(fields.heal_plan, { min: 9 })) {
    isValid = false;
    errors.push({
      field: "heal_plan",
      error: "Seguro no valido",
    });
  }

  if (validator.isEmpty(fields.address)) {
    isValid = false;
    errors.push({
      field: "address",
      error: "Campo requerido",
    });
  }

  if (!validator.isLength(fields.INE, { min: 10 })) {
    isValid = false;
    errors.push({
      field: "INE",
      error: "INE requerido",
    });
  }

  return { isValid, errors };
};

export const validateBuilding = (fields: BuildingInput) => {
  let isValid = true;
  const errors = [];
  if (!validator.isLength(fields.name, { min: 8 })) {
    isValid = false;
    errors.push({
      field: "name",
      error: "Nombre muy corto",
    });
  }

  if (validator.isEmpty(fields.status)) {
    isValid = false;
    errors.push({
      field: "status",
      error: "Selecciona un estado",
    });
  }

  if (!validator.toDate(fields.date)) {
    isValid = false;
    errors.push({
      field: "date",
      error: "Ingrese una fecha valida",
    });
  }

  return { isValid, errors };
};

export const validateJob = async (fields: JobInput) => {
  let isValid = true;
  const errors = [];
  const bld = await Building.findOne(fields.building);

  if (!bld) {
    isValid = false;
    errors.push({
      error: "Obra no encontrada",
      field: "building",
    });
  }

  if (!validator.isFloat(fields.salary.toString(), { min: 1.0 })) {
    isValid = false;
    errors.push({
      error: "Salario Invalido",
      field: "salary",
    });
  }

  if (validator.isEmpty(fields.job.trim())) {
    isValid = false;
    errors.push({
      error: "Campo requerido",
      field: "job",
    });
  }
  if (validator.isEmpty(fields.nomina.trim())) {
    isValid = false;
    errors.push({
      error: "Campo requerido",
      field: "nomina",
    });
  }

  return {
    isValid,
    errors,
  };
};
