import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TitleResolve implements Resolve<any> {
  constructor(private titleService: Title) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.titleService.setTitle(route.data.title);
  }
}
