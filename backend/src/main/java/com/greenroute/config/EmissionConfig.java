package com.greenroute.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@ConfigurationProperties(prefix = "greenroute.emissions")
public class EmissionConfig {

    private double carPetrol = 171.0;
    private double carDiesel = 171.0;
    private double carHybrid = 103.0;
    private double ev = 47.0;
    private double publicTransit = 68.0;
    private double bicycle = 0.0;
    private double walking = 0.0;
    private double baselineFactor = 171.0;

    public double getFactorForMode(String mode) {
        if (mode == null) return carPetrol;
        switch (mode.toUpperCase().trim()) {
            case "EV":
            case "ELECTRIC_VEHICLE":
                return ev;
            case "PUBLIC_TRANSIT":
            case "BUS":
            case "METRO":
            case "TRAIN":
                return publicTransit;
            case "BICYCLE":
            case "CYCLING":
            case "BIKE":
                return bicycle;
            case "WALKING":
            case "FOOT":
                return walking;
            case "CAR_HYBRID":
                return carHybrid;
            case "CAR_DIESEL":
                return carDiesel;
            case "CAR":
            case "CAR_PETROL":
            default:
                return carPetrol;
        }
    }

    public Map<String, Double> getAllFactors() {
        Map<String, Double> factors = new HashMap<>();
        factors.put("CAR_PETROL", carPetrol);
        factors.put("CAR_DIESEL", carDiesel);
        factors.put("CAR_HYBRID", carHybrid);
        factors.put("EV", ev);
        factors.put("PUBLIC_TRANSIT", publicTransit);
        factors.put("BICYCLE", bicycle);
        factors.put("WALKING", walking);
        return factors;
    }

    // Getters and Setters
    public double getCarPetrol() { return carPetrol; }
    public void setCarPetrol(double carPetrol) { this.carPetrol = carPetrol; }

    public double getCarDiesel() { return carDiesel; }
    public void setCarDiesel(double carDiesel) { this.carDiesel = carDiesel; }

    public double getCarHybrid() { return carHybrid; }
    public void setCarHybrid(double carHybrid) { this.carHybrid = carHybrid; }

    public double getEv() { return ev; }
    public void setEv(double ev) { this.ev = ev; }

    public double getPublicTransit() { return publicTransit; }
    public void setPublicTransit(double publicTransit) { this.publicTransit = publicTransit; }

    public double getBicycle() { return bicycle; }
    public void setBicycle(double bicycle) { this.bicycle = bicycle; }

    public double getWalking() { return walking; }
    public void setWalking(double walking) { this.walking = walking; }

    public double getBaselineFactor() { return baselineFactor; }
    public void setBaselineFactor(double baselineFactor) { this.baselineFactor = baselineFactor; }
}
