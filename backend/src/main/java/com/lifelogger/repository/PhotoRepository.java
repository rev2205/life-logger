package com.lifelogger.repository;

import com.lifelogger.model.Mood;
import com.lifelogger.model.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepository extends MongoRepository<Photo, String> {

    List<Photo> findByUserIdOrderByDateUploadedDesc(String userId);

    List<Photo> findByUserIdAndMoodOrderByDateUploadedDesc(String userId, Mood mood);

    List<Photo> findByUserIdAndTagsContainingOrderByDateUploadedDesc(String userId, String tag);

}
