import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './s/data.service';
import { KitsService } from './s/kits.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './c/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material.module';
import { registerLocaleData } from '@angular/common';
import localevi from '@angular/common/locales/vi';
import { GeneralInfoReducer, DayClinicReducer, DayWorkupReducer } from './store/reducer';
import { AppEffects } from './store/effect';
import { AddPatientComponent } from './c/add-patient/add-patient.component';
import { ClinicComponent } from './c/examination/clinic/clinic.component';
import { CbcComponent } from './c/examination/cbc/cbc.component';
import { LaboComponent } from './c/examination/labo/labo.component';
import { UsComponent } from './c/examination/us/us.component';
import { ImmuneComponent } from './c/examination/immune/immune.component';
import { CtComponent } from './c/examination/ct/ct.component';
import { PathoComponent } from './c/examination/patho/patho.component';
import { PETCTComponent } from './c/examination/pet-ct/pet-ct.component';
import { DiagnosisComponent } from './c/examination/diagnosis/diagnosis.component';
import { TreatmentComponent } from './c/examination/treatment/treatment.component';
import { RequestComponent } from './c/examination/request/request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MutationComponent } from './c/examination/mutation/mutation.component';
import { XRayComponent } from './c/examination/x-ray/x-ray.component';
import { FollowupComponent } from './c/examination/followup/followup.component';
import { ImageRenderComponent } from './c/image-render/image-render.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { PrimengModule } from './primeng/primeng.module';
import { ListAllWorkupComponent } from './c/examination/list-all-workup/list-all-workup.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ShowInfoByRangeComponent } from './c/show-info-by-range/show-info-by-range.component';
import { HeaderComponent } from './c/header/header.component';
import { FooterComponent } from './c/footer/footer.component';

registerLocaleData(localevi);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddPatientComponent,
    ClinicComponent,
    CbcComponent,
    LaboComponent,
    UsComponent,
    ImmuneComponent,
    CtComponent,
    PathoComponent,
    PETCTComponent,
    DiagnosisComponent,
    TreatmentComponent,
    RequestComponent,
    MutationComponent,
    XRayComponent,
    FollowupComponent,
    ImageRenderComponent,
    ListAllWorkupComponent,
    ShowInfoByRangeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      generalInfo: GeneralInfoReducer,
      selectDayClinic: DayClinicReducer,
      dayWorkup: DayWorkupReducer,
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    NgxImageZoomModule,
    CarouselModule.forRoot(),
    AuthModule,
    PrimengModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    KitsService,
    DataService,
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
