package com.greenroute.controller;

import com.greenroute.config.EmissionConfig;
import com.greenroute.dto.EmissionCalculateRequest;
import com.greenroute.dto.EmissionCalculateResponse;
import com.greenroute.service.EmissionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/emissions")
public class EmissionController {

    private final EmissionService emissionService;
    private final EmissionConfig emissionConfig;

    public EmissionController(EmissionService emissionService, EmissionConfig emissionConfig) {
        this.emissionService = emissionService;
        this.emissionConfig = emissionConfig;
    }

    @PostMapping("/calculate")
    public ResponseEntity<EmissionCalculateResponse> calculateEmissions(@Valid @RequestBody EmissionCalculateRequest request) {
        EmissionCalculateResponse response = emissionService.buildDetailedResponse(
                request.getDistanceKm(),
                request.getTravelMode(),
                request.getOccupancy()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/factors")
    public ResponseEntity<Map<String, Double>> getEmissionFactors() {
        return ResponseEntity.ok(emissionConfig.getAllFactors());
    }
}
