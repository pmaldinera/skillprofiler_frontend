import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { Summary } from '../apis/summary';

@Injectable({
    providedIn: 'root',
})
export class AnalysisService {
    private apiURL = 'http://127.0.0.1:8000/api/v1';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:8000/api/v1',
            'Access-Control-Allow-Methods':
                'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        }),
    };

    constructor(private httpClient: HttpClient) {}

    getAnalysis(candidateid: number, quizid: number): Observable<any> {
        return this.httpClient
            .get(
                this.apiURL +
                    '/analysis/?candidateid=' +
                    candidateid +
                    '&quizid=' +
                    quizid
            )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }

    getSummary(candidateid: number, quizid: number): Observable<any> {
        return this.httpClient
            .get(
                this.apiURL +
                    '/summary?candidateid=' +
                    candidateid +
                    '&quizid=' +
                    quizid
            )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }

    edit(summaryid: string, summary: string): Observable<any> {
        return this.httpClient
            .put(
                this.apiURL + '/summary/?summaryid=' + summaryid + '&summarystr=' + summary,
                this.httpOptions
            )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error);
                })
            );
    }
}
