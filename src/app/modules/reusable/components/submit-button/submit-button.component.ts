import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitButtonComponent {
  @Input() loading: boolean;
  @Input() disabled: boolean;

  constructor() {}
}
