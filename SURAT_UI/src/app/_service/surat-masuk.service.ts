import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Suratmasuk } from '../_model/Suratmasuk';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuratMasukService {
  baseUrl = environment.apiUrl + 'suratmasuk/';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Suratmasuk[] | null> {
    let params = new HttpParams();

    return this.http
      .get<Suratmasuk[]>(this.baseUrl, {
        observe: 'response',
        params
      })
      .pipe(
        map(response => {
          return response.body;
        })
      )
  }

  addSuratMasuk(data: Suratmasuk): Observable<any> {
    return this.http.post(this.baseUrl + 'create', data);
  }

  editSuratMasuk(data: Suratmasuk): Observable<any> {
    return this.http.put(this.baseUrl + 'update/' + data.id, data);
  }

  delSuratMasuk(data: Suratmasuk): Observable<any> {
    return this.http.delete(this.baseUrl + 'delete/' + data.id);
  }
}
