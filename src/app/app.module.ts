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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { FormsModule } from '@angular/forms';
import { BunnyStatusComponent } from './bunny-status/bunny-status.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
// Environment configuration
import { environment } from 'src/environments/environment';
import { USE_EMULATOR as FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as DATABASE_EMULATOR } from '@angular/fire/compat/database';
import { USE_EMULATOR as FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';

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
    MatGridListModule,
    MatSnackBarModule,
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
  providers: [
    {
      provide: FIRESTORE_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 5002],
    },
    {
      provide: DATABASE_EMULATOR, // i.e., Realtime Database
      useValue: environment.production ? undefined : ['localhost', 5003],
    },
    {
      provide: FUNCTIONS_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 5006],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
