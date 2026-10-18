package com.greenroute.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "emission_factors")
public class EmissionFactorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "travel_mode", nullable = false, unique = true)
    private String travelMode;

    @Column(name = "vehicle_type", nullable = false)
    private String vehicleType;

    @Column(name = "factor_g_per_km", nullable = false)
    private Double factorGPerKm;

    @Column(name = "default_occupancy")
    private Double defaultOccupancy = 1.0;

    @Column(name = "source_reference")
    private String sourceReference;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public EmissionFactorEntity() {}

    public EmissionFactorEntity(String travelMode, String vehicleType, Double factorGPerKm, Double defaultOccupancy, String sourceReference) {
        this.travelMode = travelMode;
        this.vehicleType = vehicleType;
        this.factorGPerKm = factorGPerKm;
        this.defaultOccupancy = defaultOccupancy;
        this.sourceReference = sourceReference;
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTravelMode() { return travelMode; }
    public void setTravelMode(String travelMode) { this.travelMode = travelMode; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public Double getFactorGPerKm() { return factorGPerKm; }
    public void setFactorGPerKm(Double factorGPerKm) { this.factorGPerKm = factorGPerKm; }

    public Double getDefaultOccupancy() { return defaultOccupancy; }
    public void setDefaultOccupancy(Double defaultOccupancy) { this.defaultOccupancy = defaultOccupancy; }

    public String getSourceReference() { return sourceReference; }
    public void setSourceReference(String sourceReference) { this.sourceReference = sourceReference; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
