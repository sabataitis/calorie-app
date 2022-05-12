import {FormGroup} from "@angular/forms";

export function getInputErrorClasses(field: string, form: FormGroup): Record<string, boolean>{
  const errorsAndTouched = form.get(field).errors && form.get(field).touched;

  return {
    'border-secondary-200': !errorsAndTouched,
    'border-red-300': errorsAndTouched
  }

}
