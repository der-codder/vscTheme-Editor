import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatToolbarModule,
  MatInputModule,
  MatTableModule,
  MatCheckboxModule,
  MatButtonModule,
  MatSortModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
  MatSliderModule,
  MatTabsModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../header/header.component';
import { ColorSchemeTableComponent } from '../color-scheme-table/color-scheme-table.component';
import { ReadabilityViewComponent } from '../color-scheme-table/readability-view.component';
import { TokenColorEditorComponent } from '../color-scheme-table/token-color-editor/token-color-editor.component';
import { ArrayToString } from 'src/app/shared/array-to-string.pipe';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        NoopAnimationsModule,
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
        MatDialogModule,
        MatSliderModule,
        MatTabsModule
      ],
      declarations: [
        ArrayToString,
        AppComponent,
        HeaderComponent,
        ColorSchemeTableComponent,
        ReadabilityViewComponent,
        TokenColorEditorComponent
      ],
      providers: [
        { provide: DataService, useClass: DataService },
        { provide: SharedService, useClass: SharedService }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have a title 'VscThemeEditor'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('VscThemeEditor');
  }));
});
