package org.mskcc.cbio.oncokb.importer;

import org.json.JSONArray;
import org.json.JSONObject;
import org.mskcc.cbio.oncokb.model.Gene;
import org.mskcc.cbio.oncokb.util.ApplicationContextSingleton;
import org.mskcc.cbio.oncokb.util.FileUtils;
import org.mskcc.cbio.oncokb.util.GeneUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author Hongxin Zhang
 */
public class updateGeneAliasImporter {
    private updateGeneAliasImporter() {
        throw new AssertionError();
    }

    private static final String ALL_GENES_FILE = "ftp://ftp.ebi.ac.uk/pub/databases/genenames/new/json/hgnc_complete_set.json";

    public static void main(String[] args) throws IOException {
        String response = FileUtils.readRemote(ALL_GENES_FILE);
        JSONObject result = new JSONObject(response);
        JSONArray array = result.getJSONObject("response").getJSONArray("docs");
        Set<String> hugoSymbols = new HashSet<>();

        for (int i = 0; i < array.length(); i++) {
            JSONObject object = array.getJSONObject(i);
            hugoSymbols.add(object.getString("symbol"));
        }

        Set<Gene> genes = GeneUtils.getAllGenes();

        for (Gene gene : genes) {
            List<String> aliases = new ArrayList<>(gene.getGeneAliases());
            for (String alias : aliases) {
                if (hugoSymbols.contains(alias)) {
                    gene.getGeneAliases().remove(alias);
                    System.out.println("Alias of " + gene.getHugoSymbol() + " has been removed: " + alias);
                }
            }
            ApplicationContextSingleton.getGeneBo().saveOrUpdate(gene);
        }
    }
}
