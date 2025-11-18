import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CowService } from '../../../core/services/cow.service';
import { Cow } from '../../../core/models/cow.model';
import { CowEvent } from '../../../core/models/cow-event.model';

@Component({
  selector: 'app-cow-detail',
  templateUrl: './cow-detail.component.html',
  styleUrls: ['./cow-detail.component.scss']
})
export class CowDetailComponent implements OnInit, OnDestroy {
  cow?: Cow;
  lastEvents: CowEvent[] = [];
  private subs = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cowService: CowService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/cows']);
      return;
    }

    this.subs.add(
      this.cowService.getCowById(id).subscribe(cow => {
        if (!cow) {
          this.router.navigate(['/cows']);
          return;
        }
        this.cow = cow;
        this.lastEvents = (cow.events ?? [])
          .slice()
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  backToList(): void {
    this.router.navigate(['/cows']);
  }

  getSexLabel(): string {
    if (!this.cow) {
      return '';
    }
    return this.cow.sex === 'F' ? 'Female' : 'Male';
  }
}
