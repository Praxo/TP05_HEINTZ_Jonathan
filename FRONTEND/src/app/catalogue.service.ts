import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Pizza } from 'shared/models/Pizza';

@Injectable({
  providedIn: 'root'
})

export class CatalogueService {
  constructor(private httpClient: HttpClient) { }
  public getCatalogue(): Observable<Pizza[]> {
    return this.httpClient
      .get<Pizza[]>(environment.baseUrl)
  }
}
