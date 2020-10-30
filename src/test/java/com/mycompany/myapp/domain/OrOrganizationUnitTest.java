package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class OrOrganizationUnitTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrOrganizationUnit.class);
        OrOrganizationUnit orOrganizationUnit1 = new OrOrganizationUnit();
        orOrganizationUnit1.setId(1L);
        OrOrganizationUnit orOrganizationUnit2 = new OrOrganizationUnit();
        orOrganizationUnit2.setId(orOrganizationUnit1.getId());
        assertThat(orOrganizationUnit1).isEqualTo(orOrganizationUnit2);
        orOrganizationUnit2.setId(2L);
        assertThat(orOrganizationUnit1).isNotEqualTo(orOrganizationUnit2);
        orOrganizationUnit1.setId(null);
        assertThat(orOrganizationUnit1).isNotEqualTo(orOrganizationUnit2);
    }
}
