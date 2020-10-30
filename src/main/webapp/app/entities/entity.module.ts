import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'or-organization-unit',
        loadChildren: () => import('./or-organization-unit/or-organization-unit.module').then(m => m.SampleOrOrganizationUnitModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SampleEntityModule {}
