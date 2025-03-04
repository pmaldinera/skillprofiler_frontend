import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Quiz } from '../../apis/quiz';
import { Table } from 'primeng/table';
import { QuizService } from '../../services/quiz.service';
import { saveAs } from 'file-saver';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { AnalysisComponent } from '../analysis/analysis.component';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrl: './quiz.component.scss',
    providers: [MessageService, DialogService],
})
export class QuizComponent {
    isLoading = this.quizService.isLoading;

    quizDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    quizs: Quiz[] = [];

    quiz: Quiz = {};

    selectedProducts: Quiz[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    filenames: string[] = [];

    fileStatus = { status: '', requestType: '', percent: 0 };

    constructor(
        public quizService: QuizService,
        private messageService: MessageService,
        private dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.quizService.getAll().subscribe((data: Quiz[]) => {
            this.quizs = data;
            console.log('Quizs Loadeds');
        });
    }

    delete(id: number) {
        this.quizService.delete(id).subscribe((res) => {
            this.quizs = this.quizs.filter((item) => item.id !== id);
            console.log('Quiz deleted successful');
        });
    }

    save(quiz: Quiz, id: number) {
        this.quizService.edit(quiz, id).subscribe((data: Quiz[]) => {
            this.quizs = data;
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Quiz Updated',
                life: 3000,
            });
            this.quizDialog = false;
            console.log('Quiz updated successful');
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    editQuiz(quiz: Quiz) {
        this.quiz = { ...quiz };
        this.quizDialog = true;
    }

    hideDialog() {
        this.quizDialog = false;
        this.submitted = false;
    }

    saveReport(quiz: Quiz, id: number) {
        this.downloadFile(quiz);
        console.log('Report updated successful');
    }

    downloadFile(quiz: Quiz): void {
        this.quizService.showLoading();
        this.quizService.downloadFile(quiz).subscribe(
            (res) => {
                let filename =
                    'pf_' +
                    quiz.name.replace(' ', '_').toLocaleLowerCase() +
                    '.docx';
                console.log(res.headers);
                saveAs(
                    new File([res.body], filename, {
                        type: `${res.headers.get(
                            'Content-Type'
                        )}; charset=utf-8`,
                    })
                );
                this.quizService
                    .editReport(quiz.id, 'CREATED')
                    .subscribe((data: Quiz[]) => {
                        this.quizs = data;
                        this.quizService.hideLoading();
                    });
            },
            (error: HttpErrorResponse) => {
                this.quizService
                    .editReport(quiz.id, 'FAILED')
                    .subscribe((data: Quiz[]) => {
                        this.quizs = data;
                        this.quizService.hideLoading();
                    });
                console.log('Report dont found');
            }
        );
    }

    openAnalysis(quiz: Quiz) {
        const ref = this.dialogService.open(AnalysisComponent, {
            header: 'Manage Summary and Analysis',
            width: '70%',
            data: {
                userid: quiz.userid,
                quizid: quiz.quizid,
            },
        });
    }

    refresh(): void {
        this.quizService.showLoading();
        this.quizService.refresh().subscribe((data: Quiz[]) => {
            this.quizs = data;
            console.log('Quizs Loadeds');
            this.quizService.hideLoading();
        });
    }
}
