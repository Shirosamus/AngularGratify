import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MusicListViewComponent} from './music-list-view/music-list-view.component'
import {HomeViewComponent} from './home-view/home-view.component'
import { UploadFormComponent } from './upload-form/upload-form.component';

const routes: Routes = [
  {path: '', component: HomeViewComponent},
  {path: 'list', component: MusicListViewComponent},
  {path: 'upload', component: UploadFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
