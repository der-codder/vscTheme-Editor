import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';

import { SharedService } from '../../services/shared.service';
import { EditTokenColorDialogComponent } from './edit-token-color-dialog/edit-token-color-dialog.component';
import { TokenColor } from '../../models/token-color';

@Component({
  selector: 'app-color-scheme-table',
  templateUrl: './color-scheme-table.component.html',
  styleUrls: ['./color-scheme-table.component.scss']
})
export class ColorSchemeTableComponent implements OnInit, OnDestroy {
  displayedColumns = ['readability', 'color', 'name', 'scope', 'modified', 'edit'];
  dataSource: any;
  themeName: string;
  status: string;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private sharedService: SharedService, public dialog: MatDialog) {}

  ngOnInit() {
    this.updateDataSource();
    this.sharedService.colorSchemeChange.subscribe(() => this.updateDataSource());
  }

  ngOnDestroy() {
    this.sharedService.colorSchemeChange.unsubscribe();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  editTokenColor(token: TokenColor): void {
    const dialogRef = this.dialog
      .open(
        EditTokenColorDialogComponent,
        { data: { originalTokenColor: token } }
      );

    dialogRef.afterClosed()
      .subscribe(
        result => {
          if (result) {
            token.color = result.color;
            token.name = result.name;
            token.scope = result.scope;
            token.isBold = result.isBold;
            token.isItalic = result.isItalic;
            token.isUnderline = result.isUnderline;
          }
        }
      );
  }

  private updateDataSource() {
    this.dataSource = new MatTableDataSource(this.sharedService.colorScheme.tokenColors);
    this.dataSource.sort = this.sort;
    if (this.sharedService.colorScheme.name !== undefined &&
      this.sharedService.colorScheme.name !== null &&
      this.sharedService.colorScheme.name !== ''
    ) {
      this.themeName = this.sharedService.colorScheme.name;
    } else {
      this.themeName = this.sharedService.colorScheme.fileName;
    }
    this.status = `${this.sharedService.colorScheme.tokenColors.length.toString()} tokens, ${this.getColorsAmount()} unique colors`;
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
