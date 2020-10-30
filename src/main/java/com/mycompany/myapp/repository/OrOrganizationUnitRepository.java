package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.OrOrganizationUnit;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the OrOrganizationUnit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrOrganizationUnitRepository extends JpaRepository<OrOrganizationUnit, Long> {
}
