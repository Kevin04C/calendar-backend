import { isValid } from "date-fns";

export const validDate = (value) => {
  if (!value) return false;

  if (!isValid(value)) return false;
  
  return true;
};
