import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as tinycolor from 'tinycolor2';

import { ColorScheme } from '../models/color-scheme';
import { TokenColor } from '../models/token-color';

@Injectable()
export class SharedService {
  private _colorScheme: ColorScheme;
  get colorScheme(): ColorScheme {
    return this._colorScheme;
  }
  set colorScheme(value: ColorScheme) {
    this._colorScheme = value;
    console.log(this._colorScheme);
    this.colorSchemeChange.emit(this.colorScheme);
  }

  colorSchemeChange = new EventEmitter<ColorScheme>();

  constructor(private http: HttpClient) {
    this.colorScheme = new ColorScheme();
    this.colorScheme.name = 'Test Theme';
    this.colorScheme.editorBackground = tinycolor('#fffffe');

    const token1 = new TokenColor(this.colorScheme.editorBackground, tinycolor('#ffffff'));
    token1.name = 'fail';
    token1.scope = 'scope';

    const token2 = new TokenColor(this.colorScheme.editorBackground, tinycolor('#949494'));
    token2.name = 'aa-large';
    token2.scope = ['scope1', 'scope2'];

    const token3 = new TokenColor(this.colorScheme.editorBackground, tinycolor('#767676'));
    token3.name = 'aa';
    token3.scope = ['scope1', 'scope2', 'scope3'];

    const token4 = new TokenColor(this.colorScheme.editorBackground, tinycolor('#000000'));
    token4.name = 'aaa';
    token4.scope = ['scope1', 'scope2', 'scope3', 'scope4'];

    const token5 = new TokenColor(tinycolor('#000000'), tinycolor('#000000'));
    token5.name = 'black on black';
    token5.scope = ['scope1', 'scope2', 'scope3', 'scope4'];

    const token6 = new TokenColor(tinycolor('#000000'), tinycolor('#ffffff'));
    token6.name = 'white on black';
    token6.scope = ['scope1', 'scope2', 'scope3', 'scope4'];

    const token7 = new TokenColor(this.colorScheme.editorBackground, tinycolor('#ffffff'));
    token7.name = 'modified';
    token7.scope = 'scope';
    token7.color = tinycolor('#ff0000');

    this.colorScheme.tokenColors = [token1, token2, token3, token4, token5, token6, token7];
  }

  // public getTheme(url: string) {
  //   return this.http.get(url);
  // }

}
