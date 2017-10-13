import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetupDetailsPage } from './meetup-details';

@NgModule({
  declarations: [
    MeetupDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetupDetailsPage),
  ],
})
export class MeetupDetailsPageModule {}
