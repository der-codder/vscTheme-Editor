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
    this.sharedService.colorSchemeLoading = true;
    this.dataService.readLocalColorScheme(file)
      .subscribe(
        colorScheme => {
          colorScheme.fileName = file.name;
          this.sharedService.colorScheme = colorScheme;
          this.sharedService.colorSchemeLoading = false;
        },
        err => {
          console.error(err);
          this.sharedService.colorSchemeLoading = false;
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
        this.sharedService.colorSchemeLoading = true;
        this.dataService
          .downloadColorScheme(result)
          .subscribe(
            data => {
              this.sharedService.colorScheme = data;
              this.sharedService.colorSchemeLoading = false;
            },
            err => {
              console.error(err);
              this.sharedService.colorSchemeLoading = false;
            }
          );
      });
  }
}
