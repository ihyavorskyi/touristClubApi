import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MySnackBar } from "./snack-bar.service";

@Injectable({
    providedIn: 'root'
})
export class UploadImageService {
    constructor(
        private snackBar: MySnackBar,
        private http: HttpClient
    ) { }
    
    uploadFile = (files, id, name: string, http: string) => {
        if (files.length === 0) {
            return;
        }
        const fileToUpload = files[0] as File;
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        formData.append(name, id.toString());
        this.http.post('https://localhost:5001/api/' + http, formData, { reportProgress: true, observe: 'events' })
            .subscribe(event => {
                if (event.type === HttpEventType.Response) {
                    this.snackBar.showSnackBar('Зображення оновлено');
                }
            });
    };
}