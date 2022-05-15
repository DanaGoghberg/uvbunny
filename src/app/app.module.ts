import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BunniesComponent } from './bunnies/bunnies.component';
import { BunnyComponent } from './bunny/bunny.component';
import { BunnyDialogComponent } from './bunny-dialog/bunny-dialog.component';

import 'hammerjs'
/* Angular Fire */
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// Environment configuration
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { BunnyStatusComponent } from './bunny-status/bunny-status.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
// import {MatSnackBar} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    BunniesComponent,
    BunnyComponent,
    BunnyDialogComponent,
    BunnyStatusComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    // MatSnackBar,
    MatIconModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
    MatExpansionModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
