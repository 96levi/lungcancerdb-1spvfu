import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  URL = 'http://research.raisinghopevn.com/php/Dz/POST.php';
  uploadURL = 'http://research.raisinghopevn.com/php/Dz/upload.php';
  deleteURL = 'http://research.raisinghopevn.com/php/Dz/delete.php';
  constructor(private http: HttpClient) { }

  getDay(action: string, stt: number, table?: string, dayHos?: number) {
    let params: HttpParams;
    if (!table) {
      table = 'clinic';
      params = new HttpParams()
        .set('action', action)
        .set('table', table)
        .set('stt', stt.toString());
    } else {
      params = new HttpParams()
        .set('action', action)
        .set('table', table)
        .set('stt', stt.toString())
        .set('dayHos', dayHos.toString());
    }
    return this.http.post<Array<object>>(this.URL, undefined, { params });
  }

  getImage(action: string, stt: number, dateHos: number, date: number, folder: string) {
    const params = new HttpParams()
      .set('action', action)
      .set('stt', stt.toString())
      .set('dateHos', dateHos.toString())
      .set('date', date.toString())
      .set('folder', folder);

    return this.http.post<any>(this.URL, undefined, { params });
  }

  getData(action: string, table: string, stt?: number, dateHos?: number, date?: number) {
    let params: HttpParams;
    if (dateHos && stt && date) {
      params = new HttpParams()
        .set('table', table)
        .set('action', action)
        .set('stt', stt.toString())
        .set('dateHos', dateHos.toString())
        .set('date', date.toString());
    } else {
      if (dateHos && stt) {
        params = new HttpParams()
          .set('table', table)
          .set('action', action)
          .set('stt', stt.toString())
          .set('dateHos', dateHos.toString());
      } else {
        if (!stt) {
          params = new HttpParams()
            .set('table', table)
            .set('action', action);
        } else {
          params = new HttpParams()
            .set('table', table)
            .set('action', action)
            .set('stt', stt.toString());
        }
      }
    }
    return this.http.post<any>(this.URL, undefined, { params });
  }

  getRecord(action: string, table: string, stt?: number, day?: number) { // action:{RETURN_RECORD, GET_RECORD}
    let params: HttpParams;
    if (!day) { // Return new record
      params = new HttpParams()
        .set('table', table)
        .set('action', action);
    } else { // Get record
      params = new HttpParams()
        .set('table', table)
        .set('action', action)
        .set('stt', stt.toString())
        .set('day', day.toString());
    }
    return this.http.post<any>(this.URL, undefined, { params });
  }

  submitButton(action: string, table: string, data: object) {
    const params = new HttpParams().set('table', table).set('action', action);
    this.http.post(this.URL, data, { params }).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  uploadImage(file, fileName: string, folder: string) {
    const fb = new FormData();
    const params = new HttpParams().set('folder', folder);
    fb.append('image', file, fileName);
    return this.http.post(this.uploadURL, fb, { params });
  }

  uploadMultipleImg(stt: number, dateHos: number, date: number, folder: string, fdata: object) {
    const params = new HttpParams()
      .set('folder', folder)
      .set('stt', stt.toString())
      .set('dateHos', dateHos.toString())
      .set('date', date.toString());
    return this.http.post<Array<string>>(this.uploadURL, fdata, { params });
  }

  deleteFile(filename: string, folder: string) {
    const params = new HttpParams().set('filename', filename).set('folder', folder);
    return this.http.post(this.deleteURL, undefined, { params });
  }

  checkWorkup(action: string, table: string, stt: number, dateHos: number) {
    const params = new HttpParams()
      .set('stt', stt.toString())
      .set('dateHos', dateHos.toString())
      .set('table', table)
      .set('action', action);
    return this.http.post(this.URL, undefined, { params });
  }

  getAllClinic(stt: number, date0: number, date1: number) {
    const params = new HttpParams()
      .set('stt', stt.toString())
      .set('date0', date0.toString())
      .set('date1', date1.toString())
      .set('action', 'GET_ALL_CLINIC');
    return this.http.post<Array<object>>(this.URL, undefined, { params });
  }
}
