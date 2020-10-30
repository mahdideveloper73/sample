import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SampleTestModule } from '../../../test.module';
import { OrOrganizationUnitUpdateComponent } from 'app/entities/or-organization-unit/or-organization-unit-update.component';
import { OrOrganizationUnitService } from 'app/entities/or-organization-unit/or-organization-unit.service';
import { OrOrganizationUnit } from 'app/shared/model/or-organization-unit.model';

describe('Component Tests', () => {
  describe('OrOrganizationUnit Management Update Component', () => {
    let comp: OrOrganizationUnitUpdateComponent;
    let fixture: ComponentFixture<OrOrganizationUnitUpdateComponent>;
    let service: OrOrganizationUnitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SampleTestModule],
        declarations: [OrOrganizationUnitUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OrOrganizationUnitUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrOrganizationUnitUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrOrganizationUnitService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrOrganizationUnit(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrOrganizationUnit();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
