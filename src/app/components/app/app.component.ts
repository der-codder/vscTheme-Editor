import { Component } from '@angular/core';
import * as tinycolor from 'tinycolor2';

import { TokenColor } from 'src/app/models/token-color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [``]
})
export class AppComponent {
  title = 'vscTheme-Editor';
  token: TokenColor;
  color = tinycolor('#555555');

  constructor() {
    this.token = new TokenColor(tinycolor('#fffffe'), tinycolor('#000000'));
    this.token.name = 'name1';
    this.token.scope = 'scope1, scope2, scope3';
  }
}
