import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';

import { AppFormControl } from './app-form-control';

export class AppFormGroup extends FormGroup {
  constructor(
    controls: {
      [key: string]: AbstractControl;
    },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  get(path: Array<string | number> | string): AbstractControl | AppFormControl | null {
    return super.get(path);
  }

  get ableToSend() {
    return this.disabled || this.invalid;
  }
}
