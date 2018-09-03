import * as tinycolor from 'tinycolor2';

import { TokenColor } from './token-color';

describe('TokenColor', () => {
  it('.backgroundColor should contain the background color of the token', () => {
    const tokenColor = new TokenColor(tinycolor('#010101'), tinycolor('#474747'));

    expect(tokenColor.backgroundColor.toHexString()).toEqual('#010101');
  });

  describe('.color', () => {
    it('should contain the default color if it not changed', () => {
      const tokenColor = new TokenColor(tinycolor('#010101'), tinycolor('#202020'));

      expect(tokenColor.color.toHexString()).toEqual('#202020');
    });
    it('should contain the new color if it changed', () => {
      const tokenColor = new TokenColor(tinycolor('#010101'), tinycolor('#202020'));

      tokenColor.color = tinycolor('#474747');

      expect(tokenColor.color.toHexString()).toEqual('#474747');
    });
  });

  describe('.isModified', () => {
    it('should return "false" if color is not changed', () => {
      const tokenColor = new TokenColor(tinycolor('#010101'), tinycolor('#202020'));

      expect(tokenColor.isModified).toBeFalsy();
    });
    it('should return "true" if color is changed', () => {
      const tokenColor = new TokenColor(tinycolor('#010101'), tinycolor('#202020'));

      tokenColor.color = tinycolor('#474747');

      expect(tokenColor.isModified).toBeTruthy();
    });
  });

  describe('.readability', () => {
    it('should return correct contrast ratio for default color', () => {
      const tokenColor = new TokenColor(tinycolor('#000000'), tinycolor('#FFFFFF'));
      expect(tokenColor.readability).toEqual(21);
      const tokenColor1 = new TokenColor(tinycolor('#000000'), tinycolor('#000000'));
      expect(tokenColor1.readability).toEqual(1);
      const tokenColor2 = new TokenColor(null, tinycolor('#FFFFFF'));
      expect(tokenColor2.readability).toEqual(21);
      const tokenColor3 = new TokenColor(undefined, tinycolor('#FFFFFF'));
      expect(tokenColor3.readability).toEqual(21);
    });
    it('should return correct contrast ratio for modified color', () => {
      const tokenColor = new TokenColor(tinycolor('#000000'), tinycolor('#000000'));

      tokenColor.color = tinycolor('#FFFFFF');

      expect(tokenColor.readability).toEqual(21);
    });
  });
});
