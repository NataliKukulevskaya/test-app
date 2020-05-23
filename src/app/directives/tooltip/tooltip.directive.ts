import {ComponentRef, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Overlay, OverlayPositionBuilder, OverlayRef, RepositionScrollStrategy, RepositionScrollStrategyConfig} from '@angular/cdk/overlay';
import {TaTooltipComponent} from './tooltip.component';
import {ComponentPortal} from '@angular/cdk/portal';

export enum KEY_CODE {
  ESCAPE = 'Escape'
}

@Directive({
  selector: '[taTooltip]'
})
export class TooltipDirective {
  @Input('taTooltip') text = '';
  @Input() overlayRef;
  @Output() updateOverlay: EventEmitter<OverlayRef> = new EventEmitter();

  @HostListener('click',  ['$event'])
  show(event: MouseEvent) {
    event.stopPropagation();
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.detachTooltip();
    }
    this.initOverlay();
    this.attachTooltip();
    this.updateOverlayState();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === KEY_CODE.ESCAPE) {
      this.detachTooltip();
      this.updateOverlayState();
    }
  }

  @HostListener('window:click', ['$event'])
  windowClickEvent(event: MouseEvent) {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.detachTooltip();
      this.updateOverlayState();
    }
  }

  constructor(private overlay: Overlay,
              private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef) { }

  initOverlay() {
    const positionStrategy = this.overlayPositionBuilder
    // Create position attached to the elementRef
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
      }]);
    // Define scroll strategy
    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    this.overlayRef = this.overlay.create({ positionStrategy, scrollStrategy });
  }

  attachTooltip() {
    const tooltipPortal = new ComponentPortal(TaTooltipComponent);

    // Attach tooltip portal to overlay
    const tooltipRef: ComponentRef<TaTooltipComponent> = this.overlayRef.attach(tooltipPortal);

    // Pass content to tooltip component instance
    tooltipRef.instance.text = this.text;
  }

  detachTooltip() {
    this.overlayRef.detach();
  }

  updateOverlayState() {
    this.updateOverlay.emit(this.overlayRef);
  }
}
