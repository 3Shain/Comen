import { animate, style, transition, trigger } from '@angular/animations';

export const SLIDEDOWN = trigger('slideDown',[
    transition(':leave',[
        style({
            transform: 'translateY(0)',
            opacity:1
        }),
        animate('0.2s cubic-bezier(0.4, 0, 1, 1)',style({
            opacity: 0.5,
            transform: 'translateY(44px)'
        }))
    ])
])