import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { IDialogData } from '@core/interfaces';
import { UsersModuleState } from '@modules/users/store/reducers';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnDestroy {
  isProcessing$: Subscription;
  isProcessing: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private store: Store<UsersModuleState>,
    private cdRef: ChangeDetectorRef,
  ) {
    this.isProcessing = false;
    this.isProcessing$ = this.store
      .select(this.data.select)
      .pipe(filter((res) => res !== this.isProcessing))
      .subscribe((res) => {
        this.isProcessing = res;
        this.cdRef.markForCheck();
        if (!res) {
          this.dialogRef.close();
        }
      });
  }

  onAccept(id: string) {
    if (!this.isProcessing) {
      this.data.onAcceptCallback(this.store, id);
    }
  }

  onDecline() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.isProcessing$.unsubscribe();
  }
}
