import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { WEB_CLIENT_ID } from '../../config/firebase.config';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth,
              private googlePlus: GooglePlus) {
  }

  get authenticated(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  signInWithGoogle(): Observable<any> {

    const subject = new Subject();

    this.googlePlus.login({
      webClientId: WEB_CLIENT_ID
    })
        .then(res =>
            this.afAuth.auth.signInWithCredential(GoogleAuthProvider.credential(res.idToken))
                .then(() => subject.next({}))
                .catch(error => console.error(error))
        )
        .catch(error => console.error(error));

    return subject.asObservable();
  }
}
