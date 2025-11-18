import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CowFilterState } from '../../../core/services/cow.service';
import { CowStatus } from '../../../core/models/cow-status.enum';

@Component({
  selector: 'app-cow-filters',
  templateUrl: './cow-filters.component.html',
  styleUrls: ['./cow-filters.component.scss']
})
export class CowFiltersComponent {
  @Input() filterState!: CowFilterState;
  @Input() pens: string[] = [];

  @Output() filterChange = new EventEmitter<Partial<CowFilterState>>();

  cowStatus = CowStatus;

  statusOptions = [
    { label: 'All statuses', value: 'ALL' },
    { label: 'Active', value: CowStatus.ACTIVE },
    { label: 'In Treatment', value: CowStatus.IN_TREATMENT },
    { label: 'Deceased', value: CowStatus.DECEASED }
  ];

  get penOptions() {
    const base = [{ label: 'All pens', value: 'ALL' }];
    const pens = this.pens.map(p => ({ label: p, value: p }));
    return [...base, ...pens];
  }

  onTagSearchChange(value: string): void {
    this.filterChange.emit({ tagSearch: value });
  }

  onStatusChange(value: CowStatus | 'ALL'): void {
    this.filterChange.emit({ status: value });
  }

  onPenChange(value: string | 'ALL'): void {
    this.filterChange.emit({ pen: value });
  }

  onSearchClick(){}
}
