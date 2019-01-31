import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as tinycolor from 'tinycolor2';

import { ColorScheme } from '../models/color-scheme';
import { TokenColor } from '../models/token-color';

@Injectable()
export class SharedService {
  colorSchemeLoading = true;
  testTheme: ColorScheme;

  private _colorScheme: ColorScheme;
  get colorScheme(): ColorScheme {
    return this._colorScheme;
  }
  set colorScheme(value: ColorScheme) {
    this._colorScheme = value;
    this.colorSchemeChange.emit(this.colorScheme);
  }

  colorSchemeChange = new EventEmitter<ColorScheme>();

  constructor(private http: HttpClient) {
    this.testTheme = new ColorScheme();
    this.testTheme.name = 'Test Theme';
    this.testTheme.editorBackground = tinycolor('#fffffe');

    const token1 = new TokenColor(this.testTheme.editorBackground, tinycolor('#ffffff'));
    token1.name = 'fail';
    token1.scope = 'scope';

    const token2 = new TokenColor(this.testTheme.editorBackground, tinycolor('#949494'));
    token2.name = 'aa-large';
    token2.scope = ['scope1', 'scope2'];

    const token3 = new TokenColor(this.testTheme.editorBackground, tinycolor('#767676'));
    token3.name = 'aa';
    token3.scope = ['scope1', 'scope2', 'scope3'];

    const token4 = new TokenColor(this.testTheme.editorBackground, tinycolor('#000000'));
    token4.name = 'aaa';
    token4.scope = ['scope1', 'scope2', 'scope3', 'scope4'];

    const token5 = new TokenColor(this.testTheme.editorBackground, tinycolor('#000000'));
    token5.name = 'modified';
    token5.scope = 'scope';
    token5.color = tinycolor('#ff0000');

    const token6 = new TokenColor(tinycolor('#000000'), tinycolor('#000000'));
    token6.name = 'black on black';
    token6.scope = ['scope1', 'scope2', 'scope3', 'scope4'];

    const token7 = new TokenColor(tinycolor('#000000'), tinycolor('#ffffff'));
    token7.name = 'white on black';
    token7.scope = ['scope1', 'scope2', 'scope3', 'scope4'];

    const token8 = new TokenColor(this.testTheme.editorBackground, tinycolor('#ffffff'));
    token8.name = 'long scope';
    token8.scope = 'very very very very very very very very very very very very very very long scope';

    const token9 = new TokenColor(this.testTheme.editorBackground, tinycolor('#ffffff'));
    token9.name = 'very very very very very very very very very very very very very very long name';
    token9.scope = 'very very very very very very very very very very very very very very long scope';

    this.testTheme.tokenColors = [
      token1, token2, token3, token4, token5, token6, token7, token8, token9
    ];

    this.colorScheme = this.testTheme;
    this.colorSchemeLoading = false;
  }

  // public getTheme(url: string) {
  //   return this.http.get(url);
  // }

}
