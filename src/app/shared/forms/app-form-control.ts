import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';

export class AppFormControl extends FormControl {
  constructor(
    formState?: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(formState, validatorOrOpts, asyncValidator);
  }

  get invalidControl(): boolean {
    return this.invalid && (this.dirty || this.touched);
  }
}
