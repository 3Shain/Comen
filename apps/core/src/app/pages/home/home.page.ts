import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'comen-home',
    templateUrl: './home.page.html',
    styleUrls: [
        './home.page.scss'
    ]
})
// eslint-disable-next-line
export class HomePage implements OnInit, OnDestroy {

    platform$: Subject<string> = new BehaviorSubject(localStorage.getItem('platform') ?? 'bilibili');

    roomId = new FormControl(localStorage.getItem('roomId') ?? '123456');
    roomIdSubscription: Subscription;

    generatedLink = combineLatest([this.platform$, this.roomId.valueChanges.pipe(startWith(this.roomId.value))]).pipe(
        map(([platform, id]) => {
            return `${window.location.origin}/${platform}/${id}`
        })
    )

    constructor(private title: Title) {
        title.setTitle('主页');
        if (window.location.host == 'bilichat.3shain.com') {
            window.location.href = 'https://github.com/3Shain/Comen/tree/bilichat';
        }
    }

    ngOnInit() {
        this.roomIdSubscription = this.roomId.valueChanges.subscribe(id => {
            localStorage.setItem('roomId', id)
        });
    }

    setPlatform(platform: string) {
        this.platform$.next(platform);
        localStorage.setItem('platform', platform);
    }

    clickLink(event:Event){
        (event.target as HTMLInputElement).select();
        document.execCommand('copy');
    }

    ngOnDestroy() {
        this.roomIdSubscription.unsubscribe();
    }
}