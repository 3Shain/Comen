import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import * as monaco from 'monaco-editor';
// @ts-ignore
// import text from '!!raw-loader!./type.d.ts.string';

@Component({
  selector: 'comen-monaco-control',
  template: `<ngx-monaco-editor [model]="model" [options]="options"></ngx-monaco-editor>`,
  styles: [
    `
      #monaco-host {
        width: 100%;
        height: 400px;
        position: relative;
        display: block;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MonacoControlComponent,
      multi: true,
    },
  ],
})
export class MonacoControlComponent implements ControlValueAccessor {
  @ViewChild('host') host: ElementRef<HTMLDivElement>;

  constructor(private fb: FormBuilder) {}
  model = {
    value:'',
    language: 'javascript'
  }

  options = {theme: 'vs-dark', language: 'javascript'};
  // monaco.editor.createModel( ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
  //   '\n'
  // ),'javascript', monaco.Uri.parse('file:///local.js'));

  ngAfterViewInit() {
    // const model =
    //   monaco.editor.createModel( ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
    //     '\n'
    //   ),'javascript', monaco.Uri.parse('file:///local.js'));
    // //   model.updateOptions({
    // //   });
    // monaco.editor.create(this.host.nativeElement, {
    //   model
    // });
    // console.log(monaco.languages.typescript.javascriptDefaults.getExtraLibs());
    // // monaco.languages.typescript.javascriptDefaults.addExtraLib(`
    // // `,"comen.d.ts");
    // monaco.languages.typescript.javascriptDefaults.addExtraLib(text,"react.d.ts");
  }

  writeValue() {}

  registerOnChange() {}

  registerOnTouched() {}
}
