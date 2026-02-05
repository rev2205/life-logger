package com.lifelogger.controller;

import com.lifelogger.model.Place;
import com.lifelogger.model.PlaceStatus;
import com.lifelogger.model.PlaceType;
import com.lifelogger.service.PlaceService;
import com.lifelogger.util.AuthUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @Autowired
    private AuthUtil authUtil;

    @PostMapping
    public ResponseEntity<Place> createPlace(@Valid @RequestBody Place place, Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        Place created = placeService.createPlace(place, userId);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Place> updatePlace(
            @PathVariable String id,
            @Valid @RequestBody Place place,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        Place updated = placeService.updatePlace(id, place, userId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlace(@PathVariable String id, Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        placeService.deletePlace(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Place>> getAllPlaces(Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<Place> places = placeService.getAllPlaces(userId);
        return ResponseEntity.ok(places);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable String id, Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        Place place = placeService.getPlaceById(id, userId);
        return ResponseEntity.ok(place);
    }

    @GetMapping("/filter/status/{status}")
    public ResponseEntity<List<Place>> filterByStatus(
            @PathVariable PlaceStatus status,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<Place> places = placeService.filterByStatus(userId, status);
        return ResponseEntity.ok(places);
    }

    @GetMapping("/filter/type/{type}")
    public ResponseEntity<List<Place>> filterByType(
            @PathVariable PlaceType type,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<Place> places = placeService.filterByType(userId, type);
        return ResponseEntity.ok(places);
    }

    @GetMapping("/filter/tag/{tag}")
    public ResponseEntity<List<Place>> filterByTag(
            @PathVariable String tag,
            Authentication authentication) {
        String userId = authUtil.getUserId(authentication);
        List<Place> places = placeService.filterByTag(userId, tag);
        return ResponseEntity.ok(places);
    }

}
