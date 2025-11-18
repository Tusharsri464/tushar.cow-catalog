import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StatusLabelPipe } from './pipes/status-label.pipe';

@NgModule({
  declarations: [
    ToolbarComponent,
    StatusLabelPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CardModule,
    TimelineModule,
    DialogModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    InputNumberModule
  ],
  exports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // PrimeNG
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CardModule,
    TimelineModule,
    DialogModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    InputNumberModule,
    // Shared declarations
    ToolbarComponent,
    StatusLabelPipe
  ]
})
export class SharedModule {}
