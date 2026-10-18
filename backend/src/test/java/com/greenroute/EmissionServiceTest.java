package com.greenroute;

import com.greenroute.config.EmissionConfig;
import com.greenroute.service.EmissionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class EmissionServiceTest {

    private EmissionService emissionService;
    private EmissionConfig emissionConfig;

    @BeforeEach
    public void setup() {
        emissionConfig = new EmissionConfig();
        emissionService = new EmissionService(emissionConfig);
    }

    @Test
    public void testCarEmissionsCalculation() {
        // 10 km in petrol car: 10 * 171g = 1710g = 1.71 kg
        double co2 = emissionService.calculateCo2Kg(10.0, "CAR", 1.0);
        assertEquals(1.71, co2, 0.01);
    }

    @Test
    public void testZeroEmissionActiveTravel() {
        double bikeCo2 = emissionService.calculateCo2Kg(15.0, "BICYCLE", 1.0);
        double walkCo2 = emissionService.calculateCo2Kg(5.0, "WALKING", 1.0);
        assertEquals(0.0, bikeCo2);
        assertEquals(0.0, walkCo2);

        int bikeScore = emissionService.calculateEcoScore(15.0, "BICYCLE", 1.0);
        assertEquals(100, bikeScore);
    }

    @Test
    public void testElectricVehicleSavings() {
        double dist = 20.0;
        double evCo2 = emissionService.calculateCo2Kg(dist, "EV", 1.0);
        double baselineCo2 = emissionService.calculateBaselineCo2Kg(dist);
        double saved = emissionService.calculateCo2SavedKg(dist, "EV", 1.0);

        assertTrue(evCo2 < baselineCo2);
        assertTrue(saved > 0);
        assertEquals(baselineCo2 - evCo2, saved, 0.01);
    }
}
