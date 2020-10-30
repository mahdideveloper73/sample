import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrOrganizationUnit } from 'app/shared/model/or-organization-unit.model';
import { OrOrganizationUnitService } from './or-organization-unit.service';
import { OrOrganizationUnitDeleteDialogComponent } from './or-organization-unit-delete-dialog.component';

@Component({
  selector: 'jhi-or-organization-unit',
  templateUrl: './or-organization-unit.component.html',
})
export class OrOrganizationUnitComponent implements OnInit, OnDestroy {
  orOrganizationUnits?: IOrOrganizationUnit[];
  eventSubscriber?: Subscription;

  constructor(
    protected orOrganizationUnitService: OrOrganizationUnitService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.orOrganizationUnitService
      .query()
      .subscribe((res: HttpResponse<IOrOrganizationUnit[]>) => (this.orOrganizationUnits = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOrOrganizationUnits();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOrOrganizationUnit): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOrOrganizationUnits(): void {
    this.eventSubscriber = this.eventManager.subscribe('orOrganizationUnitListModification', () => this.loadAll());
  }

  delete(orOrganizationUnit: IOrOrganizationUnit): void {
    const modalRef = this.modalService.open(OrOrganizationUnitDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.orOrganizationUnit = orOrganizationUnit;
  }
}
