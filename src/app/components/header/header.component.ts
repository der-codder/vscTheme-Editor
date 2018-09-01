import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService: DataService, private sharedService: SharedService) { }

  ngOnInit() {
    this.dataService.downloadColorScheme('assets/aurelium-color-theme.json')
      .subscribe(
        data => this.sharedService.colorScheme = data,
        err => console.error(err)
      );
  }

}
