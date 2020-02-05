import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { FormControlComponent } from './common/form-control/form-control.component';
import { MyJsonPipe } from './pipe/my-json.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FormControlComponent,
    MyJsonPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
