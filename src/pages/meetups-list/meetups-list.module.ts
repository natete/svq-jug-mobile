import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetupsListPage } from './meetups-list';

@NgModule({
  declarations: [
    MeetupsListPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetupsListPage),
  ],
})
export class MeetupsListPageModule {}
