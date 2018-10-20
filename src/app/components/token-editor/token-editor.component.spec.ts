import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import * as tinycolor from 'tinycolor2';

import { TokenEditorComponent } from './token-editor.component';
import { TokenColor } from 'src/app/models/token-color';

describe('TokenEditorComponent', () => {
  let component: TokenEditorComponent;
  let fixture: ComponentFixture<TokenEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule
      ],
      declarations: [ TokenEditorComponent ]
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
