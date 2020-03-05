import { AbstractControl, ValidatorFn } from '@angular/forms';

export function equalityValidator(password: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const equal = password.value === control.value;
    return !equal ? { equal: true } : null;
  };
}
