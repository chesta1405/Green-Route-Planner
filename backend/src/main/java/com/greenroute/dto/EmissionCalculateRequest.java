package com.greenroute.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class EmissionCalculateRequest {

    @NotNull(message = "Distance in km is required")
    @Positive(message = "Distance must be positive")
    private Double distanceKm;

    private String travelMode = "CAR"; // CAR, EV, PUBLIC_TRANSIT, BICYCLE, WALKING
    private Double occupancy = 1.0;

    public EmissionCalculateRequest() {}

    public Double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(Double distanceKm) { this.distanceKm = distanceKm; }

    public String getTravelMode() { return travelMode; }
    public void setTravelMode(String travelMode) { this.travelMode = travelMode; }

    public Double getOccupancy() { return occupancy; }
    public void setOccupancy(Double occupancy) { this.occupancy = occupancy; }
}
