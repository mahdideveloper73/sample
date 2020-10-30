package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.OrOrganizationUnit;
import com.mycompany.myapp.repository.OrOrganizationUnitRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.OrOrganizationUnit}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OrOrganizationUnitResource {

    private final Logger log = LoggerFactory.getLogger(OrOrganizationUnitResource.class);

    private static final String ENTITY_NAME = "orOrganizationUnit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrOrganizationUnitRepository orOrganizationUnitRepository;

    public OrOrganizationUnitResource(OrOrganizationUnitRepository orOrganizationUnitRepository) {
        this.orOrganizationUnitRepository = orOrganizationUnitRepository;
    }

    /**
     * {@code POST  /or-organization-units} : Create a new orOrganizationUnit.
     *
     * @param orOrganizationUnit the orOrganizationUnit to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new orOrganizationUnit, or with status {@code 400 (Bad Request)} if the orOrganizationUnit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/or-organization-units")
    public ResponseEntity<OrOrganizationUnit> createOrOrganizationUnit(@RequestBody OrOrganizationUnit orOrganizationUnit) throws URISyntaxException {
        log.debug("REST request to save OrOrganizationUnit : {}", orOrganizationUnit);
        if (orOrganizationUnit.getId() != null) {
            throw new BadRequestAlertException("A new orOrganizationUnit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrOrganizationUnit result = orOrganizationUnitRepository.save(orOrganizationUnit);
        return ResponseEntity.created(new URI("/api/or-organization-units/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /or-organization-units} : Updates an existing orOrganizationUnit.
     *
     * @param orOrganizationUnit the orOrganizationUnit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orOrganizationUnit,
     * or with status {@code 400 (Bad Request)} if the orOrganizationUnit is not valid,
     * or with status {@code 500 (Internal Server Error)} if the orOrganizationUnit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/or-organization-units")
    public ResponseEntity<OrOrganizationUnit> updateOrOrganizationUnit(@RequestBody OrOrganizationUnit orOrganizationUnit) throws URISyntaxException {
        log.debug("REST request to update OrOrganizationUnit : {}", orOrganizationUnit);
        if (orOrganizationUnit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrOrganizationUnit result = orOrganizationUnitRepository.save(orOrganizationUnit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, orOrganizationUnit.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /or-organization-units} : get all the orOrganizationUnits.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orOrganizationUnits in body.
     */
    @GetMapping("/or-organization-units")
    public List<OrOrganizationUnit> getAllOrOrganizationUnits() {
        log.debug("REST request to get all OrOrganizationUnits");
        return orOrganizationUnitRepository.findAll();
    }

    /**
     * {@code GET  /or-organization-units/:id} : get the "id" orOrganizationUnit.
     *
     * @param id the id of the orOrganizationUnit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orOrganizationUnit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/or-organization-units/{id}")
    public ResponseEntity<OrOrganizationUnit> getOrOrganizationUnit(@PathVariable Long id) {
        log.debug("REST request to get OrOrganizationUnit : {}", id);
        Optional<OrOrganizationUnit> orOrganizationUnit = orOrganizationUnitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orOrganizationUnit);
    }

    /**
     * {@code DELETE  /or-organization-units/:id} : delete the "id" orOrganizationUnit.
     *
     * @param id the id of the orOrganizationUnit to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/or-organization-units/{id}")
    public ResponseEntity<Void> deleteOrOrganizationUnit(@PathVariable Long id) {
        log.debug("REST request to delete OrOrganizationUnit : {}", id);
        orOrganizationUnitRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
