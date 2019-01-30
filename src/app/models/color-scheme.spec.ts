import * as tinycolor from 'tinycolor2';

import { TokenColor } from './token-color';
import { ColorScheme } from './color-scheme';

describe('ColorScheme', () => {
  describe('.fromJsonString', () => {
    it('should return proper scope if json contains comma separated string without spaces', () => {
      const json = `{
        "name": "test",
        "type": "dark",
        "colors": {  "editor.background": "#000000" },
        "tokenColors": [
          {
            "name": "tokenColors.name",
            "scope": "tokenColors.scope1,tokenColors.scope2, tokenColors.scope3",
            "settings": {
              "foreground": "#ffffff"
            }
          }
        ]
      }`;
      const colorScheme = ColorScheme.fromJsonString(json);

      expect(colorScheme.tokenColors[0].scope)
        .toEqual('tokenColors.scope1, tokenColors.scope2, tokenColors.scope3');
    });
  });
});
