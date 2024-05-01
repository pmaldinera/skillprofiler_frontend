import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHeaders,
    HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError, map, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PositionService {
    private apiURL = 'http://127.0.0.1:8000/api/v1';
    isLoading = new Subject<Boolean>();

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:8000/api/v1',
            'Access-Control-Allow-Methods':
                'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        }),
    };

    options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:8000/api/v1',
            'Access-Control-Allow-Methods':
                'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        }),
        observe: 'response' as 'body',
        responseType: 'blob' as 'blob',
    };

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<any> {
        return this.httpClient.get(this.apiURL + '/position').pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }
}
