import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Meetup } from '../../model/meetup';
import { Attendant } from '../../model/attendant';

@IonicPage()
@Component({
  selector: 'page-meetup-details',
  templateUrl: 'meetup-details.html',
})
export class MeetupDetailsPage {

  meetupObservable: FirebaseObjectObservable<Meetup>;
  meetup: Meetup;

  constructor(public navParams: NavParams,
              private db: AngularFireDatabase) { }

  ionViewDidLoad() {
    this.meetupObservable = this.db.object(`meetups/${this.navParams.get('meetupId')}`);
    this.meetupObservable.subscribe(meetup => this.meetup = new Meetup(meetup));
  }

  toggleHasCome(attendant: Attendant) {
    attendant.hasCome = !attendant.hasCome;
    this.meetupObservable.update({ attendants: this.meetup.attendants });
  }
}
