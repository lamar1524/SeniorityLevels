import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';

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
  getValidityOfField(controlName: string) {
    const control = this.get(controlName);
    return control.invalid && (control.dirty || control.touched);
  }
}
