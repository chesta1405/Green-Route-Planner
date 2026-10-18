package com.greenroute.service;

import com.greenroute.config.EmissionConfig;
import com.greenroute.dto.EmissionCalculateRequest;
import com.greenroute.dto.EmissionCalculateResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;

/**
 * Service for calculating carbon emissions and eco-scores based on
 * European Environment Agency (EEA) and UK DEFRA GHG reporting standards.
 *
 * Formula:
 *   Estimated CO2 (kg) = (Distance in km * Emission Factor in g/km) / (1000 * Occupancy)
 *
 * Eco-score (0 to 100):
 *   Normalized against standard baseline ICE vehicle emissions.
 *   Score = max(0, min(100, round(100 - (Emissions / Baseline_Emissions) * 100)))
 *   For zero-emission active travel (walking, cycling), eco-score = 100.
 */
@Service
public class EmissionService {

    private final EmissionConfig emissionConfig;

    public EmissionService(EmissionConfig emissionConfig) {
        this.emissionConfig = emissionConfig;
    }

    public double calculateCo2Kg(double distanceKm, String travelMode, Double occupancy) {
        if (distanceKm <= 0) return 0.0;
        double effectiveOccupancy = (occupancy != null && occupancy > 0.0) ? occupancy : 1.0;
        double factorGPerKm = emissionConfig.getFactorForMode(travelMode);

        // For public transit, the factor is already per-passenger-km
        if ("PUBLIC_TRANSIT".equalsIgnoreCase(travelMode)) {
            effectiveOccupancy = 1.0;
        }

        double totalCo2Grams = (distanceKm * factorGPerKm) / effectiveOccupancy;
        double co2Kg = totalCo2Grams / 1000.0;
        return round(co2Kg, 3);
    }

    public double calculateBaselineCo2Kg(double distanceKm) {
        if (distanceKm <= 0) return 0.0;
        double baselineFactor = emissionConfig.getBaselineFactor(); // standard ICE petrol car
        return round((distanceKm * baselineFactor) / 1000.0, 3);
    }

    public double calculateCo2SavedKg(double distanceKm, String travelMode, Double occupancy) {
        double currentCo2 = calculateCo2Kg(distanceKm, travelMode, occupancy);
        double baselineCo2 = calculateBaselineCo2Kg(distanceKm);
        return round(Math.max(0.0, baselineCo2 - currentCo2), 3);
    }

    public int calculateEcoScore(double distanceKm, String travelMode, Double occupancy) {
        if (travelMode != null) {
            String mode = travelMode.toUpperCase();
            if (mode.contains("BICYCLE") || mode.contains("WALKING") || mode.contains("BIKE") || mode.contains("FOOT")) {
                return 100;
            }
        }

        double currentCo2 = calculateCo2Kg(distanceKm, travelMode, occupancy);
        double baselineCo2 = calculateBaselineCo2Kg(distanceKm);

        if (baselineCo2 <= 0.0001) return 100;

        // Ratio of current emissions to baseline emissions
        double ratio = currentCo2 / baselineCo2;
        int score = (int) Math.round((1.0 - ratio) * 100.0);

        // Standard car gets around 40-50, EV gets ~75-85, Public transit ~60-75, Active travel 100
        if ("EV".equalsIgnoreCase(travelMode) || "ELECTRIC_VEHICLE".equalsIgnoreCase(travelMode)) {
            score = Math.max(score, 75);
        } else if ("CAR_HYBRID".equalsIgnoreCase(travelMode)) {
            score = Math.max(score, 60);
        } else if ("CAR".equalsIgnoreCase(travelMode) || "CAR_PETROL".equalsIgnoreCase(travelMode)) {
            score = Math.max(score, 35);
        }

        return Math.max(0, Math.min(100, score));
    }

    public EmissionCalculateResponse calculateDetailed(EmissionCalculateRequest request) {
        double dist = request.getDistanceKm() != null ? request.getDistanceKm() : 0.0;
        return buildDetailedResponse(dist, request.getTravelMode(), request.getOccupancy());
    }

    public EmissionCalculateResponse buildDetailedResponse(double distanceKm, String travelMode, Double occupancy) {
        EmissionCalculateResponse resp = new EmissionCalculateResponse();
        resp.setDistanceKm(round(distanceKm, 2));
        resp.setTravelMode(travelMode);

        double co2Kg = calculateCo2Kg(distanceKm, travelMode, occupancy);
        double baselineCo2Kg = calculateBaselineCo2Kg(distanceKm);
        double co2SavedKg = calculateCo2SavedKg(distanceKm, travelMode, occupancy);
        int ecoScore = calculateEcoScore(distanceKm, travelMode, occupancy);

        resp.setEstimatedCo2Kg(co2Kg);
        resp.setBaselineCo2Kg(baselineCo2Kg);
        resp.setCo2SavedKg(co2SavedKg);
        resp.setEcoScore(ecoScore);

        if (ecoScore >= 90) {
            resp.setEcoRatingCategory("Ultra Eco (SDG 13 Champion)");
        } else if (ecoScore >= 70) {
            resp.setEcoRatingCategory("Low Carbon Travel");
        } else if (ecoScore >= 50) {
            resp.setEcoRatingCategory("Moderate Impact");
        } else {
            resp.setEcoRatingCategory("Standard Fossil Fuel Emissions");
        }

        resp.setFormulaDescription("Estimated CO2 = (Distance: " + round(distanceKm, 2) + " km * Emission Factor: "
                + emissionConfig.getFactorForMode(travelMode) + " g/km) / (1000 * Occupancy: " + (occupancy != null ? occupancy : 1.0)
                + "). Baseline comparison uses standard passenger car (" + emissionConfig.getBaselineFactor() + " g CO2/km).");

        // Comparison across all modes
        Map<String, Double> modeEmissions = new HashMap<>();
        Map<String, Integer> modeScores = new HashMap<>();
        String[] modes = {"WALKING", "BICYCLE", "EV", "PUBLIC_TRANSIT", "CAR_HYBRID", "CAR_PETROL"};
        for (String m : modes) {
            modeEmissions.put(m, calculateCo2Kg(distanceKm, m, 1.0));
            modeScores.put(m, calculateEcoScore(distanceKm, m, 1.0));
        }
        resp.setModeComparisonCo2Kg(modeEmissions);
        resp.setModeComparisonScores(modeScores);

        return resp;
    }

    private double round(double value, int places) {
        if (Double.isNaN(value) || Double.isInfinite(value)) return 0.0;
        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }
}
