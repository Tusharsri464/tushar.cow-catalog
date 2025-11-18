import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cow } from '../models/cow.model';
import { CowStatus } from '../models/cow-status.enum';
import { LocalStorageService } from './local-storage.service';
import { CowEvent } from '../models/cow-event.model';
import { CowEventType } from '../models/cow-event-type.enum';

export interface CowFilterState {
  tagSearch: string;
  status: CowStatus | 'ALL';
  pen: string | 'ALL';
}

const STORAGE_KEY = 'cowCatalog.cows';

@Injectable({
  providedIn: 'root'
})
export class CowService {
  private readonly cowsSubject = new BehaviorSubject<Cow[]>([]);
  readonly cows$ = this.cowsSubject.asObservable();

  private readonly filterStateSubject = new BehaviorSubject<CowFilterState>({
    tagSearch: '',
    status: 'ALL',
    pen: 'ALL'
  });

  readonly filterState$ = this.filterStateSubject.asObservable();

  constructor(private readonly storage: LocalStorageService) {
    const persisted = this.storage.getItem<Cow[]>(STORAGE_KEY);
    if (persisted && persisted.length) {
      this.cowsSubject.next(persisted);
    } else {
      const seed = this.buildMockData();
      this.cowsSubject.next(seed);
      this.persist();
    }
  }


  getCowById(id: string): Observable<Cow | undefined> {
    return this.cows$.pipe(
      map(cows => cows.find(c => c.id === id))
    );
  }

  getCowByTag(tag: string): Cow | undefined {
    return this.cowsSubject.value.find(c => c.earTag.toLowerCase() === tag.toLowerCase());
  }

  upsertCow(cow: Cow): void {
    const list = [...this.cowsSubject.value];
    const existingIndex = list.findIndex(c => c.id === cow.id);
    if (existingIndex >= 0) {
      list[existingIndex] = cow;
    } else {
      list.push(cow);
    }
    this.cowsSubject.next(list);
    this.persist();
  }

  addCowEvent(cowId: string, event: CowEvent): void {
    const list = [...this.cowsSubject.value];
    const idx = list.findIndex(c => c.id === cowId);
    if (idx < 0) {
      return;
    }
    const cow = list[idx];
    const events = [...(cow.events ?? []), event]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const lastEventDate = events[0]?.date ?? cow.lastEventDate;
    list[idx] = { ...cow, events, lastEventDate };
    this.cowsSubject.next(list);
    this.persist();
  }

  deleteCow(id: string): void {
    const list = this.cowsSubject.value.filter(c => c.id !== id);
    this.cowsSubject.next(list);
    this.persist();
  }

  hasCowWithEarTag(tag: string, excludeId?: string): boolean {
    return this.cowsSubject.value.some(c =>
      c.earTag.toLowerCase() === tag.toLowerCase() && c.id !== excludeId
    );
  }

  updateFilters(partial: Partial<CowFilterState>): void {
    const next = { ...this.filterStateSubject.value, ...partial };
    this.filterStateSubject.next(next);
  }

   getFilteredCows$(): Observable<Cow[]> {
  return combineLatest([
    this.cows$,
    this.filterState$
  ]).pipe(
    map(([cows, filters]) => this.applyFilters(cows, filters))
  );
}

  getFilterSnapshot(): CowFilterState {
    return this.filterStateSubject.value;
  }

  // Get Pens list
  getDistinctPens(): string[] {
    const pens = new Set<string>();
    this.cowsSubject.value.forEach(c => pens.add(c.pen));
    return Array.from(pens).sort();
  }

  // Apply filters to cows
  private applyFilters(cows: Cow[], filters: CowFilterState): Cow[] {
    return cows.filter(cow => {
      const matchesTag =
        !filters.tagSearch ||
        cow.earTag.toLowerCase().includes(filters.tagSearch.toLowerCase());

      const matchesStatus =
        filters.status === 'ALL' || cow.status === filters.status;

      const matchesPen =
        filters.pen === 'ALL' || cow.pen === filters.pen;

      return matchesTag && matchesStatus && matchesPen;
    });
  }

  // Store Item into local storage
  private persist(): void {
    this.storage.setItem(STORAGE_KEY, this.cowsSubject.value);
  }

  // Create Mock data for initial load
  private buildMockData(): Cow[] {
    const now = new Date();
    const daysAgo = (d: number) => {
      const dt = new Date(now);
      dt.setDate(dt.getDate() - d);
      return dt.toISOString();
    };

    const cow1: Cow = {
      id: '1',
      earTag: '1001',
      sex: 'F',
      pen: 'A1',
      status: CowStatus.ACTIVE,
      weight: 550,
      dailyWeightGain: 1.1,
      lastEventDate: daysAgo(2),
      events: [
        {
          id: 'e1',
          cowTag: '1001',
          type: CowEventType.WEIGHT_CHECK,
          description: 'Routine weight check. All good.',
          date: daysAgo(2)
        },
        {
          id: 'e2',
          cowTag: '1001',
          type: CowEventType.PEN_CHANGED,
          description: 'Moved from pen A0 to A1.',
          date: daysAgo(7)
        }
      ]
    };

    const cow2: Cow = {
      id: '2',
      earTag: '1002',
      sex: 'M',
      pen: 'B1',
      status: CowStatus.IN_TREATMENT,
      weight: 620,
      dailyWeightGain: 0.5,
      lastEventDate: daysAgo(1),
      events: [
        {
          id: 'e3',
          cowTag: '1002',
          type: CowEventType.TREATMENT,
          description: 'Antibiotic treatment started.',
          date: daysAgo(1)
        }
      ]
    };

    const cow3: Cow = {
      id: '3',
      earTag: '1003',
      sex: 'F',
      pen: 'C3',
      status: CowStatus.DECEASED,
      weight: 480,
      lastEventDate: daysAgo(10),
      events: [
        {
          id: 'e4',
          cowTag: '1003',
          type: CowEventType.DEATH,
          description: 'Found deceased in pen C3.',
          date: daysAgo(10)
        }
      ]
    };

    return [cow1, cow2, cow3];
  }
}
