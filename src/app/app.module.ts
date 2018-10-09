import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatSortModule,
  MatIconModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';

import { AppComponent } from './components/app/app.component';
import { ArrayToString } from './shared/array-to-string.pipe';
import { SharedService } from './services/shared.service';
import { DataService } from './services/data.service';
import { HeaderComponent } from './components/header/header.component';
import { ColorSchemeTableComponent } from './components/color-scheme-table/color-scheme-table.component';
import { TokenEditorComponent } from './components/token-editor/token-editor.component';
import { TokenColorEditorComponent } from './components/color-scheme-table/token-color-editor/token-color-editor.component';
import { ReadabilityViewComponent } from './components/color-scheme-table/readability-view.component';
import { EditTokenColorDialogComponent } from './components/color-scheme-table/edit-token-color-dialog/edit-token-color-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ArrayToString,
    HeaderComponent,
    ColorSchemeTableComponent,
    TokenColorEditorComponent,
    ReadabilityViewComponent,
    EditTokenColorDialogComponent,
    TokenEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [
    SharedService,
    DataService
  ],
  entryComponents: [EditTokenColorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
