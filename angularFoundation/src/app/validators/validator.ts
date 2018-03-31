import { FormControl } from '@angular/forms';
export function priceValidator(formControl: FormControl) {
    const value = formControl.value;
    return value < 0 ? { price: { descs: '价格不能小于0' } } : null;
}
