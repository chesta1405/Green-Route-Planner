package com.greenroute.dto;

import java.util.List;

public class RouteOptionDto {

    private String id;
    private String name;
    private String preferenceLabel; // "Eco-Friendly Route", "Fastest Route", "Shortest Route"
    private Double distanceKm;
    private Double durationMinutes;
    private Double co2Kg;
    private Integer ecoScore;
    private Double co2SavedKg;
    private String algorithmUsed;
    private String explanation;
    private List<List<Double>> coordinates; // [[lng, lat], [lng, lat], ...]
    private boolean isRecommended;

    public RouteOptionDto() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPreferenceLabel() { return preferenceLabel; }
    public void setPreferenceLabel(String preferenceLabel) { this.preferenceLabel = preferenceLabel; }

    public Double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(Double distanceKm) { this.distanceKm = distanceKm; }

    public Double getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Double durationMinutes) { this.durationMinutes = durationMinutes; }

    public Double getCo2Kg() { return co2Kg; }
    public void setCo2Kg(Double co2Kg) { this.co2Kg = co2Kg; }

    public Integer getEcoScore() { return ecoScore; }
    public void setEcoScore(Integer ecoScore) { this.ecoScore = ecoScore; }

    public Double getCo2SavedKg() { return co2SavedKg; }
    public void setCo2SavedKg(Double co2SavedKg) { this.co2SavedKg = co2SavedKg; }

    public String getAlgorithmUsed() { return algorithmUsed; }
    public void setAlgorithmUsed(String algorithmUsed) { this.algorithmUsed = algorithmUsed; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public List<List<Double>> getCoordinates() { return coordinates; }
    public void setCoordinates(List<List<Double>> coordinates) { this.coordinates = coordinates; }

    public boolean isRecommended() { return isRecommended; }
    public void setRecommended(boolean recommended) { isRecommended = recommended; }
}
