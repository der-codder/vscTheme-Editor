import * as stripJsonComments from 'strip-json-comments';
import * as tinycolor from 'tinycolor2';

import { TokenColor } from './token-color';

export class ColorScheme {
  /**
   * Name of the color theme
   */
  name: string;
  /**
   * Foreground color for the token.
   */
  editorBackground: TinycolorInstance;
  /**
   * Colors for syntax highlighting.
   */
  tokenColors: TokenColor[];

  constructor() {
    this.tokenColors = [];
  }

  /**
   * Converts provided json string into the ColorScheme.
   */
  static fromJsonString(json: string): ColorScheme {
    const cleanJson = stripJsonComments(json);
    const jsonObj = JSON.parse(cleanJson);
    const colorScheme = new ColorScheme();

    colorScheme.name = jsonObj.name;
    colorScheme.editorBackground = this.retrieveEditorBackground(jsonObj);

    for (const jsonTokenColor of jsonObj.tokenColors) {
      if (jsonTokenColor.settings && jsonTokenColor.settings.foreground) {
        colorScheme.tokenColors.push(this.retrieveTokenColor(jsonTokenColor, colorScheme.editorBackground));
      }
    }

    return colorScheme;
  }

  private static retrieveEditorBackground(jsonObj: any): TinycolorInstance {
    if (!jsonObj.colors['editor.background']) {
      console.warn(`Couldn't retrieve 'editor.background'.`);
    }
    return tinycolor(jsonObj.colors['editor.background']);
  }

  private static retrieveTokenColor(jsonObj: any, background: TinycolorInstance): TokenColor {
    const tokenColor = new TokenColor(background, tinycolor(jsonObj.settings.foreground));
    tokenColor.name = jsonObj.name;
    tokenColor.scope = jsonObj.scope;

    return tokenColor;
  }
}
