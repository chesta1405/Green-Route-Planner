package com.greenroute.dto;

import java.util.Map;

public class EmissionCalculateResponse {

    private Double distanceKm;
    private String travelMode;
    private Double estimatedCo2Kg;
    private Double baselineCo2Kg;
    private Double co2SavedKg;
    private Integer ecoScore;
    private String formulaDescription;
    private String ecoRatingCategory; // "Ultra Eco", "Low Carbon", "Moderate", "High Emissions"
    private Map<String, Double> modeComparisonCo2Kg;
    private Map<String, Integer> modeComparisonScores;

    public EmissionCalculateResponse() {}

    // Getters and Setters
    public Double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(Double distanceKm) { this.distanceKm = distanceKm; }

    public String getTravelMode() { return travelMode; }
    public void setTravelMode(String travelMode) { this.travelMode = travelMode; }

    public Double getEstimatedCo2Kg() { return estimatedCo2Kg; }
    public void setEstimatedCo2Kg(Double estimatedCo2Kg) { this.estimatedCo2Kg = estimatedCo2Kg; }

    public Double getBaselineCo2Kg() { return baselineCo2Kg; }
    public void setBaselineCo2Kg(Double baselineCo2Kg) { this.baselineCo2Kg = baselineCo2Kg; }

    public Double getCo2SavedKg() { return co2SavedKg; }
    public void setCo2SavedKg(Double co2SavedKg) { this.co2SavedKg = co2SavedKg; }

    public Integer getEcoScore() { return ecoScore; }
    public void setEcoScore(Integer ecoScore) { this.ecoScore = ecoScore; }

    public String getFormulaDescription() { return formulaDescription; }
    public void setFormulaDescription(String formulaDescription) { this.formulaDescription = formulaDescription; }

    public String getEcoRatingCategory() { return ecoRatingCategory; }
    public void setEcoRatingCategory(String ecoRatingCategory) { this.ecoRatingCategory = ecoRatingCategory; }

    public Map<String, Double> getModeComparisonCo2Kg() { return modeComparisonCo2Kg; }
    public void setModeComparisonCo2Kg(Map<String, Double> modeComparisonCo2Kg) { this.modeComparisonCo2Kg = modeComparisonCo2Kg; }

    public Map<String, Integer> getModeComparisonScores() { return modeComparisonScores; }
    public void setModeComparisonScores(Map<String, Integer> modeComparisonScores) { this.modeComparisonScores = modeComparisonScores; }
}
