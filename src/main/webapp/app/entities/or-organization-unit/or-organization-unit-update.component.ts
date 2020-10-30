import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOrOrganizationUnit, OrOrganizationUnit } from 'app/shared/model/or-organization-unit.model';
import { OrOrganizationUnitService } from './or-organization-unit.service';

@Component({
  selector: 'jhi-or-organization-unit-update',
  templateUrl: './or-organization-unit-update.component.html',
})
export class OrOrganizationUnitUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    parentId: [],
  });

  constructor(
    protected orOrganizationUnitService: OrOrganizationUnitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orOrganizationUnit }) => {
      this.updateForm(orOrganizationUnit);
    });
  }

  updateForm(orOrganizationUnit: IOrOrganizationUnit): void {
    this.editForm.patchValue({
      id: orOrganizationUnit.id,
      name: orOrganizationUnit.name,
      parentId: orOrganizationUnit.parentId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const orOrganizationUnit = this.createFromForm();
    if (orOrganizationUnit.id !== undefined) {
      this.subscribeToSaveResponse(this.orOrganizationUnitService.update(orOrganizationUnit));
    } else {
      this.subscribeToSaveResponse(this.orOrganizationUnitService.create(orOrganizationUnit));
    }
  }

  private createFromForm(): IOrOrganizationUnit {
    return {
      ...new OrOrganizationUnit(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      parentId: this.editForm.get(['parentId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrOrganizationUnit>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
