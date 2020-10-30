import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOrOrganizationUnit } from 'app/shared/model/or-organization-unit.model';

type EntityResponseType = HttpResponse<IOrOrganizationUnit>;
type EntityArrayResponseType = HttpResponse<IOrOrganizationUnit[]>;

@Injectable({ providedIn: 'root' })
export class OrOrganizationUnitService {
  public resourceUrl = SERVER_API_URL + 'api/or-organization-units';

  constructor(protected http: HttpClient) {}

  create(orOrganizationUnit: IOrOrganizationUnit): Observable<EntityResponseType> {
    return this.http.post<IOrOrganizationUnit>(this.resourceUrl, orOrganizationUnit, { observe: 'response' });
  }

  update(orOrganizationUnit: IOrOrganizationUnit): Observable<EntityResponseType> {
    return this.http.put<IOrOrganizationUnit>(this.resourceUrl, orOrganizationUnit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrOrganizationUnit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrOrganizationUnit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
