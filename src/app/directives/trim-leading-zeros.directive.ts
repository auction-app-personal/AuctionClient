import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrimLeadingZeros]',
  standalone: true
})
export class TrimLeadingZerosDirective {
  constructor(
    private el: ElementRef<HTMLInputElement>,
    @Optional() private ngControl: NgControl | null
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement;
    const { selectionStart } = input; // save caret position
    let value = input.value ?? '';

    // Edge case: user types just '.' (or starts with dot)
    if (value === '' && (event as InputEvent).data === '.') {
      value = '0.';
    } else if (value.startsWith('.')) {
      value = '0' + value;
    }

    // Remove leading zeros (but keep single zero before dot)
    value = value.replace(/^0+(?=\d)/, '');

    // Remove trailing dot if it’s at the end and not followed by digits
    if (value.endsWith('.') && value.indexOf('.') === value.length - 1) {
      value = value.slice(0, -1);
    }

    // Only update if the value changed
    if (input.value !== value) {
      input.value = value;
      this.ngControl?.control?.setValue(value, { emitEvent: false });

      // Restore caret position
      if (selectionStart != null) {
        const offset = input.value.length - value.length;
        const newPos = Math.max(0, selectionStart - offset);
        setTimeout(() => input.setSelectionRange(newPos, newPos));
      }
    }
  }
}