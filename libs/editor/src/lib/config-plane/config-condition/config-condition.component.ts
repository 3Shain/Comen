import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SafeAny, VariantCondition } from '@comen/common';

@Component({
  selector: 'comen-config-condition',
  templateUrl: './config-condition.component.html',
  styleUrls: ['./config-condition.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ConfigConditionComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigConditionComponent implements ControlValueAccessor {

  constructor(private fb: FormBuilder,
    private cdr:ChangeDetectorRef) { }

  formArray = this.fb.array([]);

  @Input() variantProperties: SafeAny;

  @Output() removeVariant = new EventEmitter();

  writeValue(conditions:VariantCondition[]) {
    conditions?.forEach(x=>{
      this.formArray.push(this.fb.control(x));
    });
    this.cdr.detectChanges();
  }

  changeCallback: Function;
  registerOnChange(callback:SafeAny) {
    this.changeCallback = callback;
  }

  registerOnTouched() {

  }

  addNewCondition(newCondition:VariantCondition){
    this.formArray.push(this.fb.control(newCondition));
    this.changeCallback(this.formArray.value);
    this.cdr.detectChanges();
  }

  deleteCondition(index:number){
    if(this.formArray.length==1){
      //popover
    } else {
      this.formArray.removeAt(index);
      this.changeCallback(this.formArray.value);
      this.cdr.detectChanges();
    }
  }
}