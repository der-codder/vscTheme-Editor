import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';

import { SharedService } from '../../services/shared.service';
import { EditTokenColorDialogComponent } from './edit-token-color-dialog/edit-token-color-dialog.component';
import { TokenColor } from '../../models/token-color';

@Component({
  selector: 'app-color-scheme-table',
  templateUrl: './color-scheme-table.component.html',
  styles: [`
    mat-checkbox {
      margin-right: 15px;
      margin-left: 15px;
    }
    .table-header {
      min-height: 64px;
      padding: 8px 24px 0;
    }
    .mat-form-field {
      font-size: 14px;
      width: 100%;
    }
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class ColorSchemeTableComponent implements OnInit, OnDestroy {
  displayedColumns = ['readability', 'color', 'name', 'scope', 'modified'];
  dataSource: any;
  themeName: string;
  status: string;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private sharedService: SharedService, public dialog: MatDialog) {}

  ngOnInit() {
    this.updateDataSource();
    this.sharedService.colorSchemeChange.subscribe(data => this.updateDataSource());
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
    this.dialog.open(EditTokenColorDialogComponent, {
      // width: '250px',
      data: { originalTokenColor: token }
    });
  }

  private updateDataSource() {
    this.dataSource = new MatTableDataSource(this.sharedService.colorScheme.tokenColors);
    this.dataSource.sort = this.sort;
    this.themeName = this.sharedService.colorScheme.name;
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
