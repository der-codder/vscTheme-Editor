import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import * as tinycolor from 'tinycolor2';

import { Point } from './pick-color.directive';

@Component({
  selector: 'app-hex-editor',
  templateUrl: './hex-editor.component.html',
  styleUrls: ['./hex-editor.component.scss']
})
export class HexEditorComponent implements AfterViewInit {
  private hsla: ColorFormats.HSLA;
  private viewInitialized = false;
  private preventUpdate = false;

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

    this.updateHsla();

    if (this.viewInitialized && !this.preventUpdate) {
      this.updateSpectrum();
      this.updateHue();
      this.updateAlpha();
    }

    this.colorChange.emit(this._color);
  }
  @Output() colorChange = new EventEmitter<TinycolorInstance>();

  @ViewChild('spectrum') spectrum: ElementRef;
  @ViewChild('spectrumMarker') spectrumMarker: ElementRef;
  @ViewChild('hue') hue: ElementRef;
  @ViewChild('hueMarker') hueMarker: ElementRef;
  @ViewChild('alpha') alpha: ElementRef;
  @ViewChild('alphaMarker') alphaMarker: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    this.spectrum.nativeElement.width = this.spectrum.nativeElement.height = 255;
    this.hue.nativeElement.height = this.alpha.nativeElement.height = 255;
    this.hue.nativeElement.width = this.alpha.nativeElement.width = 30;
    this.viewInitialized = true;

    this.updateSpectrum();

    this.drawHue();
    this.updateHue();

    this.updateAlpha();
  }

  onSpectrumColorPicked($event: Point) {
    this.preventUpdate = true;

    this.updateMarkerPosition(
      this.spectrumMarker.nativeElement,
      this.spectrum.nativeElement,
      $event.x,
      $event.y
    );

    const imageData = this.getImageData(this.spectrum.nativeElement, $event.x, $event.y);
    this.color = tinycolor({ r: imageData[0], g: imageData[1], b: imageData[2] });

    this.drawAlpha();

    this.preventUpdate = false;
  }

  onHueColorPicked($event: Point) {
    this.preventUpdate = true;

    this.updateMarkerPosition(
      this.hueMarker.nativeElement,
      this.hue.nativeElement,
      $event.y
    );

    const imageData = this.getImageData(this.hue.nativeElement, 0, $event.y);
    const hue = tinycolor({ r: imageData[0], g: imageData[1], b: imageData[2] }).toHsl().h;
    this.color = tinycolor({ h: hue, s: this.hsla.s, l: this.hsla.l, a: this.hsla.a });
    this.drawSpectrum();
    this.drawAlpha();

    this.preventUpdate = false;
  }

  onAlphaColorPicked($event: Point) {
    this.preventUpdate = true;

    this.updateMarkerPosition(
      this.alphaMarker.nativeElement,
      this.alpha.nativeElement,
      $event.y
    );

    const alphaHeight = this.alpha.nativeElement.height;
    const alpha = (alphaHeight - $event.y) / alphaHeight;
    this.color = tinycolor({ h: this.hsla.h, s: this.hsla.s, l: this.hsla.l, a: alpha });

    this.preventUpdate = false;
  }

  private updateSpectrum() {
    this.drawSpectrum();

    const hsv = this.color.toHsv();
    const spectrumCanvas = this.spectrum.nativeElement;
    const posX = spectrumCanvas.width * hsv.s;
    const posY = spectrumCanvas.height - (spectrumCanvas.height * hsv.v);
    this.updateMarkerPosition(
      this.spectrumMarker.nativeElement,
      spectrumCanvas,
      posX,
      posY
    );
  }

  private drawSpectrum() {
    const spectrumCanvas = this.spectrum.nativeElement;
    const spectrumContext = this.spectrum.nativeElement.getContext('2d');

    spectrumContext.clearRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);

    // White gradient
    const whiteGrd = spectrumContext.createLinearGradient(0, 0, spectrumCanvas.width, 0);
    whiteGrd.addColorStop(0.01, 'rgba(255, 255, 255, 1.000)');
    whiteGrd.addColorStop(0.99, 'rgba(255, 255, 255, 0.000)');

    // Black Gradient
    const blackGrd = spectrumContext.createLinearGradient(0, 0, 0, spectrumCanvas.height);
    blackGrd.addColorStop(0.01, 'rgba(0, 0, 0, 0.000)');
    blackGrd.addColorStop(0.99, 'rgba(0, 0, 0, 1.000)');

    // Fill with solid
    spectrumContext.fillStyle = 'hsl( ' + this.hsla.h + ', 100%, 50%)';
    spectrumContext.fillRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);

    // Fill with white
    // Odd bug prevented selecting min, max ranges from all gradients
    spectrumContext.fillStyle = whiteGrd;
    spectrumContext.fillRect(-1, -1, spectrumCanvas.width + 2, spectrumCanvas.height + 2);

    // Fill with black
    // Odd bug prevented selecting min, max ranges from all gradients
    spectrumContext.fillStyle = blackGrd;
    spectrumContext.fillRect(-1, -1, spectrumCanvas.width + 2, spectrumCanvas.height + 2);
  }

  private updateHue() {
    const hueHeight = this.hue.nativeElement.height;
    this.updateMarkerPosition(
      this.hueMarker.nativeElement,
      this.hue.nativeElement,
      hueHeight - (hueHeight * (this.hsla.h / 360))
    );
  }

  private drawHue() {
    const hueCanvas = this.hue.nativeElement;
    const hueContext = this.hue.nativeElement.getContext('2d');

    hueContext.clearRect(0, 0, hueCanvas.width, hueCanvas.height);

    // Create gradient
    const hueGrd = hueContext.createLinearGradient(0, 0, 0, hueCanvas.height);

    // Add colors
    hueGrd.addColorStop(0.01, 'rgba(255, 0, 0, 1.000)');
    hueGrd.addColorStop(0.167, 'rgba(255, 0, 255, 1.000)');
    hueGrd.addColorStop(0.333, 'rgba(0, 0, 255, 1.000)');
    hueGrd.addColorStop(0.500, 'rgba(0, 255, 255, 1.000)');
    hueGrd.addColorStop(0.666, 'rgba(0, 255, 0, 1.000)');
    hueGrd.addColorStop(0.833, 'rgba(255, 255, 0, 1.000)');
    hueGrd.addColorStop(0.999, 'rgba(255, 0, 0, 1.000)');

    // Fill with gradient
    hueContext.fillStyle = hueGrd;
    hueContext.fillRect(0, 0, hueCanvas.width, hueCanvas.height);
  }

  private updateAlpha() {
    this.drawAlpha();

    const alphaHeight = this.alpha.nativeElement.height;
    this.updateMarkerPosition(
      this.alphaMarker.nativeElement,
      this.alpha.nativeElement,
      alphaHeight - (this.hsla.a * alphaHeight)
    );
  }

  private drawAlpha() {
    const alphaCanvas = this.alpha.nativeElement;
    const alphaContext = this.alpha.nativeElement.getContext('2d');
    const currentColor = this.color.toRgb();

    alphaContext.clearRect(0, 0, alphaCanvas.width, alphaCanvas.height);

    // Create gradient
    const hueGrd = alphaContext.createLinearGradient(10, 0.000, 10, alphaCanvas.height);

    // Add colors
    hueGrd.addColorStop(0.01, `rgba(${currentColor.r},${currentColor.g},${currentColor.b},1`);
    hueGrd.addColorStop(0.99, `rgba(${currentColor.r},${currentColor.g},${currentColor.b},0`);

    // Fill with gradient
    alphaContext.fillStyle = hueGrd;
    alphaContext.fillRect(-1, -1, alphaCanvas.width + 2, alphaCanvas.height + 2);
  }

  private updateMarkerPosition(
    marker: HTMLElement,
    canvas: HTMLCanvasElement,
    x: number,
    y?: number
  ) {
    const xOffset = -1 * marker.offsetWidth / 2;
    const yOffset = -1 * marker.offsetHeight / 2;
    let xAdjusted, xFinal, yAdjusted, yFinal;

    if (y === undefined) {
      yAdjusted = x + yOffset;
      yFinal = Math.round(Math.max(Math.min(canvas.height - 1 + yOffset, yAdjusted), yOffset));

      xFinal = 0;
    } else {
      xAdjusted = x + xOffset;
      yAdjusted = y + yOffset;

      xFinal = Math.floor(Math.max(Math.min(canvas.height + xOffset, xAdjusted), xOffset));
      yFinal = Math.floor(Math.max(Math.min(canvas.height + yOffset, yAdjusted), yOffset));
    }

    marker.style.left = xFinal + 'px';
    marker.style.top = yFinal + 'px';
  }

  private getImageData(canvas: HTMLCanvasElement, x: number, y: number): Uint8ClampedArray {
    const canvasContext = canvas.getContext('2d');

    x = Math.max(0, Math.min(x, canvas.width - 1));
    y = Math.max(0, Math.min(y, canvas.height - 1));

    return canvasContext.getImageData( x, y, 1, 1 ).data;
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
