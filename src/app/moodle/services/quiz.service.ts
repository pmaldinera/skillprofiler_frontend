import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError, map, Subject } from 'rxjs';
import { Quiz } from '../apis/quiz';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
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
        return this.httpClient.get(this.apiURL + '/quiz').pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }

    create(quiz: Quiz): Observable<any> {
        return this.httpClient
            .post(this.apiURL + '/quiz', JSON.stringify(quiz), this.httpOptions)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }

    find(id: number): Observable<any> {
        return this.httpClient.get(this.apiURL + '/quiz/' + id).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }

    edit(quiz: Quiz, id: number): Observable<any> {
        return this.httpClient
            .put(
                this.apiURL + '/quiz/' + id,
                JSON.stringify(quiz),
                this.httpOptions
            )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }

    delete(id: number) {
        return this.httpClient.delete(this.apiURL + '/quiz/' + id).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }

    editReport(id: number, status: string): Observable<any> {
        return this.httpClient
            .put(
                this.apiURL + '/report/?id=' + id + '&status=' + status,
                this.httpOptions
            )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }

    downloadFile(quiz: Quiz): Observable<any> {
        return this.httpClient
            .post(this.apiURL + '/report', JSON.stringify(quiz), this.options)
            .pipe(
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
        return this.httpClient.get(this.apiURL + '/refresh-quiz').pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }
}


