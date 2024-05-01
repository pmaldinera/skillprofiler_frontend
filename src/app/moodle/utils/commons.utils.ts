import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import * as moment from "moment";

@Injectable({ providedIn: 'root' })
export class CommonsUtils {

    constructor(
        public datePipe: DatePipe) {}

    formatDateTo_DD_MM_YYYY_from_YYYYMMDD(date: any) {
        if (this.isBlank(date)) return "--";
        var d = moment(date, "YYYYMMDD");
        return moment(d, "DD/MM/YYYY").format("DD/MM/YYYY");
    }
    formatDateTo_DD_MM_YYYY_HHmmss_from_YYYYMMDDHHmmss(date: any) {
        if (this.isBlank(date)) return "--";
        var d = moment(date, "YYYYMMDDHHmmss");
        return moment(d, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
    }
    formatDateTo_YYYYMMDD_from_DD_MM_YYYY(date: any) {
        if (this.isBlank(date)) return "--";
        var d = moment(date, "DD/MM/YYYY");
        return moment(d, "YYYYMMDD").format("YYYYMMDD");
    }
    formatDateTo_YYYYMMDDHHmmss_from_DD_MM_YYYY_HHmmss(date: any) {
        if (this.isBlank(date)) return "--";
        var d = moment(date, "DD/MM/YYYY HH:mm:ss");
        return moment(d, "YYYYMMDDHHmmss").format("YYYYMMDDHHmmss");
    }
    formatDateTo_YYYY_MM_DDH_Hmmss_from_YYYYMMDDHHmmss(date: any) {
        if (this.isBlank(date)) return "--";
        var d = moment(date, "YYYYMMDDHHmmss");
        return moment(d, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
    }
    formatDate_from_DD_MM_YYYY(date: any) {
        if (this.isBlank(date)) return "--";
        var d = moment(date, "DD/MM/YYYY");
        return moment(d, "YYYY-MM-DD").format("YYYY-MM-DD");
    }

    calculateAgeByBirthDate(birthDate: string, dateFormat?: string): number {
        var age = 0;
        try {
            var a = moment();
            var b = moment(birthDate, "YYYY");
            if (dateFormat === "DDMMYYYY") b = moment(birthDate, "DD/MM/YYYY");
            age = a.diff(b, 'years');
            if (Number.isNaN(age)) throw "Error en edad";
        } catch (e) {
            console.log("Error obtener edad en base a fecha de nacimiento ["+ birthDate +"]")
            age = 0;
        }

        return age;
    }

    isBlank(str: any): boolean {
        if (str == undefined || str == null || str.toString().trim() == "") return true;
        return false;
    }
    isNotBlank(str: any): boolean {
        if (str == undefined) return false;
        else if (str == null) return false;
        else if (str.toString().trim() == "") return false;

        return true;
    }

    toBase64(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    resetFormValidations(form: FormGroup) {
        Object.keys(form.controls).forEach((key) => {
            const control = form.controls[key];
            control.setErrors(null);
            control.updateValueAndValidity();
            control.markAsPristine();
            control.markAsUntouched();
        });
    }
}
