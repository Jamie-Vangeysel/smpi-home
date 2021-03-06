import { Component, OnInit } from '@angular/core';

import { Plugins, StatusBarStyle } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { Config, Platform } from '@ionic/angular';
import { environment } from '../environments/environment';
import { LocationService } from './core/location.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private config: Config,
    private locationService: LocationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    this.platform.ready().then(async () => {
      if (this.platform.is('hybrid')) {
        await StatusBar.setStyle({ style: StatusBarStyle.Light });
        await SplashScreen.hide();
      }

      this.locationService.start();
    });
    this.initTranslate();
  }

  ngOnInit() {
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang(environment.default_language);
    const browserLang = this.translate.getBrowserLang();

    // allowed languages
    this.translate.addLangs(environment.supported_languages);

    if (browserLang && environment.supported_languages.some(e => e === browserLang)) {
      this.translate.use(browserLang);
    } else {
      this.translate.use(environment.default_language);
    }

    this.translate.get(['backButtonText']).subscribe(values => {
      this.config.set('backButtonText', values.backButtonText);
    });
  }
}
