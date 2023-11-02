import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from './value-accessor';
const handlecngEvt = 'handleChangeEvent($event.target.value)';
@Directive({
  selector: 'nexus-input, nexus-textarea',
  host: {
    '(blur)': handlecngEvt,
    '(change)': handlecngEvt,
    '(input)': handlecngEvt
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextValueAccessor,
      multi: true
    }
  ]
})
export class TextValueAccessor extends ValueAccessor {
  constructor(el: ElementRef) {
    super(el);
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }
}
