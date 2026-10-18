package com.greenroute.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.greenroute.dto.WeatherResponseDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Locale;

@Service
public class WeatherService {

    private static final Logger log = LoggerFactory.getLogger(WeatherService.class);

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${weather.api.key:}")
    private String apiKey;

    @Value("${weather.api.base-url:https://api.openweathermap.org/data/2.5}")
    private String baseUrl;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public WeatherResponseDto getWeather(Double lat, Double lng, String locationName) {
        if (lat == null || lng == null) {
            lat = 12.9716;
            lng = 77.5946;
        }

        // Try live OpenWeather API if API key is provided
        if (apiKey != null && !apiKey.isBlank() && !apiKey.equalsIgnoreCase("demo")) {
            try {
                String url = String.format(Locale.US, "%s/weather?lat=%f&lon=%f&appid=%s&units=metric",
                        baseUrl, lat, lng, apiKey);
                String json = restTemplate.getForObject(url, String.class);
                if (json != null) {
                    JsonNode root = objectMapper.readTree(json);
                    WeatherResponseDto dto = new WeatherResponseDto();

                    dto.setLocationName(locationName != null && !locationName.isBlank() ? locationName : root.path("name").asText("Selected Area"));
                    dto.setTemperatureCelsius(Math.round(root.path("main").path("temp").asDouble(22.0) * 10.0) / 10.0);
                    dto.setHumidity(root.path("main").path("humidity").asInt(60));
                    dto.setWindSpeedKmh(Math.round(root.path("wind").path("speed").asDouble(3.5) * 3.6 * 10.0) / 10.0);

                    JsonNode weatherArr = root.path("weather");
                    if (weatherArr.isArray() && !weatherArr.isEmpty()) {
                        dto.setCondition(weatherArr.get(0).path("main").asText("Clear"));
                        dto.setDescription(weatherArr.get(0).path("description").asText("clear sky"));
                        dto.setIconCode(weatherArr.get(0).path("icon").asText("01d"));
                    } else {
                        dto.setCondition("Clear");
                        dto.setDescription("Pleasant conditions");
                        dto.setIconCode("01d");
                    }

                    dto.setWeatherNotice(generateWeatherNotice(dto.getCondition(), dto.getTemperatureCelsius(), dto.getWindSpeedKmh()));
                    dto.setSimulated(false);
                    return dto;
                }
            } catch (Exception e) {
                log.warn("OpenWeather API call failed: {}. Falling back to environmental simulation.", e.getMessage());
            }
        }

        // Fallback realistic weather calculation
        return generateFallbackWeather(lat, lng, locationName);
    }

    private WeatherResponseDto generateFallbackWeather(double lat, double lng, String locationName) {
        WeatherResponseDto dto = new WeatherResponseDto();
        dto.setLocationName(locationName != null && !locationName.isBlank() ? locationName : "Current Location");

        // Deterministic variation based on latitude
        double temp = 22.5 + Math.sin(lat * 10.0) * 4.0;
        dto.setTemperatureCelsius(Math.round(temp * 10.0) / 10.0);
        dto.setHumidity(55 + (int)(Math.abs(Math.cos(lng * 10.0)) * 25));
        dto.setWindSpeedKmh(12.4);

        if (dto.getTemperatureCelsius() > 26.0) {
            dto.setCondition("Sunny");
            dto.setDescription("Clear skies and mild sunshine");
            dto.setIconCode("01d");
        } else {
            dto.setCondition("Partly Cloudy");
            dto.setDescription("Pleasant breeze with scattered clouds");
            dto.setIconCode("02d");
        }

        dto.setWeatherNotice(generateWeatherNotice(dto.getCondition(), dto.getTemperatureCelsius(), dto.getWindSpeedKmh()));
        dto.setSimulated(true);
        return dto;
    }

    private String generateWeatherNotice(String condition, double temp, double windKmh) {
        if (condition != null && (condition.equalsIgnoreCase("Rain") || condition.equalsIgnoreCase("Drizzle") || condition.equalsIgnoreCase("Thunderstorm"))) {
            return "🌧️ Wet conditions detected: Cycling and walking routes may be slick. Public transport or EV carpooling recommended for safety and comfort.";
        }
        if (temp > 33.0) {
            return "☀️ High temperature advisory: If cycling or walking, stay hydrated and consider morning or shaded eco-transit options.";
        }
        if (windKmh > 35.0) {
            return "💨 Strong headwinds: Cycling may require extra energy expenditure. Consider electric bicycle or electric bus transit.";
        }
        return "🌱 Ideal weather for green travel: Excellent conditions for walking, cycling, or low-carbon public transit!";
    }
}
