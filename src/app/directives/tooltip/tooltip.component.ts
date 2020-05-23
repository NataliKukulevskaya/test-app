import {Component, Input} from '@angular/core';

@Component({
  selector: 'ta-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TaTooltipComponent {
  @Input() text = '';

  constructor() { }

  onClick(e: MouseEvent) {
    e.stopPropagation();
  }
}
