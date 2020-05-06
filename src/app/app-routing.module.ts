import { AddPatientComponent } from './c/add-patient/add-patient.component';
import { UsComponent } from './c/examination/us/us.component';
import { TreatmentComponent } from './c/examination/treatment/treatment.component';
import { RequestComponent } from './c/examination/request/request.component';
import { PETCTComponent } from './c/examination/pet-ct/pet-ct.component';
import { PathoComponent } from './c/examination/patho/patho.component';
import { LaboComponent } from './c/examination/labo/labo.component';
import { ImmuneComponent } from './c/examination/immune/immune.component';
import { DiagnosisComponent } from './c/examination/diagnosis/diagnosis.component';
import { CtComponent } from './c/examination/ct/ct.component';
import { ClinicComponent } from './c/examination/clinic/clinic.component';
import { CbcComponent } from './c/examination/cbc/cbc.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './c/home/home.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'cbc', component: CbcComponent},
  {path: 'clinic', component: ClinicComponent},
  {path: 'ct', component: CtComponent},
  {path: 'diagnosis', component: DiagnosisComponent},
  {path: 'immune', component: ImmuneComponent},
  {path: 'labo', component: LaboComponent},
  {path: 'patho', component: PathoComponent},
  {path: 'petct', component: PETCTComponent},
  {path: 'request', component: RequestComponent},
  {path: 'treatment', component: TreatmentComponent},
  {path: 'us', component: UsComponent},
  {path: 'addpatient', component: AddPatientComponent},
  {path: 'addpatient/:stt', component: AddPatientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
