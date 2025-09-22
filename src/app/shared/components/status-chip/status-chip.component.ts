import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TimeEntryStatus } from '../../../core/models/enum';

@Component({
  standalone: true,
  selector: 'status-chip',
  imports: [NgClass],
  template: `<span class="chip" [ngClass]="status">{{ status }}</span>`,
  styles: [`
    .chip{padding:2px 8px;border-radius:12px;font-size:12px;text-transform:uppercase}
    .DRAFT{background:#eceff1}
    .SUBMITTED{background:#fff3e0}
    .APPROVED{background:#e8f5e9}
    .REJECTED{background:#ffebee}
    .LOCKED{background:#e0e0e0}
  `]
})
export class StatusChipComponent {
  @Input({ required: true }) status!: TimeEntryStatus;
}
