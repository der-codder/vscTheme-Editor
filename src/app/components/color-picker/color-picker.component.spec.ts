import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatSliderModule, MatInputModule } from '@angular/material';
import 'hammerjs';

import * as tinycolor from 'tinycolor2';

import { ColorPickerComponent } from './color-picker.component';
import { HexEditorComponent } from './hex-editor/hex-editor.component';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatInputModule,
        MatSliderModule,
        MatTabsModule
      ],
      declarations: [
        ColorPickerComponent,
        HexEditorComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    component.color = tinycolor({ r: 0, g: 0, b: 0 });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
