package com.greenroute;

import com.greenroute.service.DijkstraRouterService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class DijkstraRouterTest {

    private final DijkstraRouterService routerService = new DijkstraRouterService();

    @Test
    public void testAStarEcoRoutingExecution() {
        double sLat = 12.9716;
        double sLng = 77.5946;
        double dLat = 12.9352;
        double dLng = 77.6245;

        DijkstraRouterService.RouteResult result = routerService.findEcoFriendlyRouteAStar(sLat, sLng, dLat, dLng, "EV");

        assertNotNull(result);
        assertTrue(result.totalDistanceKm > 0.0);
        assertTrue(result.totalDurationMinutes > 0.0);
        assertFalse(result.coordinates.isEmpty());
        assertTrue(result.algorithmName.contains("A*"));
    }

    @Test
    public void testDijkstraShortestPathExecution() {
        double sLat = 12.9716;
        double sLng = 77.5946;
        double dLat = 12.9352;
        double dLng = 77.6245;

        DijkstraRouterService.RouteResult result = routerService.findShortestRouteDijkstra(sLat, sLng, dLat, dLng, "CAR");

        assertNotNull(result);
        assertTrue(result.totalDistanceKm > 0.0);
        assertFalse(result.coordinates.isEmpty());
        assertTrue(result.algorithmName.contains("Dijkstra"));
    }
}
