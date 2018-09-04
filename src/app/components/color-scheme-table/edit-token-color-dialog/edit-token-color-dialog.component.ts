import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TokenColor } from '../../../models/token-color';

export interface DialogData {
  originalTokenColor: TokenColor;
}

@Component({
  selector: 'app-edit-token-color-dialog',
  templateUrl: './edit-token-color-dialog.component.html',
  styleUrls: ['./edit-token-color-dialog.component.css']
})
export class EditTokenColorDialogComponent implements OnInit {
  editableToken: TokenColor;

  constructor(
    public dialogRef: MatDialogRef<EditTokenColorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.editableToken = data.originalTokenColor.clone();
    }

  ngOnInit() {
  }

  onOk() {
    this.data.originalTokenColor.name = this.editableToken.name;

    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }

}
