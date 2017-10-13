import { Attendant } from './attendant';

export class Meetup {
  $key?: string;
  name: string;
  attendants: Attendant[];

  get haveCome(): number { return this.attendants && this.attendants.filter(attendant => attendant.hasCome).length; }

  constructor(rawMeetup: any = {}) {
    this.name = rawMeetup.name;
    this.attendants = rawMeetup.attendants;
  }
}