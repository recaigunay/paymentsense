import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

export const animationComeInFromTop = [
    trigger('openCloseSort', [
        // ...
        state('open', style({
            backgroundColor: '#FFFFFF',
            padding: '5px',
            opacity: 1
        })),
        state('closed', style({
            height: '0px',
            display: 'none',
            backgroundColor: '#FFFFFF',
            opacity: 0
        })),
        transition('open => closed', [
            animate('0.5s')
        ]),
        transition('closed => open', [
            animate('0.1s'),
        ]),
    ]),
];

