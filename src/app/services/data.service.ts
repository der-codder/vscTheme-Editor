import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { ColorScheme } from '../models/color-scheme';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {}

  downloadColorScheme(url: string): Observable<ColorScheme> {
    return this.http.get(url, { responseType: 'text' })
      .pipe(
        map(data => ColorScheme.fromJsonString(data))
      );
  }

  readLocalColorScheme(file: File): Observable<ColorScheme> {
    const reader = new FileReader();
    const fileReader$ = fromEvent<any>(reader, 'load')
      .pipe(
        map(event => ColorScheme.fromJsonString(event.target.result))
      );

    reader.readAsText(file);

    return fileReader$;
  }
}
