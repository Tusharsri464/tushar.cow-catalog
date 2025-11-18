import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cow } from '../../../core/models/cow.model';
import { CowService, CowFilterState } from '../../../core/services/cow.service';

@Component({
  selector: 'app-cow-list',
  templateUrl: './cow-list.component.html',
  styleUrls: ['./cow-list.component.scss']
})
export class CowListComponent implements OnInit, OnDestroy {
  cows: Cow[] = [];
  filterState!: CowFilterState;
  pens: string[] = [];

  private subs = new Subscription();

  constructor(
    private readonly cowService: CowService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.filterState = this.cowService.getFilterSnapshot();
    this.pens = this.cowService.getDistinctPens();

    this.subs.add(
      this.cowService.getFilteredCows$().subscribe(cows => {
        this.cows = cows;
      })
    );

    this.subs.add(
      this.cowService.filterState$.subscribe(filter => {
        this.filterState = filter;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onFilterChange(partial: Partial<CowFilterState>): void {
    this.cowService.updateFilters(partial);
  }

  onRowSelect(cow: Cow): void {
    this.router.navigate(['/cows', cow.id]);
  }

  onAddNew(): void {
    this.router.navigate(['/cows', 'new']);
  }

  getSexLabel(cow: Cow): string {
    return cow.sex === 'F' ? 'Female' : 'Male';
  }
}
