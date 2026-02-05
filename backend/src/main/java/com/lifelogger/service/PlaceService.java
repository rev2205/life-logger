package com.lifelogger.service;

import com.lifelogger.exception.ResourceNotFoundException;
import com.lifelogger.model.Place;
import com.lifelogger.model.PlaceStatus;
import com.lifelogger.model.PlaceType;
import com.lifelogger.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    public Place createPlace(Place place, String userId) {
        place.setUserId(userId);
        return placeRepository.save(place);
    }

    public Place updatePlace(String id, Place placeDetails, String userId) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Place", "id", id));

        if (!place.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to update this place");
        }

        place.setName(placeDetails.getName());
        place.setType(placeDetails.getType());
        place.setStatus(placeDetails.getStatus());
        place.setLatitude(placeDetails.getLatitude());
        place.setLongitude(placeDetails.getLongitude());
        place.setDateVisited(placeDetails.getDateVisited());
        place.setExperienceNote(placeDetails.getExperienceNote());
        place.setMood(placeDetails.getMood());
        place.setTags(placeDetails.getTags());

        return placeRepository.save(place);
    }

    public void deletePlace(String id, String userId) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Place", "id", id));

        if (!place.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to delete this place");
        }

        placeRepository.delete(place);
    }

    public List<Place> getAllPlaces(String userId) {
        return placeRepository.findByUserId(userId);
    }

    public Place getPlaceById(String id, String userId) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Place", "id", id));

        if (!place.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You don't have permission to view this place");
        }

        return place;
    }

    public List<Place> filterByStatus(String userId, PlaceStatus status) {
        return placeRepository.findByUserIdAndStatus(userId, status);
    }

    public List<Place> filterByType(String userId, PlaceType type) {
        return placeRepository.findByUserIdAndType(userId, type);
    }

    public List<Place> filterByTag(String userId, String tag) {
        return placeRepository.findByUserIdAndTagsContaining(userId, tag);
    }

}
