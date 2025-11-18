import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CowService } from '../../../core/services/cow.service';
import { CowStatus } from '../../../core/models/cow-status.enum';
import { Cow } from '../../../core/models/cow.model';

@Component({
  selector: 'app-cow-form',
  templateUrl: './cow-form.component.html',
  styleUrls: ['./cow-form.component.scss']
})
export class CowFormComponent implements OnInit {

  form!: FormGroup;
  isEditMode = false;
  cowId?: string;

  statusOptions = [
    { label: 'Active', value: CowStatus.ACTIVE },
    { label: 'In Treatment', value: CowStatus.IN_TREATMENT },
    { label: 'Deceased', value: CowStatus.DECEASED }
  ];

  sexOptions = [
    { label: 'Female', value: 'F' },
    { label: 'Male', value: 'M' }
  ];

  constructor(
    private fb: FormBuilder,
    private cowService: CowService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.cowId = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.cowId && this.cowId !== 'new') {
      this.isEditMode = true;

      this.cowService.getCowById(this.cowId).subscribe(cow => {
        if (cow) {
          this.form.patchValue({
            earTag: cow.earTag,
            sex: cow.sex,
            pen: cow.pen,
            status: cow.status,
            weight: cow.weight,
            dailyWeightGain: cow.dailyWeightGain
          });
        }
      });
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      earTag: ['', [Validators.required]],
      sex: [null, Validators.required],
      pen: ['', Validators.required],
      status: [CowStatus.ACTIVE, Validators.required],
      weight: [null, [Validators.min(1)]],
      dailyWeightGain: [null, [Validators.min(0.1)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { earTag } = this.form.value;

    // Unique Ear Tag Validation
    if (this.cowService.hasCowWithEarTag(earTag, this.cowId)) {
      this.form.get('earTag')?.setErrors({ notUnique: true });
      this.form.markAllAsTouched();
      return;
    }

    const now = new Date().toISOString();

    const cow: Cow = {
      id: this.cowId ?? this.generateId(),
      earTag: this.form.value.earTag,
      sex: this.form.value.sex,
      pen: this.form.value.pen,
      status: this.form.value.status,
      weight: this.form.value.weight ?? undefined,
      dailyWeightGain: this.form.value.dailyWeightGain ?? undefined,
      lastEventDate: now,
      events: []
    };

    this.cowService.upsertCow(cow);
    this.router.navigate(['/cows']);
  }

  cancel(): void {
    this.router.navigate(['/cows']);
  }

  private generateId(): string {
    return (
      Date.now().toString(36) + 
      Math.random().toString(36).substring(2, 9)
    );
  }
}
