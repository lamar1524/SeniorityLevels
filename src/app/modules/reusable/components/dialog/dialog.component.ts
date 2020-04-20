import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { IDeleteDialogData } from '@core/interfaces';
import { deleteUser } from '@modules/users/store/actions';
import { UsersModuleState } from '@modules/users/store/reducers';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteDialogData,
    private store: Store<UsersModuleState>,
  ) {}

  ngOnInit(): void {}

  onAccept(id: string) {
    this.store.dispatch(deleteUser({ userId: id }));
  }

  onDecline() {
    this.dialogRef.close();
  }
}
