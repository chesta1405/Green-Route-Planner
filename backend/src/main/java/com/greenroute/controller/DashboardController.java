package com.greenroute.controller;

import com.greenroute.dto.DashboardSummaryDto;
import com.greenroute.service.RouteHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final RouteHistoryService historyService;

    public DashboardController(RouteHistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDto> getSummary(
            @RequestParam(value = "sessionId", defaultValue = "demo-session") String sessionId
    ) {
        DashboardSummaryDto summary = historyService.getDashboardSummary(sessionId);
        return ResponseEntity.ok(summary);
    }
}
