import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SampleSharedModule } from 'app/shared/shared.module';
import { OrOrganizationUnitComponent } from './or-organization-unit.component';
import { OrOrganizationUnitDetailComponent } from './or-organization-unit-detail.component';
import { OrOrganizationUnitUpdateComponent } from './or-organization-unit-update.component';
import { OrOrganizationUnitDeleteDialogComponent } from './or-organization-unit-delete-dialog.component';
import { orOrganizationUnitRoute } from './or-organization-unit.route';

@NgModule({
  imports: [SampleSharedModule, RouterModule.forChild(orOrganizationUnitRoute)],
  declarations: [
    OrOrganizationUnitComponent,
    OrOrganizationUnitDetailComponent,
    OrOrganizationUnitUpdateComponent,
    OrOrganizationUnitDeleteDialogComponent,
  ],
  entryComponents: [OrOrganizationUnitDeleteDialogComponent],
})
export class SampleOrOrganizationUnitModule {}
