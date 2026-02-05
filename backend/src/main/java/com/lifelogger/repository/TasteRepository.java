package com.lifelogger.repository;

import com.lifelogger.model.Taste;
import com.lifelogger.model.TasteType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TasteRepository extends MongoRepository<Taste, String> {

    List<Taste> findByUserIdOrderByDateConsumedDesc(String userId);

    List<Taste> findByUserIdAndTypeOrderByDateConsumedDesc(String userId, TasteType type);

    List<Taste> findByUserIdOrderByRatingDesc(String userId);

    @Query("{ 'userId': ?0, $or: [ { 'title': { $regex: ?1, $options: 'i' } }, { 'personalNote': { $regex: ?1, $options: 'i' } } ] }")
    List<Taste> searchByTitleOrNote(String userId, String searchText);

    List<Taste> findByUserIdAndTagsContaining(String userId, String tag);

    List<Taste> findByUserIdAndLifePhaseName(String userId, String lifePhaseName);
}
