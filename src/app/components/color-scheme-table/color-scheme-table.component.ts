import { Component, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';

import { SharedService } from '../../services/shared.service';
import { EditTokenColorDialogComponent } from './edit-token-color-dialog/edit-token-color-dialog.component';
import { TokenColor } from '../../models/token-color';

@Component({
  selector: 'app-color-scheme-table',
  templateUrl: './color-scheme-table.component.html',
  styleUrls: ['./color-scheme-table.component.scss']
})
export class ColorSchemeTableComponent {
  displayedColumns = ['readability', 'color', 'name', 'scope', 'modified', 'edit'];
  dataSource: MatTableDataSource<TokenColor>;

  @Input()
  set tokenColors(value: TokenColor[]) {
    this.dataSource = new MatTableDataSource(value);
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatSort) sort: MatSort;

  constructor(public sharedService: SharedService, public dialog: MatDialog) { }

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

}
