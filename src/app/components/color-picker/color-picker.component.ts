import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  colorValue: string;
  alphaValue: number;
  rgba: ColorFormats.RGBA = { r: 255, g: 255, b: 255, a: 100 };
  hsla: ColorFormats.HSLA;

  private _color: TinycolorInstance;
  get color(): TinycolorInstance {
    return this._color;
  }
  @Input()
  set color(value: TinycolorInstance) {
    if (this._color === value) {
      return;
    }

    this._color = value;

    this.colorValue = this._color.toString();
    this.alphaValue = this._color.getAlpha() * 100;
    this.rgba = this._color.toRgb();
    this.colorChange.emit(this._color);
  }
  @Output()
  colorChange = new EventEmitter<TinycolorInstance>();

  constructor() { }

  ngOnInit() {
  }

  redChanged(value) {
    this.color = tinycolor({ r: value, g: this.rgba.g, b: this.rgba.b, a: this.rgba.a });
  }

  greenChanged(value) {
    this.color = tinycolor({ r: this.rgba.r, g: value, b: this.rgba.b, a: this.rgba.a });
  }

  blueChanged(value) {
    this.color = tinycolor({ r: this.rgba.r, g: this.rgba.g, b: value, a: this.rgba.a });
  }

  alphaChanged(value) {
    console.log(value / 100);
    this.color = tinycolor({ r: this.rgba.r, g: this.rgba.g, b: this.rgba.b, a: value / 100 });
  }

}
