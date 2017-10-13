import { Component, QueryList, ViewChildren } from '@angular/core';
import { AlertController, IonicPage, ItemSliding, NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MeetupDetailsPage } from '../meetup-details/meetup-details';
import { FileChooser } from '@ionic-native/file-chooser';
import { File, FileEntry } from '@ionic-native/file';
import { Attendant } from '../../model/attendant';
import { Meetup } from '../../model/meetup';
import 'rxjs/add/operator/do';

/**
 * Generated class for the MeetupsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meetups-list',
  templateUrl: 'meetups-list.html',
})
export class MeetupsListPage {

  @ViewChildren('sliding') slidings: QueryList<ItemSliding>;
  private meetup: Meetup = new Meetup();
  meetupsObservable: FirebaseListObservable<Meetup[]>;
  meetups: Meetup[] = [];

  constructor(private navCtrl: NavController,
              private alertCtrl: AlertController,
              private db: AngularFireDatabase,
              private fileChooser: FileChooser,
              private file: File) { }

  ionViewDidLoad() {
    this.meetupsObservable = this.db.list('meetups');
    this.meetupsObservable.subscribe(meetups => this.meetups = meetups);
  }

  goToMeetup(meetup: Meetup) {
    this.navCtrl.push(MeetupDetailsPage, { meetupId: meetup.$key });
  }

  addMeetup() {
    this.readMeetupFromDevice(this.requestMeetupName);
  }

  update(meetup: Meetup) {
    this.meetup = meetup;
    this.readMeetupFromDevice(this.saveMeetup);
    this.slidings.forEach(sliding => sliding.close());
  }

  remove(meetup: Meetup) {
    this.meetupsObservable.remove(meetup.$key);
    this.slidings.forEach(sliding => sliding.close());
  }

  trackByFunction(index, meetup): string {
    return meetup.$key;
  }

  private readMeetupFromDevice(callback: () => void) {
    this.fileChooser.open()
        .then(uri => {
          this.file.resolveLocalFilesystemUrl(uri)
              .then((entry: FileEntry) => {

                entry.file(file => {
                  const self = this;
                  const reader = new FileReader();

                  reader.onloadend = function () {
                    self.extractAttendants(this);
                    callback();
                  };

                  reader.readAsText(file);
                });
              })
              .catch(error => console.error(error));
        });
  }

  private extractAttendants = (event) => {
    const rows = event.result.split('\n');
    rows.shift();
    const values = rows.map(row => row.split(/\t/));

    const attendants = values.filter(value => value.length >= 9)
                             .map(rawAttendant => new Attendant(rawAttendant));

    if (this.meetup.attendants) {
      attendants.forEach(meetup => {
        const oldMeetup = this.meetup.attendants.find(m => m.id === meetup.id);
        meetup.hasCome = !!oldMeetup && oldMeetup.hasCome;
      });
    }

    this.meetup.attendants = attendants;
  };

  private requestMeetupName = () => {
    const promt = this.alertCtrl.create({
      title: 'Nombre del Meetup',
      inputs: [
        { name: 'name', placeholder: 'Nombre del meetup' }
      ],
      buttons: [
        { text: 'Cancelar', handler: () => this.meetup = new Meetup() },
        {
          text: 'Guardar', handler: (data) => {
          this.meetup.name = data.name;
          this.saveMeetup();
        }
        }
      ]
    });

    promt.present();
  };

  private saveMeetup = () => {
    if (this.meetup.$key) {
      this.meetupsObservable.update(this.meetup.$key, this.meetup)
          .then(() => this.meetup = new Meetup());
    } else {
      this.meetupsObservable.push(this.meetup)
          .then(() => this.meetup = new Meetup());
    }
  };
}
