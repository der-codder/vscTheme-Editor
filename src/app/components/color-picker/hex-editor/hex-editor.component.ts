import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-hex-editor',
  templateUrl: './hex-editor.component.html',
  styleUrls: ['./hex-editor.component.scss']
})
export class HexEditorComponent implements AfterViewInit {
  hsla: ColorFormats.HSLA;
  alphaValue: number;
  viewInitialized = false;
  context: CanvasRenderingContext2D;
  @ViewChild('spectrum') spectrum: ElementRef;

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

    this.updateAlpha();
    this.updateHsla();

    if (this.viewInitialized) {
      this.drawSpectrum();
    }

    this.colorChange.emit(this._color);
  }
  @Output()
  colorChange = new EventEmitter<TinycolorInstance>();

  constructor() { }

  ngAfterViewInit() {
    console.log(this.spectrum);
    this.spectrum.nativeElement.width = this.spectrum.nativeElement.height = 250;
    this.context = this.spectrum.nativeElement.getContext('2d');
    this.drawSpectrum();

    this.viewInitialized = true;
  }

  private drawSpectrum() {
    const spectrum = this.spectrum.nativeElement;

    // White gradient
    const whiteGrd = this.context.createLinearGradient(0, 0, spectrum.width, 0);
    whiteGrd.addColorStop(0.01, 'rgba(255, 255, 255, 1.000)');
    whiteGrd.addColorStop(0.99, 'rgba(255, 255, 255, 0.000)');

    // Black Gradient
    const blackGrd = this.context.createLinearGradient(0, 0, 0, spectrum.height);
    blackGrd.addColorStop(0.01, 'rgba(0, 0, 0, 0.000)');
    blackGrd.addColorStop(0.99, 'rgba(0, 0, 0, 1.000)');

    // Fill with solid
    this.context.fillStyle = 'hsl( ' + this.hsla.h + ', 100%, 50%)';
    this.context.fillRect(0, 0, spectrum.width, spectrum.height);

    // Fill with white
    // Odd bug prevented selecting min, max ranges from all gradients
    this.context.fillStyle = whiteGrd;
    this.context.fillRect(-1, -1, spectrum.width + 2, spectrum.height + 2);

    // Fill with black
    // Odd bug prevented selecting min, max ranges from all gradients
    this.context.fillStyle = blackGrd;
    this.context.fillRect(-1, -1, spectrum.width + 2, spectrum.height + 2);
  }

  private updateAlpha() {
    this.alphaValue = this._color.getAlpha() * 100;
  }

  private updateHsla() {
    const hsla = this._color.toHsl();
    // round hue to integers
    hsla.h = Math.round(hsla.h * 10) / 10;
    hsla.s = Math.round(hsla.s * 100);
    hsla.l = Math.round(hsla.l * 100);

    this.hsla = hsla;
  }

}
