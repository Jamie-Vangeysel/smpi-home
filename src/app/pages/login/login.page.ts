import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading: HTMLIonLoadingElement;
  appVersion: string = '1.0.0';

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]]
    });
    this.ref.markForCheck();
  }

  login() {
    if (this.loginForm.valid) {
      const loginValue: {
        username: string
      } = this.loginForm.value;

      window.localStorage.setItem('smpiHome.username', loginValue.username);
      this.router.navigate(['/tabs']);
    } else {
      this.alert(this.translate.instant('pages.login.invalid-form-error'));
    }
  }

  private async alert(message: string) {
    const alert = await this.alertCtrl.create({
      message,
      header: 'Alert!',
      cssClass: 'danger'
    });
    await alert.present();
  }

  get culture(): string {
    return this.translate.currentLang + '-BE';
  }
}
