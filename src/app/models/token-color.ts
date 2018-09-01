import * as tinycolor from 'tinycolor2';

export class TokenColor {
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

  private _color: TinycolorInstance;
  /**
   * Color of the token.
   */
  get color(): TinycolorInstance {
    return this._color;
  }
  set color(value: TinycolorInstance) {
    this._color = value;
    this._readability = tinycolor.readability(this.backgroundColor, this.color);
  }

  /**
   * Returns the background color of the color scheme.
   */
  get backgroundColor(): TinycolorInstance {
    return this._backgroundColor;
  }

  private _readability: number;
  /**
   * Returns the color contrast between color and backgroundColor defined by (WCAG Version 2).
   */
  get readability(): number {
    return this._readability;
  }

  constructor(private _backgroundColor: TinycolorInstance) { }
}
