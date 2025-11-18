import { Pipe, PipeTransform } from '@angular/core';
import { CowStatus } from '../../core/models/cow-status.enum';

@Pipe({
  name: 'statusLabel'
})
export class StatusLabelPipe implements PipeTransform {
  transform(value: CowStatus): string {
    switch (value) {
      case CowStatus.ACTIVE:
        return 'Active';
      case CowStatus.IN_TREATMENT:
        return 'In Treatment';
      case CowStatus.DECEASED:
        return 'Deceased';
      default:
        return value;
    }
  }
}
