import validator from "validator";
import { FieldError } from "../Types/Error";
import { MaterialInput } from "../Types/purchase";

export const validatePurchase = (
  fields: MaterialInput
): { isValid: boolean; errors: FieldError[] } => {
  let isValid = true;
  const errors = [];

  if (validator.isEmpty(fields.purchaseKindId.toString())) {
    isValid = false;
    errors.push({
      field: "kind",
      error: "Se necesita de un tipo",
    });
  }
  if (validator.isEmpty(fields.material)) {
    isValid = false;
    errors.push({
      field: "material",
      error: "Ingrese un material porfavor.",
    });
  }
  if (validator.isEmpty(fields.note_number)) {
    isValid = false;
    errors.push({
      field: "note_number",
      error: "Número de nota requerido",
    });
  }
  if (validator.isEmpty(fields.paymentModeId.toString())) {
    isValid = false;
    errors.push({
      field: "payment_mode",
      error: "El modo de pago es necesario",
    });
  }
  if (validator.isEmpty(fields.provider)) {
    isValid = false;
    errors.push({
      field: "provider",
      error: "Se necesita de un proveedor",
    });
  }
  if (!validator.toDate(fields.purchase_date)) {
    isValid = false;
    errors.push({
      field: "purchase_date",
      error: "Fecha no valida",
    });
  }

  return { isValid, errors };
};
