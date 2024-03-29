import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Analysis } from '../../apis/analysis';
import { Summary } from '../../apis/summary';
import { Table } from 'primeng/table';
import { AnalysisService } from '../../services/analysis.service';
import { HttpErrorResponse, HttpEvent, HttpEventType, } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.component.html',
    styleUrl: './analysis.component.scss',
    providers: [MessageService, DialogService],
})
export class AnalysisComponent {
    quizDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    danalysis: Analysis[] = [];
    summarys: Summary[] = [];

    analysis: Analysis = {};
    summary: Summary = {};

    selectedProducts: Analysis[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    filenames: string[] = [];

    userid: number;
    quizid: number;

    constructor(
        public analysisService: AnalysisService,
        private messageService: MessageService,
        private ref: DynamicDialogRef,
        private config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        this.userid = this.config.data.userid;
        this.quizid = this.config.data.quizid;

        this.analysisService
            .getAnalysis(this.userid, this.quizid)
            .subscribe((data: Analysis[]) => {
                this.danalysis = data;
                console.log('Analysis Loadeds');
            });
        this.analysisService
            .getSummary(this.userid, this.quizid)
            .subscribe((data: Summary[]) => {
                this.summarys = data;
                this.summary = this.summarys[0];
            });
    }

    save(summaryid: string, summary: string) {
        this.analysisService
            .edit(summaryid, summary.toUpperCase())
            .subscribe((data: Summary[]) => {
                this.summarys = data;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Summary Updated',
                    life: 1500,
                });
            });
    }
}
