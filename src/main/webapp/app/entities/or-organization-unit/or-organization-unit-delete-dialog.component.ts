import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrOrganizationUnit } from 'app/shared/model/or-organization-unit.model';
import { OrOrganizationUnitService } from './or-organization-unit.service';

@Component({
  templateUrl: './or-organization-unit-delete-dialog.component.html',
})
export class OrOrganizationUnitDeleteDialogComponent {
  orOrganizationUnit?: IOrOrganizationUnit;

  constructor(
    protected orOrganizationUnitService: OrOrganizationUnitService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.orOrganizationUnitService.delete(id).subscribe(() => {
      this.eventManager.broadcast('orOrganizationUnitListModification');
      this.activeModal.close();
    });
  }
}
