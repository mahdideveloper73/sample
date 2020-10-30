import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SampleTestModule } from '../../../test.module';
import { OrOrganizationUnitComponent } from 'app/entities/or-organization-unit/or-organization-unit.component';
import { OrOrganizationUnitService } from 'app/entities/or-organization-unit/or-organization-unit.service';
import { OrOrganizationUnit } from 'app/shared/model/or-organization-unit.model';

describe('Component Tests', () => {
  describe('OrOrganizationUnit Management Component', () => {
    let comp: OrOrganizationUnitComponent;
    let fixture: ComponentFixture<OrOrganizationUnitComponent>;
    let service: OrOrganizationUnitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SampleTestModule],
        declarations: [OrOrganizationUnitComponent],
      })
        .overrideTemplate(OrOrganizationUnitComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrOrganizationUnitComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrOrganizationUnitService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrOrganizationUnit(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.orOrganizationUnits && comp.orOrganizationUnits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
