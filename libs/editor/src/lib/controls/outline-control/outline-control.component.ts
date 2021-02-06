import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'comen-outline-control',
  templateUrl: './outline-control.component.html',
  styleUrls: ['./outline-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: OutlineControlComponent,
      multi: true
    }
  ]
})
export class OutlineControlComponent implements ControlValueAccessor {

  constructor(private fb: FormBuilder) { }

  formGroup = this.fb.group({
    color: ['#ffffff'],
    width: [0]
  });

  writeValue(value: any) {
    if (value) {
      this.formGroup.setValue(value);
    }
  }

  registerOnChange(callback: (v) => void) {
    this.formGroup.valueChanges.subscribe(callback);
  }

  registerOnTouched() {

  }

}
