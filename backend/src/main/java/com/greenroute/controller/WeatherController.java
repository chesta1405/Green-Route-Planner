package com.greenroute.controller;

import com.greenroute.dto.WeatherResponseDto;
import com.greenroute.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping
    public ResponseEntity<WeatherResponseDto> getWeather(
            @RequestParam("lat") Double lat,
            @RequestParam("lng") Double lng,
            @RequestParam(value = "locationName", required = false) String locationName
    ) {
        WeatherResponseDto weather = weatherService.getWeather(lat, lng, locationName);
        return ResponseEntity.ok(weather);
    }
}
