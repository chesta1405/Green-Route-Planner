package com.greenroute.dto;

import java.util.List;

public class RoutePlanResponse {

    private String sourceName;
    private Double sourceLat;
    private Double sourceLng;
    private String destinationName;
    private Double destinationLat;
    private Double destinationLng;
    private String travelMode;
    private List<RouteOptionDto> routes;
    private RouteOptionDto recommendedRoute;
    private String sustainabilityNotice;

    public RoutePlanResponse() {}

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

    public List<RouteOptionDto> getRoutes() { return routes; }
    public void setRoutes(List<RouteOptionDto> routes) { this.routes = routes; }

    public RouteOptionDto getRecommendedRoute() { return recommendedRoute; }
    public void setRecommendedRoute(RouteOptionDto recommendedRoute) { this.recommendedRoute = recommendedRoute; }

    public String getSustainabilityNotice() { return sustainabilityNotice; }
    public void setSustainabilityNotice(String sustainabilityNotice) { this.sustainabilityNotice = sustainabilityNotice; }
}
