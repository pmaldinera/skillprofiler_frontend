import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudRoutingModule } from '../demo/components/pages/crud/crud-routing.module';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { QuizComponent } from './components/quiz/quiz.component';
import { BadgeModule } from 'primeng/badge';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CandidateComponent } from './components/candidate/candidate.component';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { QuizDialogComponent } from './components/quiz-dialog/quiz-dialog.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { LoginComponent } from './components/auth/login/login.component';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './utils/interceptors/http-auth.interceptor';


@NgModule({
    declarations: [
        QuizComponent,
        AnalysisComponent,
        CandidateComponent,
        QuizDialogComponent,
        LoginComponent,
    ],
    providers:[DatePipe,
                {provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true}],
    imports: [
        CommonModule,
        CrudRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        BadgeModule,
        ProgressSpinnerModule,
        ReactiveFormsModule,
        TooltipModule,
        CheckboxModule,
        MessagesModule,
        MessageModule,
    ],
})
export class MoodleModule {}
