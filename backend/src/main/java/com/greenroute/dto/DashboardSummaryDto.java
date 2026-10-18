package com.greenroute.dto;

import java.util.List;
import java.util.Map;

public class DashboardSummaryDto {

    private Long totalJourneys;
    private Double totalDistanceKm;
    private Double totalCo2Kg;
    private Double totalCo2SavedKg;
    private Double avgEcoScore;
    private List<HistoryResponseDto> recentJourneys;
    private Map<String, Long> modeDistribution;
    private List<Map<String, Object>> emissionsTrend;

    public DashboardSummaryDto() {}

    // Getters and Setters
    public Long getTotalJourneys() { return totalJourneys; }
    public void setTotalJourneys(Long totalJourneys) { this.totalJourneys = totalJourneys; }

    public Double getTotalDistanceKm() { return totalDistanceKm; }
    public void setTotalDistanceKm(Double totalDistanceKm) { this.totalDistanceKm = totalDistanceKm; }

    public Double getTotalCo2Kg() { return totalCo2Kg; }
    public void setTotalCo2Kg(Double totalCo2Kg) { this.totalCo2Kg = totalCo2Kg; }

    public Double getTotalCo2SavedKg() { return totalCo2SavedKg; }
    public void setTotalCo2SavedKg(Double totalCo2SavedKg) { this.totalCo2SavedKg = totalCo2SavedKg; }

    public Double getAvgEcoScore() { return avgEcoScore; }
    public void setAvgEcoScore(Double avgEcoScore) { this.avgEcoScore = avgEcoScore; }

    public List<HistoryResponseDto> getRecentJourneys() { return recentJourneys; }
    public void setRecentJourneys(List<HistoryResponseDto> recentJourneys) { this.recentJourneys = recentJourneys; }

    public Map<String, Long> getModeDistribution() { return modeDistribution; }
    public void setModeDistribution(Map<String, Long> modeDistribution) { this.modeDistribution = modeDistribution; }

    public List<Map<String, Object>> getEmissionsTrend() { return emissionsTrend; }
    public void setEmissionsTrend(List<Map<String, Object>> emissionsTrend) { this.emissionsTrend = emissionsTrend; }
}
