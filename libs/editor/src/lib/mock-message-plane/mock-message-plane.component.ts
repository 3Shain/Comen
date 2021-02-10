import { ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComenEnvironmentHost, SafeAny } from '@comen/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorEnvironmentHost } from '../editor.host';
import { EditorRealtimeMessageProvider, EDITOR_REALTIME_MESSAGE_PROVIDER } from '../providers';

@Component({
  selector: 'comen-mock-message-plane',
  templateUrl: './mock-message-plane.component.html',
  styleUrls: ['./mock-message-plane.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MockMessagePlaneComponent,
      multi: true
    }
  ]
})
export class MockMessagePlaneComponent implements ControlValueAccessor {

  realtimeConnecting = false;

  currentSelect = '';

  disconnect$ = new Subject<void>();

  mockGens: {
    id: string;
    name: string;
    generator: SafeAny[];
  }[];

  constructor(
    @Inject(ComenEnvironmentHost) private host: EditorEnvironmentHost,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject(EDITOR_REALTIME_MESSAGE_PROVIDER) @Optional() public realtimeMessageProvider?: EditorRealtimeMessageProvider
  ) { }

  connectRealtimeSource(event: MouseEvent) {
    if (this.realtimeConnecting) {
      this.disconnect$.next();
    } else {
      this.realtimeConnecting = true;
      this.realtimeMessageProvider!.connect({
        target: event.currentTarget
      }).pipe(takeUntil(this.disconnect$)).subscribe(
        (value) => {
          this.host.emitMessage(value);
        },
        (e) => {
          console.error(e);
        },
        () => {
          this.realtimeConnecting = false;
          this.cdr.markForCheck();
        }
      );
    }
  }

  addMock() {

  }

  editMock() {

  }

  deleteMock() {

  }

  writeValue(value: SafeAny) {
    this.mockGens = value;
  }

  registerOnChange() {

  }

  registerOnTouched() {

  }

  ngOnDestroy() {
    this.disconnect$.next();
    this.disconnect$.complete();
  }
}
