import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlService } from './../app/shared/control.service';
import { QuillModule } from 'ngx-quill';
import { AngularMaterialComponentsModule } from './../app/shared/angular-material-components.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
      AppComponent],
    imports: [
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      AngularMaterialComponentsModule,
      BrowserAnimationsModule,
      FlexLayoutModule,
      QuillModule.forRoot({
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }]        // dropdown with defaults from theme
          ]
        }
      })
    ],
    providers: [ControlService],
    bootstrap: [AppComponent]
  })
export class AppModule { }
