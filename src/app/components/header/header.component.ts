import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DataService } from '../../services/data.service';
import { SharedService } from '../../services/shared.service';
import { OpenFromWebDialogComponent } from './open-from-web-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    .logo {
      padding-right: 10px;
      width: 36px;
      height: 36px;
    }

    .fill-remaining-space {
      flex: 1 1 auto;
    }
  `]
})
export class HeaderComponent {

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private sharedService: SharedService
  ) { }

  openLocalFile(file: File) {
    this.dataService.readLocalColorScheme(file)
      .subscribe(
        colorScheme => {
          colorScheme.fileName = file.name;
          this.sharedService.colorScheme = colorScheme;
        },
        err => {
          console.error(err);
        }
      );
  }

  onOpenFromUrlClicked() {
    const dialogRef = this.dialog.open(
      OpenFromWebDialogComponent,
      { width: '500px' }
    );

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(result);
        this.dataService
          .downloadColorScheme(result)
          .subscribe(
            data => this.sharedService.colorScheme = data,
            err => console.error(err)
          );
      });
  }
}
