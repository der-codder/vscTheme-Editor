import { HttpClientModule } from '@angular/common/http';
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
  MatTooltipModule
} from '@angular/material';

import { AppComponent } from './components/app/app.component';
import { ArrayToString } from './shared/array-to-string.pipe';
import { SharedService } from './services/shared.service';
import { DataService } from './services/data.service';
import { HeaderComponent } from './components/header/header.component';
import { ColorSchemeTableComponent } from './components/color-scheme-table/color-scheme-table.component';
import { ColorEditorComponent } from './components/color-scheme-table/color-editor/color-editor.component';
import { ReadabilityViewComponent } from './components/color-scheme-table/readability-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ArrayToString,
    HeaderComponent,
    ColorSchemeTableComponent,
    ColorEditorComponent,
    ReadabilityViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [
    SharedService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
