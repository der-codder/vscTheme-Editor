import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DataService } from '../../services/data.service';
import { SharedService } from '../../services/shared.service';
import { ColorScheme } from '../../models/color-scheme';
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
export class HeaderComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    // this.dataService.downloadColorScheme('assets/aurelium-color-theme.json')
    //   .subscribe(
    //     data => this.sharedService.colorScheme = data,
    //     err => console.error(err)
    //   );
  }

  openLocalFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const colorScheme = ColorScheme.fromJsonString(reader.result as string);
      colorScheme.fileName = file.name;
      this.sharedService.colorScheme = colorScheme;
    };
    reader.readAsText(file);
  }

  onOpenFromUrlClicked() {
    const dialogRef = this.dialog.open(
      OpenFromWebDialogComponent,
      { width: '500px' }
    );

    dialogRef.afterClosed()
      .subscribe(result => console.log(result));
  }
}
