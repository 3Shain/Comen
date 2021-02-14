import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, defer, Observable } from 'rxjs';
import { map, publishBehavior, refCount } from 'rxjs/operators';
import { OverlayInfo } from '../../addon/definations';
import { LookupService } from '../../addon/lookup.service';
import { ComenFile, FileStorage } from '../../file';
import { nanoid } from 'nanoid';

@Component({
    selector: 'comen-home',
    templateUrl: './home.page.html',
    styleUrls: [
        './home.page.scss'
    ]
})
// eslint-disable-next-line
export class HomePage {

    constructor(
        private file: FileStorage,
        private lookup: LookupService,
        private router: Router) {
    }


    overlays$ = defer(() => this.lookup.getOverlays()).pipe(
        publishBehavior([]),
        refCount()
    ) as Observable<OverlayInfo[]>;

    files$ = combineLatest([this.overlays$, defer(() => this.file.getList())]).pipe(
        map(([overlays, files]) => {
            return files.map(x => {
                return {
                    ...overlays.find(s => s.name == x.constraint.name),
                    ...x
                }
            });
        }),
        publishBehavior([]),
        refCount()
    );

    addFile() {
        // add file plane:
    }

    async open(file: ComenFile) {
        this.router.navigate(['edit'], {
            queryParams: {
                o: file.constraint.name,
                id: file.id
            }
        });
    }

    async create(overlay: OverlayInfo) {
        const file = await this.file.addNewFile(`${overlay.displayName}-${nanoid(8)}`, {
            name: overlay.name,
            version: overlay.version
        });
        this.router.navigate(['edit'], {
            queryParams: {
                o: overlay.name,
                id: file.id
            }
        });
    }
}