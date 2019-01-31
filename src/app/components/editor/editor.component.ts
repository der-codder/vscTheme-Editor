import { Component, OnInit, OnDestroy } from '@angular/core';

import { SharedService } from 'src/app/services/shared.service';
import { TokenColor } from 'src/app/models/token-color';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  colorSchemeTokenColors: TokenColor[];
  themeName: string;
  status: string;

  constructor(public sharedService: SharedService) { }

  ngOnInit() {
    this.updateDataSource();
    this.sharedService.colorSchemeChange.subscribe(() => this.updateDataSource());
  }

  ngOnDestroy() {
    this.sharedService.colorSchemeChange.unsubscribe();
  }

  private updateDataSource() {
    if (!this.sharedService.colorScheme) {
      this.colorSchemeTokenColors = [];
      this.themeName = '';
      this.status = '';

      return;
    }

    this.colorSchemeTokenColors = this.sharedService.colorScheme.tokenColors;
    if (this.sharedService.colorScheme.name !== undefined &&
      this.sharedService.colorScheme.name !== null &&
      this.sharedService.colorScheme.name !== ''
    ) {
      this.themeName = this.sharedService.colorScheme.name;
    } else {
      this.themeName = this.sharedService.colorScheme.fileName;
    }
    const tokenColorsLength = this.sharedService.colorScheme.tokenColors.length.toString();
    this.status = `${tokenColorsLength} tokens, ${this.getColorsAmount()} unique colors`;
  }

  private getColorsAmount() {
    const colorsInScheme = [];
    for (const tokenColor of this.sharedService.colorScheme.tokenColors) {
      const hex = tokenColor.color.toHexString();
      if (colorsInScheme.indexOf(hex) === -1) {
        colorsInScheme.push(hex);
      }
    }

    return colorsInScheme.length;
  }

}
