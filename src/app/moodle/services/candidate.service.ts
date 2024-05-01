import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHeaders,
    HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError, map, Subject } from 'rxjs';
import { Candidate } from '../apis/candidate';

@Injectable({
    providedIn: 'root',
})
export class CandidateService {
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
        return this.httpClient.get(this.apiURL + '/candidate').pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }

    create(candidate: Candidate): Observable<any> {
        return this.httpClient
            .post(this.apiURL + '/candidate', JSON.stringify(candidate), this.httpOptions)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }

    find(id: number): Observable<any> {
        return this.httpClient.get(this.apiURL + '/candidate/' + id).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }

    edit(candidate: Candidate, id: number): Observable<any> {
        return this.httpClient
            .put(
                this.apiURL + '/candidate/' + id,
                JSON.stringify(candidate),
                this.httpOptions
            )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }

    delete(id: number) {
        return this.httpClient.delete(this.apiURL + '/candidate/' + id).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }

    showLoading(): void {
        this.isLoading.next(true);
    }

    hideLoading(): void {
        this.isLoading.next(false);
    }

    refresh(): Observable<any> {
        return this.httpClient.get(this.apiURL + '/refresh-candidate').pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }

    downloadFile(candidate: Candidate): Observable<any> {
        return this.httpClient
            .post(this.apiURL + '/candidate-download', JSON.stringify(candidate), this.options)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }
}
