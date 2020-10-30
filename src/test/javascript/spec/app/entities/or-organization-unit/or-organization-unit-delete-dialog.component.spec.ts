import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SampleTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { OrOrganizationUnitDeleteDialogComponent } from 'app/entities/or-organization-unit/or-organization-unit-delete-dialog.component';
import { OrOrganizationUnitService } from 'app/entities/or-organization-unit/or-organization-unit.service';

describe('Component Tests', () => {
  describe('OrOrganizationUnit Management Delete Component', () => {
    let comp: OrOrganizationUnitDeleteDialogComponent;
    let fixture: ComponentFixture<OrOrganizationUnitDeleteDialogComponent>;
    let service: OrOrganizationUnitService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SampleTestModule],
        declarations: [OrOrganizationUnitDeleteDialogComponent],
      })
        .overrideTemplate(OrOrganizationUnitDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrOrganizationUnitDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrOrganizationUnitService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
