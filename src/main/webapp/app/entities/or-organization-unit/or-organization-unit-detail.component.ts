import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrOrganizationUnit } from 'app/shared/model/or-organization-unit.model';

@Component({
  selector: 'jhi-or-organization-unit-detail',
  templateUrl: './or-organization-unit-detail.component.html',
})
export class OrOrganizationUnitDetailComponent implements OnInit {
  orOrganizationUnit: IOrOrganizationUnit | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orOrganizationUnit }) => (this.orOrganizationUnit = orOrganizationUnit));
  }

  previousState(): void {
    window.history.back();
  }
}
