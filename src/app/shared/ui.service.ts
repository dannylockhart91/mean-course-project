import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBarError(message: string, duration: number) {
      this.snackBar.open(message, 'OK', {
          duration: duration,
          panelClass: 'snack-bar-error'
      })
  }

  showSnackBarSuccess(message: string, duration: number){
      this.snackBar.open(message, 'OK', {
          duration: duration,
          panelClass: 'snack-bar-success'
      })
  }
}
