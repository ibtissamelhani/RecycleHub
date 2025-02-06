import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function timeRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const selectedDateTime = new Date(control.value);
    if (!selectedDateTime) {
      return null;
    }

    const hours = selectedDateTime.getHours();
    const minutes = selectedDateTime.getMinutes();

    if (hours < 9 || (hours === 18 && minutes > 0) || hours >= 18) {
      return { timeRange: true };
    }

    return null;
  };
}
