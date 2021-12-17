import { Component, Inject, Input, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ComenAddonMetadata,
  ComenAddonConfiguration,
  ComenEnvironmentHost,
  ConfigurationSection,
  SafeAny,
} from '@comen/common';
import { Action, injected, mut } from 'kairo';
import { WithKairo } from '@kairo/angular';
import { merge } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { EditorEnvironmentHost } from './editor.host';
import { generateCode } from './variant/compiler';
import {
  COMEN_ADDON_METADATA,
  EditorRealtimeMessageProvider,
  EDITOR_REALTIME_MESSAGE_PROVIDER,
} from './providers';

@WithKairo()
@Component({
  selector: 'comen-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  exportAs: 'editor',
  providers: [
    {
      provide: ComenEnvironmentHost,
      useClass: EditorEnvironmentHost,
    },
  ],
})
export class EditorComponent {
  mockControl = this.fb.control(null);
  adjustments = this.fb.group({
    width: [600],
    height: [800],
    background: ['#888888'],
    grid: [false],
  });

  readonly metadata: ComenAddonMetadata;
  readonly configuration: ComenAddonConfiguration;
  readonly formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(ComenEnvironmentHost) private host: EditorEnvironmentHost,
    @Inject(EDITOR_REALTIME_MESSAGE_PROVIDER)
    @Optional()
    public realtimeMessageProvider?: EditorRealtimeMessageProvider
  ) {}

  ngSetup() {
    /** resizable */

    const metadata = injected(COMEN_ADDON_METADATA);

    const configuration = metadata.configuration;

    /** config */

    /** form */
    const formGroup = this.fb.group(
      Object.fromEntries(
        Object.entries(configuration.sections).map(([key, section]) => {
          return [
            key,
            {
              default: section.defaultValue,
              variants: [],
            },
          ];
        })
      )
    );
    Object.entries(formGroup.controls).forEach(([section, control]) => {
      control.valueChanges
        .pipe(
          debounceTime(0) // NB: avoid repeating singal in one eventloop execution
        )
        .subscribe((val) => {
          this.host.emitConfig(section, val.default);
          this.host.emitVariantPipe(
            section,
            new Function('c', generateCode(val))
          );
        });
    });

    return {
      formGroup,
      configuration,
      metadata,
    };
  }

  importWorkspace(workspace: EditorWorkspace) {
    this.adjustments.patchValue(workspace.adjustments, {
      emitEvent: false,
    });
    this.formGroup.patchValue(workspace.values, { emitEvent: false });
    this.mockControl.patchValue(workspace.mocks, { emitEvent: false });
    Object.entries(this.formGroup.controls).forEach(([section, control]) => {
      this.host.emitConfig(section, control.value.default);
      this.host.emitVariantPipe(
        section,
        new Function('c', generateCode(control.value))
      );
    });
  }

  exportWorkspace() {
    return {
      values: this.formGroup.value,
      mocks: this.mockControl.value,
      adjustments: this.adjustments.value,
    } as EditorWorkspace;
  }

  generateWorkspace(): SafeAny {
    return Object.fromEntries(
      Object.entries(this.formGroup.value).map(
        ([key, value]: [string, SafeAny]) => {
          if (this.configuration.sections[key].variantProperties) {
            return [
              key,
              {
                default: value.default,
                variantsPipe: generateCode(value),
              },
            ];
          } else {
            return [
              key,
              {
                default: value.default,
              },
            ];
          }
        }
      )
    );
  }

  workspaceChange(_debounceTime: number = 0) {
    return merge(
      this.adjustments.valueChanges,
      this.formGroup.valueChanges,
      this.mockControl.valueChanges
    ).pipe(
      map(() => {
        return this.exportWorkspace();
      }),
      debounceTime(_debounceTime)
    );
  }

  ngAfterViewInit() {
    // console.log('wtf>');
    // this.realtimeMessageProvider!.connect({
    //     source: 'bilibili',
    //     channel: 545
    // }).subscribe(x=>{
    //     this.host.emitMessage(x);
    // })
  }
}

export interface EditorWorkspace {
  adjustments: {
    width: string;
    height: string;
  };
  mocks: {};
  values: SafeAny;
}
