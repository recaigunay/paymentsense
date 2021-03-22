import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BreakPointModel } from '../models/breakpoint-model';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  breakPointValue$ = new BehaviorSubject<BreakPointModel>(null);
  constructor(private breakpointObserver: BreakpointObserver) { }

  setBreakPoint() {
    const breakPointValues: BreakPointModel = {
      isMiniPhone: this.breakpointObserver.isMatched('(max-width: 350px)'),
      isSmallPhone: this.breakpointObserver.isMatched('(max-width: 400px)'),
      isPhone: this.breakpointObserver.isMatched('(max-width: 599px)'),
      isTablet: this.breakpointObserver.isMatched('(max-width: 770px)'),
      isWideTablet: this.breakpointObserver.isMatched('(max-width: 1199px)'),
      isDesktop: this.breakpointObserver.isMatched('(max-width: 1200px)'),
      isWideDesktop: this.breakpointObserver.isMatched('(min-width: 1400px)')
    }
    this.breakPointValue$.next(breakPointValues);
  }

  getBreakPoint() {
    return this.breakPointValue$;
  }
  
}
