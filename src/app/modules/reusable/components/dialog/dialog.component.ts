import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { IDeleteDialogData } from '@core/interfaces';
import { deleteUser } from '@modules/users/store/actions';
import { UsersModuleState } from '@modules/users/store/reducers';
import { selectDeletingUser } from '@modules/users/store/selectors';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnDestroy {
  isDeleting$: Subscription;
  isDeleting: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteDialogData,
    private store: Store<UsersModuleState>,
    private cdRef: ChangeDetectorRef,
  ) {
    this.isDeleting = false;
    this.isDeleting$ = this.store
      .select(selectDeletingUser)
      .pipe(filter((res) => res !== this.isDeleting))
      .subscribe((res) => {
        this.isDeleting = res;
        this.cdRef.markForCheck();
        if (!res) {
          this.dialogRef.close();
        }
      });
  }

  onAccept(id: string) {
    if (!this.isDeleting) {
      this.store.dispatch(deleteUser({ userId: id, isCurrent: this.data.isCurrent }));
    }
  }

  onDecline() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.isDeleting$.unsubscribe();
  }
}
