/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.mskcc.cbio.oncokb.dao.impl;

import java.util.List;
import org.mskcc.cbio.oncokb.dao.EvidenceDao;
import org.mskcc.cbio.oncokb.model.Alteration;
import org.mskcc.cbio.oncokb.model.Evidence;
import org.mskcc.cbio.oncokb.model.EvidenceType;
import org.mskcc.cbio.oncokb.model.Gene;
import org.mskcc.cbio.oncokb.model.TumorType;

/**
 *
 * @author jgao
 */
public class EvidenceDaoImpl
            extends GenericDaoImpl<Evidence, Integer>
            implements EvidenceDao {
    @Override
    public List<Evidence> findEvidencesByAlteration(Alteration alteration) {
        return findByNamedQuery("findEvidencesByAlteration", alteration.getAlterationId());
    }
    
    @Override
    public List<Evidence> findEvidencesByAlteration(Alteration alteration, EvidenceType evidenceType) {
        return findByNamedQuery("findEvidencesByAlterationAndEvidenceType", alteration.getAlterationId(), evidenceType);
    }
    
    @Override
    public List<Evidence> findEvidencesByAlteration(Alteration alteration, EvidenceType evidenceType, TumorType tumorType) {
        return findByNamedQuery("findEvidencesByAlterationAndEvidenceTypeAndTumorType", alteration.getAlterationId(), evidenceType, tumorType);
    }


    @Override
    public List<Evidence> findEvidencesByGene(Gene gene) {
        return findByNamedQuery("findEvidencesByGene", gene);
    }

    @Override
    public List<Evidence> findEvidencesByGene(Gene gene, EvidenceType evidenceType) {
        return findByNamedQuery("findEvidencesByGeneAndEvidenceType", gene, evidenceType);
    }
}
