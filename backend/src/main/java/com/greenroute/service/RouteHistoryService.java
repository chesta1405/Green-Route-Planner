package com.greenroute.service;

import com.greenroute.dto.DashboardSummaryDto;
import com.greenroute.dto.HistoryRequestDto;
import com.greenroute.dto.HistoryResponseDto;
import com.greenroute.model.RouteHistory;
import com.greenroute.repository.RouteHistoryRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RouteHistoryService {

    private final RouteHistoryRepository repository;
    private final EmissionService emissionService;

    public RouteHistoryService(RouteHistoryRepository repository, EmissionService emissionService) {
        this.repository = repository;
        this.emissionService = emissionService;
    }

    @PostConstruct
    public void seedInitialDemoDataIfEmpty() {
        if (repository.count() == 0) {
            List<RouteHistory> initialData = new ArrayList<>();

            RouteHistory r1 = new RouteHistory();
            r1.setSessionId("demo-session");
            r1.setSourceName("Central Railway Station");
            r1.setSourceLat(12.9784);
            r1.setSourceLng(77.5684);
            r1.setDestinationName("Eco Tech Park");
            r1.setDestinationLat(12.9352);
            r1.setDestinationLng(77.6245);
            r1.setTravelMode("EV");
            r1.setRoutePreference("ECO_FRIENDLY");
            r1.setDistanceKm(14.2);
            r1.setDurationMinutes(32.0);
            r1.setCo2Kg(0.67);
            r1.setEcoScore(92);
            r1.setCo2SavedKg(1.76);
            r1.setCreatedAt(LocalDateTime.now().minusDays(3));
            initialData.add(r1);

            RouteHistory r2 = new RouteHistory();
            r2.setSessionId("demo-session");
            r2.setSourceName("Greenwood Library");
            r2.setSourceLat(12.9716);
            r2.setSourceLng(77.5946);
            r2.setDestinationName("Botanical Gardens");
            r2.setDestinationLat(12.9507);
            r2.setDestinationLng(77.5848);
            r2.setTravelMode("BICYCLE");
            r2.setRoutePreference("SHORTEST");
            r2.setDistanceKm(3.8);
            r2.setDurationMinutes(15.0);
            r2.setCo2Kg(0.00);
            r2.setEcoScore(100);
            r2.setCo2SavedKg(0.65);
            r2.setCreatedAt(LocalDateTime.now().minusDays(2));
            initialData.add(r2);

            RouteHistory r3 = new RouteHistory();
            r3.setSessionId("demo-session");
            r3.setSourceName("University Campus");
            r3.setSourceLat(12.9345);
            r3.setSourceLng(77.6101);
            r3.setDestinationName("City Civic Center");
            r3.setDestinationLat(12.9719);
            r3.setDestinationLng(77.6412);
            r3.setTravelMode("PUBLIC_TRANSIT");
            r3.setRoutePreference("FASTEST");
            r3.setDistanceKm(8.5);
            r3.setDurationMinutes(26.0);
            r3.setCo2Kg(0.58);
            r3.setEcoScore(85);
            r3.setCo2SavedKg(0.87);
            r3.setCreatedAt(LocalDateTime.now().minusDays(1));
            initialData.add(r3);

            RouteHistory r4 = new RouteHistory();
            r4.setSessionId("demo-session");
            r4.setSourceName("Downtown Market");
            r4.setSourceLat(12.9698);
            r4.setSourceLng(77.5982);
            r4.setDestinationName("Renewable Energy Hub");
            r4.setDestinationLat(12.9123);
            r4.setDestinationLng(77.6432);
            r4.setTravelMode("CAR");
            r4.setRoutePreference("FASTEST");
            r4.setDistanceKm(11.4);
            r4.setDurationMinutes(28.0);
            r4.setCo2Kg(1.95);
            r4.setEcoScore(45);
            r4.setCo2SavedKg(0.00);
            r4.setCreatedAt(LocalDateTime.now().minusHours(12));
            initialData.add(r4);

            repository.saveAll(initialData);
        }
    }

    @Transactional
    public HistoryResponseDto saveJourney(HistoryRequestDto request) {
        RouteHistory entity = new RouteHistory();
        entity.setSessionId(request.getSessionId() != null ? request.getSessionId() : "demo-session");
        entity.setSourceName(request.getSourceName());
        entity.setSourceLat(request.getSourceLat());
        entity.setSourceLng(request.getSourceLng());
        entity.setDestinationName(request.getDestinationName());
        entity.setDestinationLat(request.getDestinationLat());
        entity.setDestinationLng(request.getDestinationLng());
        entity.setTravelMode(request.getTravelMode());
        entity.setRoutePreference(request.getRoutePreference());
        entity.setDistanceKm(request.getDistanceKm());
        entity.setDurationMinutes(request.getDurationMinutes());
        entity.setCo2Kg(request.getCo2Kg());
        entity.setEcoScore(request.getEcoScore());
        entity.setCo2SavedKg(request.getCo2SavedKg() != null ? request.getCo2SavedKg() : 0.0);
        entity.setRouteGeometry(request.getRouteGeometry());
        entity.setNotes(request.getNotes());
        entity.setCreatedAt(LocalDateTime.now());

        RouteHistory saved = repository.save(entity);
        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public List<HistoryResponseDto> getHistory(String sessionId) {
        List<RouteHistory> list;
        if (sessionId != null && !sessionId.isBlank() && !sessionId.equalsIgnoreCase("all")) {
            list = repository.findBySessionIdOrderByCreatedAtDesc(sessionId);
        } else {
            list = repository.findTop20ByOrderByCreatedAtDesc();
        }
        return list.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional
    public boolean deleteHistory(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public DashboardSummaryDto getDashboardSummary(String sessionId) {
        DashboardSummaryDto summary = new DashboardSummaryDto();

        Long count = repository.countJourneys(sessionId);
        Double distance = repository.sumDistanceKm(sessionId);
        Double co2 = repository.sumCo2Kg(sessionId);
        Double co2Saved = repository.sumCo2SavedKg(sessionId);
        Double avgEco = repository.avgEcoScore(sessionId);

        summary.setTotalJourneys(count != null ? count : 0L);
        summary.setTotalDistanceKm(round(distance != null ? distance : 0.0, 1));
        summary.setTotalCo2Kg(round(co2 != null ? co2 : 0.0, 2));
        summary.setTotalCo2SavedKg(round(co2Saved != null ? co2Saved : 0.0, 2));
        summary.setAvgEcoScore(round(avgEco != null ? avgEco : 0.0, 1));

        List<RouteHistory> recent = repository.findTop20ByOrderByCreatedAtDesc();
        summary.setRecentJourneys(recent.stream().map(this::mapToDto).collect(Collectors.toList()));

        // Travel mode breakdown
        Map<String, Long> modeCounts = new HashMap<>();
        List<Object[]> modeResults = repository.countByTravelMode(sessionId);
        for (Object[] row : modeResults) {
            String mode = (String) row[0];
            Long c = (Long) row[1];
            modeCounts.put(mode, c);
        }
        summary.setModeDistribution(modeCounts);

        // Emissions timeline trend
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("MMM dd");
        List<Map<String, Object>> trend = new ArrayList<>();
        List<RouteHistory> reversed = new ArrayList<>(recent);
        Collections.reverse(reversed);
        for (RouteHistory h : reversed) {
            Map<String, Object> point = new HashMap<>();
            point.put("date", h.getCreatedAt().format(fmt));
            point.put("journey", h.getSourceName() + " → " + h.getDestinationName());
            point.put("co2Kg", h.getCo2Kg());
            point.put("co2SavedKg", h.getCo2SavedKg());
            point.put("ecoScore", h.getEcoScore());
            trend.add(point);
        }
        summary.setEmissionsTrend(trend);

        return summary;
    }

    private HistoryResponseDto mapToDto(RouteHistory h) {
        HistoryResponseDto dto = new HistoryResponseDto();
        dto.setId(h.getId());
        dto.setSessionId(h.getSessionId());
        dto.setSourceName(h.getSourceName());
        dto.setSourceLat(h.getSourceLat());
        dto.setSourceLng(h.getSourceLng());
        dto.setDestinationName(h.getDestinationName());
        dto.setDestinationLat(h.getDestinationLat());
        dto.setDestinationLng(h.getDestinationLng());
        dto.setTravelMode(h.getTravelMode());
        dto.setRoutePreference(h.getRoutePreference());
        dto.setDistanceKm(h.getDistanceKm());
        dto.setDurationMinutes(h.getDurationMinutes());
        dto.setCo2Kg(h.getCo2Kg());
        dto.setEcoScore(h.getEcoScore());
        dto.setCo2SavedKg(h.getCo2SavedKg());
        dto.setNotes(h.getNotes());
        dto.setCreatedAt(h.getCreatedAt());
        return dto;
    }

    private double round(double val, int places) {
        if (Double.isNaN(val) || Double.isInfinite(val)) return 0.0;
        BigDecimal bd = BigDecimal.valueOf(val);
        return bd.setScale(places, RoundingMode.HALF_UP).doubleValue();
    }
}
