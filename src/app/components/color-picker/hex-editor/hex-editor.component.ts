import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as tinycolor from 'tinycolor2';

import { Point } from './pick-color.directive';

@Component({
  selector: 'app-hex-editor',
  templateUrl: './hex-editor.component.html',
  styleUrls: ['./hex-editor.component.scss']
})
export class HexEditorComponent implements AfterViewInit {
  private hsla: ColorFormats.HSLA;
  private alphaValue: number;
  private viewInitialized = false;
  private preventUpdateSpectrum = false;
  private spectrumContext: CanvasRenderingContext2D;

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
    this.updateSpectrum();

    this.colorChange.emit(this._color);
  }
  @Output()
  colorChange = new EventEmitter<TinycolorInstance>();

  @ViewChild('spectrum') spectrum: ElementRef;
  @ViewChild('spectrumMarker') spectrumMarker: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    this.spectrum.nativeElement.width = this.spectrum.nativeElement.height = 255;
    this.spectrumContext = this.spectrum.nativeElement.getContext('2d');
    this.viewInitialized = true;

    this.updateSpectrum();
  }

  onSpectrumColorPicked($event: Point) {
    this.preventUpdateSpectrum = true;

    const imageData = this.getImageData($event.x, $event.y);
    this.color = tinycolor({ r: imageData[0], g: imageData[1], b: imageData[2], a: imageData[3] });
    this.updateMarkerPosition($event.x, $event.y);

    this.preventUpdateSpectrum = false;
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

  private updateSpectrum() {
    if (this.viewInitialized && !this.preventUpdateSpectrum) {
      this.drawSpectrum();

      const hsv = this.color.toHsv();
      const spectrum = this.spectrum.nativeElement;
      const posX = spectrum.width * hsv.s;
      const posY = spectrum.height - (spectrum.height * hsv.v);
      this.updateMarkerPosition(posX, posY);
    }
  }

  private updateMarkerPosition(x: number, y: number) {
    const xOffset = -1 * this.spectrumMarker.nativeElement.offsetWidth / 2;
    const yOffset = -1 * this.spectrumMarker.nativeElement.offsetHeight / 2;
    let xAdjusted, xFinal, yAdjusted, yFinal;

    if (y === undefined) {
      yAdjusted = x + yOffset;
      yFinal = Math.round(Math.max(Math.min(this.spectrum.nativeElement.height - 1 + yOffset, yAdjusted), yOffset));

      xFinal = 0;
    } else {
      xAdjusted = x + xOffset;
      yAdjusted = y + yOffset;

      xFinal = Math.floor(Math.max(Math.min(this.spectrum.nativeElement.height + xOffset, xAdjusted), xOffset));
      yFinal = Math.floor(Math.max(Math.min(this.spectrum.nativeElement.height + yOffset, yAdjusted), yOffset));
    }

    this.spectrumMarker.nativeElement.style.left = xFinal + 'px';
    this.spectrumMarker.nativeElement.style.top = yFinal + 'px';
  }

  private getImageData(x: number, y: number): Uint8ClampedArray {
    const spectrum = this.spectrum.nativeElement;

    x = Math.max(0, Math.min( x, spectrum.width - 1));
    y = Math.max(0, Math.min( y, spectrum.height - 1));

    return this.spectrumContext.getImageData( x, y, 1, 1 ).data;
  }

  private drawSpectrum() {
    const spectrum = this.spectrum.nativeElement;

    // White gradient
    const whiteGrd = this.spectrumContext.createLinearGradient(0, 0, spectrum.width, 0);
    whiteGrd.addColorStop(0.01, 'rgba(255, 255, 255, 1.000)');
    whiteGrd.addColorStop(0.99, 'rgba(255, 255, 255, 0.000)');

    // Black Gradient
    const blackGrd = this.spectrumContext.createLinearGradient(0, 0, 0, spectrum.height);
    blackGrd.addColorStop(0.01, 'rgba(0, 0, 0, 0.000)');
    blackGrd.addColorStop(0.99, 'rgba(0, 0, 0, 1.000)');

    // Fill with solid
    this.spectrumContext.fillStyle = 'hsl( ' + this.hsla.h + ', 100%, 50%)';
    this.spectrumContext.fillRect(0, 0, spectrum.width, spectrum.height);

    // Fill with white
    // Odd bug prevented selecting min, max ranges from all gradients
    this.spectrumContext.fillStyle = whiteGrd;
    this.spectrumContext.fillRect(-1, -1, spectrum.width + 2, spectrum.height + 2);

    // Fill with black
    // Odd bug prevented selecting min, max ranges from all gradients
    this.spectrumContext.fillStyle = blackGrd;
    this.spectrumContext.fillRect(-1, -1, spectrum.width + 2, spectrum.height + 2);
  }

}
