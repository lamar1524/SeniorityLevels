import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from } from 'rxjs';

import { IComment } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private db: AngularFireDatabase) {}

  addComment(userId: string, catTitle: string, subCatTitle: string, comment: IComment) {
    return from(this.db.database.ref(`users/${userId}/comments/${catTitle}/${subCatTitle}`).push(comment));
  }
}
