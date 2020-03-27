import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { themeEnum } from '@shared/enum/theme.enum';
import { DataSharingService } from '@shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private darkMode: boolean;

  constructor(private dataSharingService: DataSharingService, private cdRef: ChangeDetectorRef) {
    this.darkMode = false;
    this.dataSharingService
      .getTheme()
      .pipe(map((res) => res === themeEnum.dark))
      .subscribe(
        (res) => {
          this.darkMode = res;
          this.cdRef.markForCheck();
        },
        (error) => throwError(error),
      );
  }
}
