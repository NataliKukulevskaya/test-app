import {Component} from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';

@Component({
  selector: 'ta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tooltipOverlay: OverlayRef;

  // function calling when directives make some change with overlay for manage count of tooltips on page
  onUpdateOverlay(event) {
    this.tooltipOverlay = event;
  }
}
