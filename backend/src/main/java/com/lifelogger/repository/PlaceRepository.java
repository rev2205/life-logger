package com.lifelogger.repository;

import com.lifelogger.model.Place;
import com.lifelogger.model.PlaceStatus;
import com.lifelogger.model.PlaceType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends MongoRepository<Place, String> {

    List<Place> findByUserId(String userId);

    List<Place> findByUserIdAndStatus(String userId, PlaceStatus status);

    List<Place> findByUserIdAndType(String userId, PlaceType type);

    List<Place> findByUserIdAndTagsContaining(String userId, String tag);

}
