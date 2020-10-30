package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SampleApp;
import com.mycompany.myapp.domain.OrOrganizationUnit;
import com.mycompany.myapp.repository.OrOrganizationUnitRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link OrOrganizationUnitResource} REST controller.
 */
@SpringBootTest(classes = SampleApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class OrOrganizationUnitResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_PARENT_ID = 1L;
    private static final Long UPDATED_PARENT_ID = 2L;

    @Autowired
    private OrOrganizationUnitRepository orOrganizationUnitRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOrOrganizationUnitMockMvc;

    private OrOrganizationUnit orOrganizationUnit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrOrganizationUnit createEntity(EntityManager em) {
        OrOrganizationUnit orOrganizationUnit = new OrOrganizationUnit()
            .name(DEFAULT_NAME)
            .parentId(DEFAULT_PARENT_ID);
        return orOrganizationUnit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrOrganizationUnit createUpdatedEntity(EntityManager em) {
        OrOrganizationUnit orOrganizationUnit = new OrOrganizationUnit()
            .name(UPDATED_NAME)
            .parentId(UPDATED_PARENT_ID);
        return orOrganizationUnit;
    }

    @BeforeEach
    public void initTest() {
        orOrganizationUnit = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrOrganizationUnit() throws Exception {
        int databaseSizeBeforeCreate = orOrganizationUnitRepository.findAll().size();
        // Create the OrOrganizationUnit
        restOrOrganizationUnitMockMvc.perform(post("/api/or-organization-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(orOrganizationUnit)))
            .andExpect(status().isCreated());

        // Validate the OrOrganizationUnit in the database
        List<OrOrganizationUnit> orOrganizationUnitList = orOrganizationUnitRepository.findAll();
        assertThat(orOrganizationUnitList).hasSize(databaseSizeBeforeCreate + 1);
        OrOrganizationUnit testOrOrganizationUnit = orOrganizationUnitList.get(orOrganizationUnitList.size() - 1);
        assertThat(testOrOrganizationUnit.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOrOrganizationUnit.getParentId()).isEqualTo(DEFAULT_PARENT_ID);
    }

    @Test
    @Transactional
    public void createOrOrganizationUnitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orOrganizationUnitRepository.findAll().size();

        // Create the OrOrganizationUnit with an existing ID
        orOrganizationUnit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrOrganizationUnitMockMvc.perform(post("/api/or-organization-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(orOrganizationUnit)))
            .andExpect(status().isBadRequest());

        // Validate the OrOrganizationUnit in the database
        List<OrOrganizationUnit> orOrganizationUnitList = orOrganizationUnitRepository.findAll();
        assertThat(orOrganizationUnitList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOrOrganizationUnits() throws Exception {
        // Initialize the database
        orOrganizationUnitRepository.saveAndFlush(orOrganizationUnit);

        // Get all the orOrganizationUnitList
        restOrOrganizationUnitMockMvc.perform(get("/api/or-organization-units?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orOrganizationUnit.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].parentId").value(hasItem(DEFAULT_PARENT_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getOrOrganizationUnit() throws Exception {
        // Initialize the database
        orOrganizationUnitRepository.saveAndFlush(orOrganizationUnit);

        // Get the orOrganizationUnit
        restOrOrganizationUnitMockMvc.perform(get("/api/or-organization-units/{id}", orOrganizationUnit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(orOrganizationUnit.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.parentId").value(DEFAULT_PARENT_ID.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingOrOrganizationUnit() throws Exception {
        // Get the orOrganizationUnit
        restOrOrganizationUnitMockMvc.perform(get("/api/or-organization-units/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrOrganizationUnit() throws Exception {
        // Initialize the database
        orOrganizationUnitRepository.saveAndFlush(orOrganizationUnit);

        int databaseSizeBeforeUpdate = orOrganizationUnitRepository.findAll().size();

        // Update the orOrganizationUnit
        OrOrganizationUnit updatedOrOrganizationUnit = orOrganizationUnitRepository.findById(orOrganizationUnit.getId()).get();
        // Disconnect from session so that the updates on updatedOrOrganizationUnit are not directly saved in db
        em.detach(updatedOrOrganizationUnit);
        updatedOrOrganizationUnit
            .name(UPDATED_NAME)
            .parentId(UPDATED_PARENT_ID);

        restOrOrganizationUnitMockMvc.perform(put("/api/or-organization-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrOrganizationUnit)))
            .andExpect(status().isOk());

        // Validate the OrOrganizationUnit in the database
        List<OrOrganizationUnit> orOrganizationUnitList = orOrganizationUnitRepository.findAll();
        assertThat(orOrganizationUnitList).hasSize(databaseSizeBeforeUpdate);
        OrOrganizationUnit testOrOrganizationUnit = orOrganizationUnitList.get(orOrganizationUnitList.size() - 1);
        assertThat(testOrOrganizationUnit.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOrOrganizationUnit.getParentId()).isEqualTo(UPDATED_PARENT_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingOrOrganizationUnit() throws Exception {
        int databaseSizeBeforeUpdate = orOrganizationUnitRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrOrganizationUnitMockMvc.perform(put("/api/or-organization-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(orOrganizationUnit)))
            .andExpect(status().isBadRequest());

        // Validate the OrOrganizationUnit in the database
        List<OrOrganizationUnit> orOrganizationUnitList = orOrganizationUnitRepository.findAll();
        assertThat(orOrganizationUnitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrOrganizationUnit() throws Exception {
        // Initialize the database
        orOrganizationUnitRepository.saveAndFlush(orOrganizationUnit);

        int databaseSizeBeforeDelete = orOrganizationUnitRepository.findAll().size();

        // Delete the orOrganizationUnit
        restOrOrganizationUnitMockMvc.perform(delete("/api/or-organization-units/{id}", orOrganizationUnit.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrOrganizationUnit> orOrganizationUnitList = orOrganizationUnitRepository.findAll();
        assertThat(orOrganizationUnitList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
