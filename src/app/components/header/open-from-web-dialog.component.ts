import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-open-from-web-dialog',
  template: `
    <h1 mat-dialog-title>Open a color scheme from somewhere on the web</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput type="url" placeholder="URL of the color scheme" [formControl]="urlFormControl" required/>
        <mat-error *ngIf="urlFormControl.invalid">{{getErrorMessage()}}</mat-error>
      </mat-form-field>
    </div>
    <div mat-dialog-actions align="end" >
      <button mat-button [mat-dialog-close]="urlFormControl.value" [disabled]="urlFormControl.invalid">Ok</button>
      <button mat-button (click)="onCancelClicked()" cdkFocusInitial>Cancel</button>
    </div>
  `,
  styles: [`
    mat-form-field { width: 100%; }
  `]
})
export class OpenFromWebDialogComponent {
  urlFormControl = new FormControl(
    'https://raw.githubusercontent.com/Binaryify/OneDark-Pro/master/themes/OneDark-Pro.json',
    [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]
  );

  constructor(
    public dialogRef: MatDialogRef<HeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public url: string
  ) { }

  getErrorMessage() {
    return this.urlFormControl.hasError('required')
      ? 'You must enter a URL'
      : this.urlFormControl.hasError('pattern')
        ? 'Not a valid URL'
        : '';
  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}
