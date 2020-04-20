import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';

import { AppFormControl } from './app-form-control';

export class AppFormGroup extends FormGroup {
  constructor(
    controls: {
      [key: string]: AppFormControl;
    },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  get(path: Array<string | number> | string): AppFormControl | null {
    return super.get(path) as AppFormControl;
  }

  get ableToSend(): boolean {
    return this.disabled || this.invalid;
  }
}
