import { Component } from '@angular/core';
import { Quiz } from '../../apis/quiz';
import { QuizService } from '../../services/quiz.service';
import { saveAs } from 'file-saver';
import { HttpErrorResponse } from '@angular/common/http';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-quiz-dialog',
    templateUrl: './quiz-dialog.component.html',
    styleUrl: './quiz-dialog.component.scss',
    providers: [TooltipModule, DialogService, MessageService, MessagesModule],
})
export class QuizDialogComponent {
    isLoading = this.quizService.isLoading;
    quizDialog: boolean = false;
    quizs: Quiz[] = [];
    quiz: Quiz = {};
    selectedProducts: Quiz[] = [];
    candidateid: number;
    error: number;
    messages: Message[] = [];

    constructor(
        public quizService: QuizService,
        private ref: DynamicDialogRef,
        private config: DynamicDialogConfig,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.candidateid = this.config.data.candidateid;
        this.error = this.config.data.error;

        this.quizService.find(this.candidateid).subscribe((data: Quiz[]) => {
            this.quizs = data;
            console.log('Quizs Loadeds');
        });
        if (this.error == 1) {
            console.log(this.error);
            this.save();
        }
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
                saveAs(
                    new File([res.body], filename, {
                        type: `${res.headers.get(
                            'Content-Type'
                        )}; charset=utf-8`,
                    })
                );
                this.quizService
                    .editReport2(quiz.id, 'CREATED', quiz.candidateid)
                    .subscribe((data: Quiz[]) => {
                        this.quizs = data;
                        this.quizService.hideLoading();
                    });
            },
            (error: HttpErrorResponse) => {
                this.quizService
                    .editReport2(quiz.id, 'FAILED', quiz.candidateid)
                    .subscribe((data: Quiz[]) => {
                        this.quizs = data;
                        this.quizService.hideLoading();
                    });
                console.log('Report dont found');
            }
        );
    }

    generateReport(quiz: Quiz): void {
        this.quizService.showLoading();
        this.quizService.generateReport(quiz).subscribe(
            (res) => {
                this.quizService
                    .editReport2(quiz.id, 'CREATED', quiz.candidateid)
                    .subscribe((data: Quiz[]) => {
                        this.quizs = data;
                        this.quizService.hideLoading();
                    });
            },
            (error: HttpErrorResponse) => {
                this.quizService
                    .editReport2(quiz.id, 'FAILED', quiz.candidateid)
                    .subscribe((data: Quiz[]) => {
                        this.quizs = data;
                        this.quizService.hideLoading();
                    });
                console.log('Report dont found');
            }
        );
    }

    closeQuiz() {
        this.ref.close();
    }

    save() {
        console.log('entro');
        this.messages.push({
            severity: 'warn',
            summary: 'Warning',
            detail: 'Please, first generate all candidate reports',
        });
    }
}
