package org.mskcc.cbio.oncokb.util;

import junit.framework.TestCase;
import org.mskcc.cbio.oncokb.model.MutationEffect;
import sun.applet.Main;

import static org.junit.Assert.assertEquals;

/**
 * Created by Hongxin Zhang on 3/1/18.
 */
public class MainUtilsTest extends TestCase {
    public void testSetToAlternativeAlleleMutationEffect() throws Exception {
        IndicatorQueryMutationEffect indicatorQueryMutationEffect = new IndicatorQueryMutationEffect();

        // Neutral
        indicatorQueryMutationEffect.setMutationEffect(null);
        indicatorQueryMutationEffect = MainUtils.setToAlternativeAlleleMutationEffect(indicatorQueryMutationEffect);
        assertEquals("The null should be returned.", null, indicatorQueryMutationEffect.getMutationEffect());

        // Neutral
        indicatorQueryMutationEffect.setMutationEffect(MutationEffect.NEUTRAL);
        indicatorQueryMutationEffect = MainUtils.setToAlternativeAlleleMutationEffect(indicatorQueryMutationEffect);
        assertEquals("The neutral should not be propagated.", null, indicatorQueryMutationEffect.getMutationEffect());

        // Likely Neutral
        indicatorQueryMutationEffect.setMutationEffect(MutationEffect.LIKELY_NEUTRAL);
        indicatorQueryMutationEffect = MainUtils.setToAlternativeAlleleMutationEffect(indicatorQueryMutationEffect);
        assertEquals("The likely neutral should not be propagated.", null, indicatorQueryMutationEffect.getMutationEffect());

        // Inconclusive
        indicatorQueryMutationEffect.setMutationEffect(MutationEffect.INCONCLUSIVE);
        indicatorQueryMutationEffect = MainUtils.setToAlternativeAlleleMutationEffect(indicatorQueryMutationEffect);
        assertEquals("The inconclusive should not be propagated.", null, indicatorQueryMutationEffect.getMutationEffect());

        // Gain-of-function
        indicatorQueryMutationEffect.setMutationEffect(MutationEffect.GAIN_OF_FUNCTION);
        indicatorQueryMutationEffect = MainUtils.setToAlternativeAlleleMutationEffect(indicatorQueryMutationEffect);
        assertEquals("The Gain-of-function should be propagated to likely gain-of-function.", MutationEffect.LIKELY_GAIN_OF_FUNCTION, indicatorQueryMutationEffect.getMutationEffect());

        // Likely Gain-of-function
        indicatorQueryMutationEffect.setMutationEffect(MutationEffect.LIKELY_GAIN_OF_FUNCTION);
        indicatorQueryMutationEffect = MainUtils.setToAlternativeAlleleMutationEffect(indicatorQueryMutationEffect);
        assertEquals("The Likely Gain-of-function should be propagated to likely gain-of-function.", MutationEffect.LIKELY_GAIN_OF_FUNCTION, indicatorQueryMutationEffect.getMutationEffect());

    }

}
