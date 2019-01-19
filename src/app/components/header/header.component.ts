import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DataService } from '../../services/data.service';
import { SharedService } from '../../services/shared.service';
import { ColorScheme } from 'src/app/models/color-scheme';

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
    // this.data.fileName = file.name.replace('.json', '');

    const reader = new FileReader();
    reader.onload = () => {
      this.sharedService.colorScheme = ColorScheme.fromJsonString(reader.result as string);
    };
    reader.readAsText(file);
  }
}
