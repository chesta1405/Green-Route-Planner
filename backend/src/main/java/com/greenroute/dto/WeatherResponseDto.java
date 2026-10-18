package com.greenroute.dto;

public class WeatherResponseDto {

    private String locationName;
    private Double temperatureCelsius;
    private String condition; // Clear, Clouds, Rain, Thunderstorm, Snow, Drizzle
    private String description;
    private Integer humidity;
    private Double windSpeedKmh;
    private String iconCode;
    private String weatherNotice;
    private boolean isSimulated;

    public WeatherResponseDto() {}

    // Getters and Setters
    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }

    public Double getTemperatureCelsius() { return temperatureCelsius; }
    public void setTemperatureCelsius(Double temperatureCelsius) { this.temperatureCelsius = temperatureCelsius; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getHumidity() { return humidity; }
    public void setHumidity(Integer humidity) { this.humidity = humidity; }

    public Double getWindSpeedKmh() { return windSpeedKmh; }
    public void setWindSpeedKmh(Double windSpeedKmh) { this.windSpeedKmh = windSpeedKmh; }

    public String getIconCode() { return iconCode; }
    public void setIconCode(String iconCode) { this.iconCode = iconCode; }

    public String getWeatherNotice() { return weatherNotice; }
    public void setWeatherNotice(String weatherNotice) { this.weatherNotice = weatherNotice; }

    public boolean isSimulated() { return isSimulated; }
    public void setSimulated(boolean simulated) { isSimulated = simulated; }
}
