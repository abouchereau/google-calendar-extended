import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Modal } from 'bootstrap';
import { AdminFooter } from '../admin-footer/admin-footer';
import { Job } from '../../models/entity/job';
import { JobService } from '../../services/job.service';
import { LoaderService } from '../../services/loader.service';
import { AdminJobData } from '../../core/resolver/admin-job.resolver';

@Component({
  selector: 'app-admin-job',
  imports: [FormsModule, AdminFooter],
  templateUrl: './admin-job.html',
  styleUrl: './admin-job.css',
})
export class AdminJob implements AfterViewInit {

  private readonly route = inject(ActivatedRoute);
  private readonly jobService = inject(JobService);
  private readonly loader = inject(LoaderService);

  cals: Record<string, Job[]> = {};
  curCal = '';
  calList: string[] = [];
  iconList: string[] = [];
  choosenIcon: string | null = null;
  newJob = '';
  modal: Modal | null = null;

  @ViewChild('modalIcons')
  modalElement!: ElementRef<HTMLDivElement>;

  constructor() {
    this.route.data.subscribe(({ data }) => {
      this.applyData(data as AdminJobData);
    });
  }

  ngAfterViewInit(): void {
    this.modal = new Modal(this.modalElement.nativeElement);
  }

  private applyData(data: AdminJobData): void {
    this.cals = data.cals;
    this.calList = data.calList;
    this.iconList = data.iconList;
    this.curCal = this.calList[0] ?? '';
    this.choosenIcon = null;
    this.newJob = '';
  }

  private async reloadJobs(): Promise<void> {
    const [cals, iconList] = await Promise.all([
      firstValueFrom(this.jobService.getAllJobs()),
      firstValueFrom(this.jobService.getAllIcons()),
    ]);

    this.cals = cals;
    this.iconList = iconList;
    this.calList = Object.keys(cals);
    if (!this.calList.includes(this.curCal)) {
      this.curCal = this.calList[0] ?? '';
    }
  }

  async addJob(): Promise<void> {
    if (!this.curCal || !this.newJob.trim()) {
      return;
    }

    this.loader.show();
    try {
      await firstValueFrom(this.jobService.addJob(this.curCal, this.newJob.trim(), this.choosenIcon));
      await this.reloadJobs();
      this.newJob = '';
      this.choosenIcon = null;
    } finally {
      this.loader.hide();
    }
  }

  async deleteJob(id: number): Promise<void> {
    const job = this.cals[this.curCal]?.find(a => a.id === id);
    if (!job) {
      return;
    }

    if (!confirm(`Veux-tu vraiment supprimer le poste ${job.label}`)) {
      return;
    }

    this.loader.show();
    try {
      await firstValueFrom(this.jobService.deleteJob(id));
      await this.reloadJobs();
    } finally {
      this.loader.hide();
    }
  }

  openIconsModal(): void {
    this.modal?.show();
  }

  chooseIcon(icon: string): void {
    this.choosenIcon = icon;
    this.modal?.hide();
  }
}
