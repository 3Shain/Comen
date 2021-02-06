import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConfigurationSection, SafeAny, VariantCondition } from '@comen/common';
import { PLANE_SLIDE } from './animations';

@Component({
  selector: 'comen-config-plane',
  templateUrl: './config-plane.component.html',
  styleUrls: ['./config-plane.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ConfigPlaneComponent,
    multi: true
  }],
  animations: [PLANE_SLIDE],
  host: {
    '[@slide]': ''
  },
})
export class ConfigPlaneComponent implements ControlValueAccessor {

  @Input() sectionSetting: ConfigurationSection;

  constructor(private fb: FormBuilder) { }

  formGroup = this.fb.group({
    default: this.fb.control({}),
    variants: this.fb.array([])
  });

  get formArray() {
    return this.formGroup.get('variants') as FormArray;
  }

  get vairantProperties(){
    return this.sectionSetting.variantProperties;
  }

  addNewVariant(condition: VariantCondition) {
    this.formArray.push(this.fb.group({
      condition: [[condition]],
      properties: [{}]
    }));
  }

  removeVariant(index: number) {
    this.formArray.removeAt(index);
  }

  writeValue(value: {
    default: SafeAny,
    variants: {
      condition: SafeAny[],
      properties: SafeAny
    }[]
  }) {
    value.variants?.forEach(val => {
      this.formArray.push(this.fb.group({
        condition: this.fb.control(val.condition),
        properties: val.properties
      }));
    })
    this.formGroup.get('default').setValue(value.default);
  }

  registerOnChange(callback: (val: SafeAny) => unknown) {
    this.formGroup.valueChanges.subscribe(callback);
  }

  registerOnTouched() {

  }
}
