package com.greenroute.controller;

import com.greenroute.dto.HistoryRequestDto;
import com.greenroute.dto.HistoryResponseDto;
import com.greenroute.service.RouteHistoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

    private final RouteHistoryService historyService;

    public HistoryController(RouteHistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping
    public ResponseEntity<List<HistoryResponseDto>> getHistory(
            @RequestParam(value = "sessionId", defaultValue = "demo-session") String sessionId
    ) {
        List<HistoryResponseDto> list = historyService.getHistory(sessionId);
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<HistoryResponseDto> saveHistory(@Valid @RequestBody HistoryRequestDto request) {
        HistoryResponseDto saved = historyService.saveJourney(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteHistory(@PathVariable("id") Long id) {
        boolean deleted = historyService.deleteHistory(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Route history record deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "Record not found"));
        }
    }
}
