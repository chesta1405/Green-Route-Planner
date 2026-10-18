package com.greenroute.controller;

import com.greenroute.dto.RoutePlanRequest;
import com.greenroute.dto.RoutePlanResponse;
import com.greenroute.service.RoutingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/routes")
public class RouteController {

    private final RoutingService routingService;

    public RouteController(RoutingService routingService) {
        this.routingService = routingService;
    }

    @PostMapping("/plan")
    public ResponseEntity<RoutePlanResponse> planRoute(@Valid @RequestBody RoutePlanRequest request) {
        RoutePlanResponse response = routingService.planRoutes(request);
        return ResponseEntity.ok(response);
    }
}
