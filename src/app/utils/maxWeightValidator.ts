import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


export function maxTotalWeightValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const materials = control.value || [];
    const totalWeight = materials.reduce((sum: number, material: any) => sum + (material.weight || 0), 0);

    return totalWeight > 10 ? { maxTotalWeight: true } : null;
  };
}
