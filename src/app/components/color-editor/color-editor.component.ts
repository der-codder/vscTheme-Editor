import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-color-editor',
  templateUrl: './color-editor.component.html',
  styleUrls: ['./color-editor.component.css']
})
export class ColorEditorComponent implements OnInit {
  colorHeader: string;
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

    this.colorHeader = this._color.toString();
    this.rgba = this._color.toRgb();
    this.colorChange.emit(this._color);
  }
  @Output()
  colorChange = new EventEmitter<TinycolorInstance>();

  constructor() { }

  ngOnInit() {
  }

  valueChanged(value) {
    console.log('input');
    console.log(value);
    this.color = tinycolor({ r: value, g: this.rgba.g, b: this.rgba.b, a: this.rgba.a });
  }

  redChanged(value) {
    console.log('slider');
    console.log(value);
    this.color = tinycolor({ r: value, g: this.rgba.g, b: this.rgba.b, a: this.rgba.a });
  }

}
