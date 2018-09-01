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

    const token1 = new TokenColor(this.colorScheme.editorBackground);
    token1.name = 'fail';
    token1.scope = 'scope';
    token1.color = tinycolor('#ffffff');

    const token2 = new TokenColor(this.colorScheme.editorBackground);
    token2.name = 'aa-large';
    token2.scope = ['scope1', 'scope2'];
    token2.color = tinycolor('#949494');

    const token3 = new TokenColor(this.colorScheme.editorBackground);
    token3.name = 'aa';
    token3.scope = ['scope1', 'scope2', 'scope3'];
    token3.color = tinycolor('#767676');

    const token4 = new TokenColor(this.colorScheme.editorBackground);
    token4.name = 'aaa';
    token4.scope = ['scope1', 'scope2', 'scope3', 'scope4'];
    token4.color = tinycolor('#000000');

    const token5 = new TokenColor(tinycolor('#000000'));
    token5.name = 'black on black';
    token5.scope = ['scope1', 'scope2', 'scope3', 'scope4'];
    token5.color = tinycolor('#000000');

    const token6 = new TokenColor(tinycolor('#000000'));
    token6.name = 'white on black';
    token6.scope = ['scope1', 'scope2', 'scope3', 'scope4'];
    token6.color = tinycolor('#ffffff');

    this.colorScheme.tokenColors = [token1, token2, token3, token4, token5, token6];
  }

  // public getTheme(url: string) {
  //   return this.http.get(url);
  // }

}
