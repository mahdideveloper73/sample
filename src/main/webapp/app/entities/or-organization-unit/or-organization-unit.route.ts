import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOrOrganizationUnit, OrOrganizationUnit } from 'app/shared/model/or-organization-unit.model';
import { OrOrganizationUnitService } from './or-organization-unit.service';
import { OrOrganizationUnitComponent } from './or-organization-unit.component';
import { OrOrganizationUnitDetailComponent } from './or-organization-unit-detail.component';
import { OrOrganizationUnitUpdateComponent } from './or-organization-unit-update.component';

@Injectable({ providedIn: 'root' })
export class OrOrganizationUnitResolve implements Resolve<IOrOrganizationUnit> {
  constructor(private service: OrOrganizationUnitService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrOrganizationUnit> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((orOrganizationUnit: HttpResponse<OrOrganizationUnit>) => {
          if (orOrganizationUnit.body) {
            return of(orOrganizationUnit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OrOrganizationUnit());
  }
}

export const orOrganizationUnitRoute: Routes = [
  {
    path: '',
    component: OrOrganizationUnitComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sampleApp.orOrganizationUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrOrganizationUnitDetailComponent,
    resolve: {
      orOrganizationUnit: OrOrganizationUnitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sampleApp.orOrganizationUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrOrganizationUnitUpdateComponent,
    resolve: {
      orOrganizationUnit: OrOrganizationUnitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sampleApp.orOrganizationUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrOrganizationUnitUpdateComponent,
    resolve: {
      orOrganizationUnit: OrOrganizationUnitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sampleApp.orOrganizationUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
