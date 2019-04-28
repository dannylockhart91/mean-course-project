import {AbstractControl} from "@angular/forms";
import {Observable, Observer, of} from "rxjs";


/**
 * Custom validator that checks the validity of the images to be uploaded to make
 * sure they are of a certain type
 * @param control The control in which this validator is linked to
 */
export const mimeType = (control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
    if (typeof control.value === 'string') {
        return of(null)
    }
    const file = control.value as File;
    const fileReader = new FileReader();

    return Observable.create((observer: Observer<{ [key: string]: any }>) => {
        fileReader.addEventListener('loadend', () => {
            const arr = new Uint8Array(<ArrayBuffer>fileReader.result).subarray(0, 4);
            let header = '';
            let isValid: boolean = false;
            for (let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }
            switch (header) {
                case '89504e47': //image/jpeg
                    isValid = true;
                    break;
                case 'ffd8ffe0':
                case 'ffd8ffe1':
                case 'ffd8ffe2':
                case 'ffd8ffe3':
                case 'ffd8ffe8': //image/jpeg
                    isValid = true;
                    break;
                default:
                    isValid = false;
                    break;
            }
            if (isValid) {
                observer.next(null);
            } else {
                observer.next({invalidMimeType: true})
            }
            observer.complete();
        });
        fileReader.readAsArrayBuffer(file);
    });
};
