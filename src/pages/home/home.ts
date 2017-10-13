import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { MeetupsListPage } from '../meetups-list/meetups-list';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  loading: Loading;
  isLoggedIn = true;

  constructor(private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Accediendo a firebase'
    });

    this.loading.present().then(() => this.initLoginProcess());
  }

  login() {
    this.loading = this.loadingCtrl.create({
      content: 'Accediendo a firebase'
    });

    this.loading.present()
        .then(() => this.authProvider.signInWithGoogle()
                        .subscribe(
                            () => this.navCtrl.setRoot(MeetupsListPage),
                            () => this.clearLoading(),
                            () => this.clearLoading())
        );
  }

  private initLoginProcess() {
    this.authProvider.authenticated.subscribe(user => {
      this.clearLoading();
      if (user) {
        this.navCtrl.setRoot(MeetupsListPage);
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  private clearLoading() {
    if (this.loading) {
      this.loading.dismiss().then(() => this.loading = null);
    }
  }
}
