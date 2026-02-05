package com.lifelogger.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "microMemories")
public class MicroMemory {

    @Id
    private String id;

    @NotBlank(message = "User ID is required")
    private String userId;

    private LocalDateTime timestamp;

    @NotBlank(message = "Short text is required")
    @Size(max = 200, message = "Short text must not exceed 200 characters")
    private String shortText;

    @NotNull(message = "Mood is required")
    private Mood mood;

    private List<String> tags;
}
