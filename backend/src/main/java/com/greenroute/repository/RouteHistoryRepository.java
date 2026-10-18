package com.greenroute.repository;

import com.greenroute.model.RouteHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteHistoryRepository extends JpaRepository<RouteHistory, Long> {

    List<RouteHistory> findBySessionIdOrderByCreatedAtDesc(String sessionId);

    List<RouteHistory> findTop20ByOrderByCreatedAtDesc();

    @Query("SELECT COUNT(r) FROM RouteHistory r WHERE (:sessionId IS NULL OR r.sessionId = :sessionId)")
    Long countJourneys(@Param("sessionId") String sessionId);

    @Query("SELECT COALESCE(SUM(r.distanceKm), 0.0) FROM RouteHistory r WHERE (:sessionId IS NULL OR r.sessionId = :sessionId)")
    Double sumDistanceKm(@Param("sessionId") String sessionId);

    @Query("SELECT COALESCE(SUM(r.co2Kg), 0.0) FROM RouteHistory r WHERE (:sessionId IS NULL OR r.sessionId = :sessionId)")
    Double sumCo2Kg(@Param("sessionId") String sessionId);

    @Query("SELECT COALESCE(SUM(r.co2SavedKg), 0.0) FROM RouteHistory r WHERE (:sessionId IS NULL OR r.sessionId = :sessionId)")
    Double sumCo2SavedKg(@Param("sessionId") String sessionId);

    @Query("SELECT COALESCE(AVG(r.ecoScore), 0.0) FROM RouteHistory r WHERE (:sessionId IS NULL OR r.sessionId = :sessionId)")
    Double avgEcoScore(@Param("sessionId") String sessionId);

    @Query("SELECT r.travelMode, COUNT(r) FROM RouteHistory r WHERE (:sessionId IS NULL OR r.sessionId = :sessionId) GROUP BY r.travelMode")
    List<Object[]> countByTravelMode(@Param("sessionId") String sessionId);
}
