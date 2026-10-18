package com.greenroute.controller;

import com.greenroute.dto.ChargingStationDto;
import com.greenroute.service.ChargingStationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stations")
public class StationController {

    private final ChargingStationService chargingStationService;

    public StationController(ChargingStationService chargingStationService) {
        this.chargingStationService = chargingStationService;
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<ChargingStationDto>> getNearbyStations(
            @RequestParam("lat") Double lat,
            @RequestParam("lng") Double lng,
            @RequestParam(value = "radius", defaultValue = "10000") Integer radius
    ) {
        List<ChargingStationDto> stations = chargingStationService.findNearbyStations(lat, lng, radius);
        return ResponseEntity.ok(stations);
    }
}
