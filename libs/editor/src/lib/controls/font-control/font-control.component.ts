import { Component } from "@angular/core";
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'comen-font-control',
    styleUrls: ['./font-control.component.scss'],
    templateUrl: './font-control.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FontControlComponent,
            multi: true
        }
    ]
})
export class FontControlComponent implements ControlValueAccessor {

    constructor(private fb: FormBuilder) {

    }

    formGroup = this.fb.group({
        font: [''],
        size: [16],
        weight: ['normal'],
        space: [null],
        lineHeight: [null],
        textAlign: ['left'],
        italic: [false],
        underline: [false],
        strike: [false]
    });

    writeValue(value: any) {
        if(value){
            this.formGroup.setValue(value);
        }
    }

    registerOnChange(callback:(v)=>void) {
        this.formGroup.valueChanges.subscribe(callback);
    }

    registerOnTouched() {

    }
}