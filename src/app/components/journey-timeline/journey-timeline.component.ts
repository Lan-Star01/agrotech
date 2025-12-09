import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductJourney } from '../../models/product.model';

interface StageInfo {
  key: keyof ProductJourney;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-journey-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journey-timeline.component.html',
  styleUrl: './journey-timeline.component.css'
})
export class JourneyTimelineComponent {
  @Input() journey?: ProductJourney;

  stages: StageInfo[] = [
    { key: 'planting', label: 'დარგვა', icon: 'grass' },
    { key: 'growing', label: 'ზრდა', icon: 'spa' },
    { key: 'harvest', label: 'მოსავალი', icon: 'agriculture' },
    { key: 'processing', label: 'დამუშავება', icon: 'factory' },
    { key: 'packaging', label: 'შეფუთვა', icon: 'inventory_2' },
    { key: 'distribution', label: 'დისტრიბუცია', icon: 'local_shipping' }
  ];

  getActiveStages(): StageInfo[] {
    if (!this.journey) return [];
    return this.stages.filter(stage => this.journey![stage.key]);
  }

  getStageData(key: keyof ProductJourney) {
    return this.journey?.[key];
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ka-GE');
  }
}
