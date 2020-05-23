import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { TaTooltipComponent } from './directives/tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective,
    TaTooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TaTooltipComponent]
})
export class AppModule { }
