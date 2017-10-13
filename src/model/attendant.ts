import * as moment from 'moment';

export class Attendant {
  id: string;
  name: string;
  title: string;
  isHost: boolean;
  status: string;
  guests: number;
  reservedOn: string;
  joinedOn: string;
  profile: string;
  hasCome: boolean;

  constructor(rawAttendant: string[] = []) {
    this.id = rawAttendant[1] ? rawAttendant[1].replace(/[.#$/[\]\s]/g, '') : '';
    this.name = rawAttendant[0];
    this.title = rawAttendant[2];
    this.isHost = rawAttendant[3] === 'Yes';
    this.status = rawAttendant[4] === 'Yes' ? 'Con plaza' : 'En lista de espera';
    this.guests = +rawAttendant[5];
    this.reservedOn = moment(rawAttendant[6], 'MM/DD/YYYY HH:mm:ss').format('DD/MMM/YYYY - HH:mm');
    this.joinedOn = moment(rawAttendant[7], 'MM/DD/YYYY').format('DD/MMM/YYYY');
    this.profile = rawAttendant[8];
    this.hasCome = false;
  }
}
