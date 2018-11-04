import * as tinycolor from 'tinycolor2';

export class TokenColor {
  private _readability: number;
  private _modifiedColor: TinycolorInstance;

  /**
   * Description of the rule.
   */
  name: string;

  /**
   * Scope selector against which this rule matches.
   */
  scope: string | string[];

  /**
   * Returns description of the rule.
   */
  get scopeName(): string {
    if (!this.name && !this.scope) {
      return '';
    } else if (this.name) {
      return this.name;
    } else if (this.scope instanceof Array) {
      return this.scope[0];
    } else {
      return this.scope;
    }
  }

  /**
   * Font style of the rule: bold.
   */
  public isBold: Boolean;

  /**
   * Font style of the rule: italic.
   */
  public isItalic: Boolean;

  /**
   * Font style of the rule: underline.
   */
  public isUnderline: Boolean;

  /**
   * Color of the token.
   */
  get color(): TinycolorInstance {
    return this.isModified ? this._modifiedColor : this._defaultColor;
  }
  set color(value: TinycolorInstance) {
    if (this.isColorsEquals(this._modifiedColor, value)) {
      return;
    }

    this._modifiedColor = value.clone();
    this._readability = tinycolor.readability(this.backgroundColor, this.color);
  }

  /**
   * Returns the background color of the color scheme.
   */
  get backgroundColor(): TinycolorInstance {
    return this._backgroundColor;
  }

  /**
   * Indicates that color value was changed.
   */
  get isModified(): boolean {
    return !this.isColorsEquals(this._modifiedColor, this._defaultColor);
  }

  /**
   * Returns the color contrast between color and backgroundColor defined by (WCAG Version 2).
   */
  get readability(): number {
    return this._readability;
  }

  constructor(
    private _backgroundColor: TinycolorInstance,
    private _defaultColor: TinycolorInstance
  ) {
    this._modifiedColor = _defaultColor.clone();
    this._readability = tinycolor.readability(this.backgroundColor, this.color);
  }

  /**
   * Gets a new instance that object.
   */
  clone(): TokenColor {
    const objCopy = new TokenColor(tinycolor('#000000'), tinycolor('#000000'));

    objCopy._modifiedColor = this._modifiedColor.clone();
    objCopy._backgroundColor = this._backgroundColor.clone();
    objCopy._defaultColor = this._defaultColor.clone();
    objCopy._readability = this._readability;
    objCopy.name = this.name;
    objCopy.scope = this.scope;
    objCopy.isBold = this.isBold;
    objCopy.isItalic = this.isItalic;
    objCopy.isUnderline = this.isUnderline;

    return objCopy;
  }

  private isColorsEquals(color1: TinycolorInstance, color2: TinycolorInstance): boolean {
    return color1.toHex() === color2.toHex();
  }
}
