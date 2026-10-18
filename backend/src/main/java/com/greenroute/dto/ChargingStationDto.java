package com.greenroute.dto;

public class ChargingStationDto {

    private String id;
    private String name;
    private Double latitude;
    private Double longitude;
    private Double distanceKm;
    private String address;
    private String operator;
    private String connectorTypes;
    private String powerKw;
    private Boolean isFastCharging;
    private String status;
    private String source;

    public ChargingStationDto() {}

    public ChargingStationDto(String id, String name, Double latitude, Double longitude, Double distanceKm,
                              String address, String operator, String connectorTypes, String powerKw,
                              Boolean isFastCharging, String status, String source) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.distanceKm = distanceKm;
        this.address = address;
        this.operator = operator;
        this.connectorTypes = connectorTypes;
        this.powerKw = powerKw;
        this.isFastCharging = isFastCharging;
        this.status = status;
        this.source = source;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(Double distanceKm) { this.distanceKm = distanceKm; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getOperator() { return operator; }
    public void setOperator(String operator) { this.operator = operator; }

    public String getConnectorTypes() { return connectorTypes; }
    public void setConnectorTypes(String connectorTypes) { this.connectorTypes = connectorTypes; }

    public String getPowerKw() { return powerKw; }
    public void setPowerKw(String powerKw) { this.powerKw = powerKw; }

    public Boolean getIsFastCharging() { return isFastCharging; }
    public void setIsFastCharging(Boolean fastCharging) { isFastCharging = fastCharging; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
}
