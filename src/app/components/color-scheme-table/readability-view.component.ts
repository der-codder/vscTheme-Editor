import { Component, Input } from '@angular/core';

interface Range {
  min: number;
  max: number;
}

interface ReadabilityLevel {
  range: Range;
  name: string;
  color: string;
  icon: string;
  message: string;
}

const ReadabilityLevels: ReadabilityLevel[] = [
  {
    range: { min: 0, max: 3},
    name: 'fail',
    color: '#c00',
    icon: 'mdi-eye-off-outline',
    message: 'Fails WCAG 2.0 :-('
  },
  {
    range: { min: 3, max: 4.5},
    name: 'aa-large',
    color: '#e69900',
    icon: 'mdi-eye-outline',
    message: 'Passes AA for large text'
  },
  {
    range: { min: 4.5, max: 7},
    name: 'aa',
    color: '#8ab82e',
    icon: 'mdi-eye-outline',
    message: 'Passes AA level for any size text and AAA for large text'
  },
  {
    range: { min: 7, max: 22},
    name: 'aaa',
    color: '#5ea72a',
    icon: 'mdi-eye',
    message: 'Passes AAA level for any size text'
  }
];

@Component({
  selector: 'app-readability-view',
  template: `
    <div *ngIf="compactView; else elseBlock">
      <mat-icon
        fontSet="mdi"
        [fontIcon]="readabilityLevel.icon"
        [ngStyle]="{'color': readabilityLevel.color}"
        [matTooltip]="readabilityLevel.message">
      </mat-icon>
      <h1>{{readability | number:'1.0-1'}}</h1>
    </div>
    <ng-template #elseBlock>
      Readability:
      <h1>
        <mat-icon
          fontSet="mdi"
          [fontIcon]="readabilityLevel.icon"
          [ngStyle]="{'color': readabilityLevel.color}"
          [matTooltip]="readabilityLevel.message">
        </mat-icon>
        {{readability | number:'1.0-1'}}
      </h1>
      <span class="mat-hint">{{ readabilityLevel.message }}</span>
    </ng-template>
  `,
  styles: [`
    h1 {
      display: inline;
      margin-left: 10px;
    }
  `]
})
export class ReadabilityViewComponent {
  @Input()
  compactView = true;

  private _readability: number;
  get readability(): number {
    return this._readability;
  }
  @Input()
  set readability(value: number) {
    this._readability = value;
  }

  get readabilityLevel(): ReadabilityLevel {
    for (const level of ReadabilityLevels) {
      if (this.readability >= level.range.min && this.readability < level.range.max) {
        return level;
      }
    }
  }
}
