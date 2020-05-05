import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

import { IComment } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private db: AngularFireDatabase) {}

  addComment(userId: string, catTitle: string, subCatTitle: string, comment: IComment, level: string) {
    return from(this.db.database.ref(`comments/${userId}/${catTitle}/${subCatTitle}/${level}`).push(comment));
  }

  getCommentsByData(userId: string, catTitle: string, subCatTitle: string, level: string) {
    return from(this.db.database.ref(`comments/${userId}/${catTitle}/${subCatTitle}/${level}`).once('value')).pipe(
      map((element) => {
        return element.val() === null ? [] : (Object.entries(element.val()) as [string, IComment][]);
      }),
    );
  }

  editComment(commentId: string, content: string, userId: string, catTitle: string, subCatTitle: string, level: string) {
    return from(this.db.database.ref(`comments/${userId}/${catTitle}/${subCatTitle}/${level}/${commentId}`).update({ content }));
  }

  deleteComment(commentId: string, userId: string, catTitle: string, subCatTitle: string, level: string) {
    return from(this.db.database.ref(`comments/${userId}/${catTitle}/${subCatTitle}/${level}/${commentId}`).remove());
  }
}
