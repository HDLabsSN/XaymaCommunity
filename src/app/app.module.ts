import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { DataService } from './services/data.service'
import { SmsService } from './services/sms.service'

import { AppComponent } from './app.component';
import { MembreComponent } from './components/membre/membre.component';
import { HomeComponent } from './components/home/home.component';
import { SectionComponent } from './components/section/section.component';
import { MessageIndexComponent } from './components/message/message-index/message-index.component';
import { MessageNewComponent } from './components/message/message-new/message-new.component';
import { MessageEditComponent } from './components/message/message-edit/message-edit.component';
import { MessageDetailsComponent } from './components/message/message-details/message-details.component';

const appRoutes:Routes=[
  {path:'', component:HomeComponent},
  {path:'membre', component:MembreComponent},
  {path:'section', component:SectionComponent},
  {path:'message', redirectTo: 'message/envoyes'},
  {path:'message/envoyes', component:MessageIndexComponent},
  {path:'message/nouveau', component:MessageNewComponent},
  {path:'message/modifier', component:MessageEditComponent},
  {path:'message/:id/details', component:MessageDetailsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MembreComponent,
    HomeComponent,
    SectionComponent,
    MessageIndexComponent, MessageNewComponent,  MessageEditComponent,  MessageDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    HttpModule,
  ],
  providers: [DataService, SmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
