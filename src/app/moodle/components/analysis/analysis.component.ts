import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Analysis } from '../../apis/analysis';
import { Summary } from '../../apis/summary';
import { AnalysisService } from '../../services/analysis.service';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-analysis',
    templateUrl: './analysis.component.html',
    styleUrl: './analysis.component.scss',
    providers: [MessageService, DialogService],
})
export class AnalysisComponent {
    danalysis: Analysis[] = [];
    summarys: Summary[] = [];

    analysis: Analysis = {};
    summary: Summary = {};

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
            .edit(summaryid, summary)
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
