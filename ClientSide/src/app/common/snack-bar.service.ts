import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MySnackBar {
    constructor(private snackBar: MatSnackBar) { }

    showSnackBar(messadge: string) {
        this.snackBar.open(messadge, 'Подякував', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['my-snack'],
            politeness: 'assertive'
        });
    }
}