package com.greenroute.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class RoutePlanRequest {

    @NotBlank(message = "Source location name is required")
    private String sourceName;

    @NotNull(message = "Source latitude is required")
    private Double sourceLat;

    @NotNull(message = "Source longitude is required")
    private Double sourceLng;

    @NotBlank(message = "Destination location name is required")
    private String destinationName;

    @NotNull(message = "Destination latitude is required")
    private Double destinationLat;

    @NotNull(message = "Destination longitude is required")
    private Double destinationLng;

    private String travelMode = "CAR"; // CAR, EV, PUBLIC_TRANSIT, BICYCLE, WALKING
    private String routePreference = "ECO_FRIENDLY"; // ECO_FRIENDLY, FASTEST, SHORTEST
    private Double vehicleOccupancy = 1.0;

    public RoutePlanRequest() {}

    // Getters and Setters
    public String getSourceName() { return sourceName; }
    public void setSourceName(String sourceName) { this.sourceName = sourceName; }

    public Double getSourceLat() { return sourceLat; }
    public void setSourceLat(Double sourceLat) { this.sourceLat = sourceLat; }

    public Double getSourceLng() { return sourceLng; }
    public void setSourceLng(Double sourceLng) { this.sourceLng = sourceLng; }

    public String getDestinationName() { return destinationName; }
    public void setDestinationName(String destinationName) { this.destinationName = destinationName; }

    public Double getDestinationLat() { return destinationLat; }
    public void setDestinationLat(Double destinationLat) { this.destinationLat = destinationLat; }

    public Double getDestinationLng() { return destinationLng; }
    public void setDestinationLng(Double destinationLng) { this.destinationLng = destinationLng; }

    public String getTravelMode() { return travelMode; }
    public void setTravelMode(String travelMode) { this.travelMode = travelMode; }

    public String getRoutePreference() { return routePreference; }
    public void setRoutePreference(String routePreference) { this.routePreference = routePreference; }

    public Double getVehicleOccupancy() { return vehicleOccupancy; }
    public void setVehicleOccupancy(Double vehicleOccupancy) { this.vehicleOccupancy = vehicleOccupancy; }
}
