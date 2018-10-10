import { Component, OnInit, Input } from '@angular/core';
import { TokenColor } from 'src/app/models/token-color';

@Component({
  selector: 'app-token-editor',
  templateUrl: './token-editor.component.html',
  styles: [``]
})
export class TokenEditorComponent implements OnInit {

  @Input() token: TokenColor;

  constructor() { }

  ngOnInit() {
  }

}
