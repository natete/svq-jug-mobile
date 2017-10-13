import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MeetupsListPageModule } from '../pages/meetups-list/meetups-list.module';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MeetupDetailsPageModule } from '../pages/meetup-details/meetup-details.module';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { GooglePlus } from '@ionic-native/google-plus';
import { HomePageModule } from '../pages/home/home.module';
import { FIREBASE_CONFIG } from '../config/firebase.config';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HomePageModule,
    MeetupsListPageModule,
    MeetupDetailsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    FileChooser,
    File,
    GooglePlus
  ]
})
export class AppModule {}
