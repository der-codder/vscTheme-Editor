import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatCheckboxModule, MatSliderModule, MatTabsModule } from '@angular/material';
import 'hammerjs';
import * as tinycolor from 'tinycolor2';

import { TokenEditorComponent } from './token-editor.component';
import { TokenColor } from 'src/app/models/token-color';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { HexEditorComponent } from '../color-picker/hex-editor/hex-editor.component';

describe('TokenEditorComponent', () => {
  let component: TokenEditorComponent;
  let fixture: ComponentFixture<TokenEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatInputModule,
        MatSliderModule,
        MatTabsModule,
        MatCheckboxModule
      ],
      declarations: [
        TokenEditorComponent,
        ColorPickerComponent,
        HexEditorComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenEditorComponent);
    component = fixture.componentInstance;
    component.token = new TokenColor(
      tinycolor({ r: 0, g: 0, b: 0 }),
      tinycolor({ r: 255, g: 255, b: 255 })
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
