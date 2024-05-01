import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CandidateService } from '../../services/candidate.service';
import { saveAs } from 'file-saver';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpEventType,
} from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { Candidate } from '../../apis/candidate';
import { Position } from '../../apis/position'
import { QuizDialogComponent } from '../quiz-dialog/quiz-dialog.component';
import { PositionService } from '../../services/position.service';
import { AcademicdegreeService } from '../../services/academicdegree.service';
import { AcademicDegree } from '../../apis/academicdegree';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Password } from 'primeng/password';

@Component({
    selector: 'app-candidate',
    templateUrl: './candidate.component.html',
    styleUrl: './candidate.component.scss',
    providers: [MessageService, DialogService],
})
export class CandidateComponent implements OnInit {
    isLoading = this.candidateService.isLoading;
    candidateDialog: boolean = false;
    candidates: Candidate[] = [];
    candidate: Candidate = {};
    positions: Position[] = [];
    position: Position = {};
    selectedPosition: number;
    academicdegrees: AcademicDegree[] = [];
    academicdegree: AcademicDegree = {};
    selectedAcademic: number;
    showField = false;
    submitted: boolean = false;

    candidateForm: FormGroup = this.formBuilder.group({
        id: new FormControl(),
        username: new FormControl(),
        password: new FormControl(),
        firstname: new FormControl('', [Validators.required]),
        middlename: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        alternatename: new FormControl('', [Validators.required]),
        name: new FormControl(),
        email: new FormControl('', [Validators.required, Validators.email]),
        age: new FormControl('', [Validators.required]),
        academicdegreeid: new FormControl('', Validators.required),
        positionid: new FormControl('', Validators.required),
        status: new FormControl(),
        academicdegree: new FormControl(),
        position: new FormControl(),
    });

    constructor(
        public candidateService: CandidateService,
        public positionService: PositionService,
        public academicdegreeService: AcademicdegreeService,
        private messageService: MessageService,
        private dialogService: DialogService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.candidateService.getAll().subscribe((data: Candidate[]) => {
            this.candidates = data;
            console.log('Candidates Loadeds');
        });
        this.positionService.getAll().subscribe((data: Position[]) => {
            this.positions = data;
            console.log('Positions Loadeds');
        });
        this.academicdegreeService
            .getAll()
            .subscribe((data: AcademicDegree[]) => {
                this.academicdegrees = data;
                console.log('Academic Loadeds');
            });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.candidateForm.controls;
    }

    delete(id: number) {
        this.candidateService.delete(id).subscribe((res) => {
            this.candidates = this.candidates.filter((item) => item.id !== id);
            console.log('Candidate deleted successful');
        });
    }

    save() {
        this.submitted = true;
        if (this.candidateForm.valid) {
            this.candidate = this.candidateForm.value;
            if (this.candidate.id) {
                this.candidate.name =
                    this.candidate.firstname +
                    ' ' +
                    this.candidate.middlename +
                    ' ' +
                    this.candidate.lastname +
                    ' ' +
                    this.candidate.alternatename;
                this.candidate.academicdegreeid = this.candidateForm.get('academicdegreeid').value;
                this.candidate.positionid = this.candidateForm.get('positionid').value;
                this.candidateService
                    .edit(this.candidate, this.candidate.id)
                    .subscribe((data: Candidate[]) => {
                        this.candidates = data;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Candidate Updated',
                            life: 3000,
                        });
                        this.candidateDialog = false;
                        console.log('Candidate updated successful');
                    });
            } else {
                this.candidate.name =
                    this.candidate.firstname +
                    ' ' +
                    this.candidate.middlename +
                    ' ' +
                    this.candidate.lastname +
                    ' ' +
                    this.candidate.alternatename;
                this.candidate.academicdegreeid = this.candidateForm.get('academicdegreeid').value;
                this.candidate.positionid = this.candidateForm.get('positionid').value;
                if (!this.candidate.status) {
                    this.candidate.status = false;
                }
                if (!this.candidate.username) {
                    this.candidate.username = this.candidate.email;
                }
                if (!this.candidate.password) {
                    this.candidate.password = '';
                }
                this.candidateService.create(this.candidate).subscribe((data: Candidate[]) => {
                    this.candidates = data;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Candidate Created',
                        life: 3000,
                    });
                    this.candidateDialog = false;
                    this.showFields(false);
                    console.log('Candidate created successful');
                });
            }
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    newCandidate() {
        this.candidate = {};
        //this.showFields(true);
        this.candidateDialog = true;
        this.selectedAcademic = null;
        this.selectedPosition = null;
        this.submitted = false;
        this.candidateForm.reset();
    }

    editCandidate(candidate: Candidate) {
        this.candidate = { ...candidate };
        this.showFields(false);
        this.candidateDialog = true;
        this.submitted = false;
        this.candidateForm.setValue(this.candidate);
    }

    hideDialog() {
        this.candidateDialog = false;
        this.showFields(false);
        this.submitted = false;
        this.candidateForm.reset();
    }

    saveReport(candidate: Candidate, id: number) {
        console.log('Report updated successful');
    }

    openQuiz(candidate: Candidate, error: number) {
        const ref = this.dialogService.open(QuizDialogComponent, {
            header: 'TESTS',
            width: '70%',
            contentStyle: { overflow: 'hidden' },
            data: {
                candidateid: candidate.id,
                error: error,
            },
        });
    }

    refresh(): void {
        this.candidateService.showLoading();
        this.candidateService.refresh().subscribe((data: Candidate[]) => {
            this.candidates = data;
            console.log('Candidates Loadeds');
            this.candidateService.hideLoading();
        });
    }

    showFields(show: boolean) {
        this.showField = show;
    }

    downloadFile(candidate: Candidate): void {
        this.candidateService.showLoading();
        this.candidateService.downloadFile(candidate).subscribe(
            (res) => {
                let filename =
                    'profile_' +
                    candidate.firstname.toLocaleLowerCase() +
                    '_' +
                    candidate.lastname.toLocaleLowerCase() +
                    '.docx';
                saveAs(
                    new File([res.body], filename, {
                        type: `${res.headers.get(
                            'Content-Type'
                        )}; charset=utf-8`,
                    })
                );
                this.candidateService.hideLoading();
            },
            (error: HttpErrorResponse) => {
                this.candidateService.hideLoading();
                this.openQuiz(candidate, 1);
                console.log('Report dont found');
            }
        );
    }
}
