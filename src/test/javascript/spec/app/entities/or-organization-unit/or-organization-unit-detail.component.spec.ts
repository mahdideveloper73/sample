import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SampleTestModule } from '../../../test.module';
import { OrOrganizationUnitDetailComponent } from 'app/entities/or-organization-unit/or-organization-unit-detail.component';
import { OrOrganizationUnit } from 'app/shared/model/or-organization-unit.model';

describe('Component Tests', () => {
  describe('OrOrganizationUnit Management Detail Component', () => {
    let comp: OrOrganizationUnitDetailComponent;
    let fixture: ComponentFixture<OrOrganizationUnitDetailComponent>;
    const route = ({ data: of({ orOrganizationUnit: new OrOrganizationUnit(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SampleTestModule],
        declarations: [OrOrganizationUnitDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OrOrganizationUnitDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrOrganizationUnitDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load orOrganizationUnit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.orOrganizationUnit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
