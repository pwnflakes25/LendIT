import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes
} from "@angular/animations";

  // export function slideTo(direction) {
  //    const optional = {optional: true};
  //    return [
  //      query(':enter, :leave', [
  //        style({
  //          position: 'absolute',
  //          top: 0,
  //          [direction]: 0,
  //          width: '100%'
  //        })
  //      ], optional),
  //      query(':enter', [
  //        style({[direction]: '-100%'})
  //      ]),
  //      group([
  //        query(':leave', [
  //          animate('800ms ease', style({[direction]: '100%'}))
  //        ], optional),
  //        query(':enter', [
  //          animate('800ms ease', style({[direction]: '0%'}))
  //        ])
  //      ]),
  //    ];
  //  }

const optional = {optional: true};
  const slideToRight = [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ], optional),
        query(':enter', [
          style({right: '-100%'})
        ]),
        group([
          query(':leave', [
            animate('800ms ease', style({right: '100%'}))
          ], optional),
          query(':enter', [
            animate('800ms ease', style({right: '0%'}))
          ])
        ]),
      ];


  let slideToLeft = [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ], optional),
        query(':enter', [
          style({left: '-100%'})
        ]),
        group([
          query(':leave', [
            animate('800ms ease', style({left: '100%'}))
          ], optional),
          query(':enter', [
            animate('800ms ease', style({left: '0%'}))
          ])
        ]),
      ];


export const slider =
  trigger('routeAnimations', [
    transition('isRight => isLeft', slideToLeft),
    transition('isLeft => isRight', slideToRight),
    transition('isRight => isMoreRight', slideToRight),
    transition('isMoreRight => *', slideToLeft)
  ])
