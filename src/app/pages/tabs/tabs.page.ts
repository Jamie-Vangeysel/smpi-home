import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get username(): string {
    return window.localStorage.getItem('smpiHome.username');
  }
}
