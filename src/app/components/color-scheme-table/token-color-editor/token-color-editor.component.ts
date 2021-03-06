import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-token-color-editor',
  templateUrl: './token-color-editor.component.html',
  styleUrls: ['./token-color-editor.component.scss']
})
export class TokenColorEditorComponent {
  private readonly modificationStep = 5;
  private inputFocused = false;

  private _color: TinycolorInstance;
  get color(): TinycolorInstance {
    return this._color;
  }
  @Input()
  set color(value: TinycolorInstance) {
    this._color = value;
    this.colorChange.emit(this._color);
    this.updateHexValue();
  }

  @Output() colorChange = new EventEmitter<TinycolorInstance>();

  @Input() backgroundColor: TinycolorInstance;

  hexValue: string;


  editColor() {
  }

  changeColor($event) {
    this.color = tinycolor($event.target.value);
  }

  onInputFocus() {
    this.inputFocused = true;
  }

  onInputBlur() {
    this.inputFocused = false;
    this.updateHexValue();
  }

  private updateHexValue() {
    if (this.inputFocused) {
      return;
    }

    if (this.color.getAlpha() === 1) {
      this.hexValue = this.color.toHexString().toUpperCase();
    } else {
      this.hexValue = this.color.toHex8String().toUpperCase();
    }
  }

}
