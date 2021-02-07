import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComenAddonConfiguration, SafeAny } from '@comen/common';
import { EditorComponent } from '@comen/editor';
import { AddonService } from '../../addon/addon.service';
import { OverlayContainerDirective } from '../../addon/overlay-container.directive';

@Component({
    selector: 'comen-edit',
    templateUrl: './edit.page.html',
    styleUrls: [
        './edit.page.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
// eslint-disable-next-line
export class EditPage implements OnInit {

    configuration: ComenAddonConfiguration;
    view: SafeAny = undefined;

    @ViewChild('container', { static: true }) container: OverlayContainerDirective;
    @ViewChild('editor',{static:true}) editor: EditorComponent;

    get addonTarget() {
        return this.activatedRoute.snapshot.queryParams.addon ?? 'gamma';
    }

    constructor(private activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        addon: AddonService) {
        const inject = addon.getOverlayAddonMetadata(this.addonTarget).configuration; // TODO: reasonable default selection
        this.configuration = {
            displayName: inject.displayName,
            preset: inject.preset,
            sections: {
                '@@global': {
                    displayName: '基本设置',
                    level: 0,
                    'x-icon': 'setting',
                    properties: {
                        disableSmoother: {
                            displayName: '关闭消息平滑',
                            type: 'switch',
                            defaultValue: false
                        },
                        disableAvatarPreload: {
                            displayName: '关闭头像预加载',
                            type: 'switch',
                            defaultValue: false
                        },
                        showGiftAutoDanmaku: {
                            displayName: '显示礼物自动触发弹幕',
                            type: 'switch',
                            defaultValue: false
                        },
                        maxDanmakuNumber: {
                            displayName: '最大弹幕同时渲染数量',
                            type: 'number',
                            defaultValue: 50
                        },
                        // "groupSimilar": {
                        //     displayName: "合并相似弹幕",
                        //     type: "switch",
                        //     defaultValue: true
                        // }
                    }
                },
                ...inject.sections
            }
        }
    }

    ngOnInit() {
        this.view = this.container.bootstrap(this.addonTarget);
    }

    generate(){
        this.editor.generate();
    }
}