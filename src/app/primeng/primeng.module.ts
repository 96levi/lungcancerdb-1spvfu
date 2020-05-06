import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LightboxModule } from 'primeng/lightbox';


@NgModule({
  declarations: [],
  imports: [
    SidebarModule,
    InputSwitchModule,
    LightboxModule,
  ],
  exports: [
    SidebarModule,
    InputSwitchModule,
    LightboxModule
  ]
})
export class PrimengModule { }
