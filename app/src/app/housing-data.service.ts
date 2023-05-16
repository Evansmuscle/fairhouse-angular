import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Types
import { HousingLocation } from './housing-location';
import { HttpResponse } from './http-response';

@Injectable({
  providedIn: 'root',
})
export class HousingDataService {
  url = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getHousingData(): Observable<HttpResponse<HousingLocation[]>> {
    return this.http.get<HttpResponse<HousingLocation[]>>(
      this.url + 'housing-data'
    );
  }
}
