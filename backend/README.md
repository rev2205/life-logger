# Life Logger Backend

Personal life-logging application backend built with Spring Boot and MongoDB.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MongoDB 4.4+ (running on localhost:27017)

## Setup Instructions

### 1. Install MongoDB

Download and install MongoDB from https://www.mongodb.com/try/download/community

Start MongoDB service:
```bash
# Windows
net start MongoDB

# Or use MongoDB Compass to start the service
```

### 2. Configure Application

Edit `src/main/resources/application.properties` if needed:
- Change MongoDB URI if not using default
- Update JWT secret for production
- Modify file upload directory if needed

### 3. Build and Run

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on http://localhost:8080

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login and get JWT token

### Journals
- POST `/api/journals` - Create journal
- PUT `/api/journals/{id}` - Update journal
- DELETE `/api/journals/{id}` - Soft delete journal
- GET `/api/journals` - Get all journals
- GET `/api/journals/{id}` - Get single journal
- GET `/api/journals/date/{date}` - Get journals by date
- GET `/api/journals/search?q={text}` - Search journals
- GET `/api/journals/filter/mood/{mood}` - Filter by mood
- GET `/api/journals/filter/tag/{tag}` - Filter by tag
- GET `/api/journals/filter/context/{context}` - Filter by context
- GET `/api/journals/filter/phase/{lifePhaseName}` - Filter by life phase

### Micro Memories
- POST `/api/memories` - Create micro memory
- DELETE `/api/memories/{id}` - Delete micro memory
- GET `/api/memories` - Get all memories
- GET `/api/memories/filter/mood/{mood}` - Filter by mood
- GET `/api/memories/filter/tag/{tag}` - Filter by tag
- GET `/api/memories/filter/phase/{lifePhaseName}` - Filter by life phase

### Tastes
- POST `/api/tastes` - Add taste item
- PUT `/api/tastes/{id}` - Update taste item
- DELETE `/api/tastes/{id}` - Delete taste item
- GET `/api/tastes` - Get all tastes
- GET `/api/tastes/{id}` - Get single taste
- GET `/api/tastes/filter/type/{type}` - Filter by type
- GET `/api/tastes/sort/rating` - Sort by rating
- GET `/api/tastes/search?q={text}` - Search tastes
- GET `/api/tastes/filter/tag/{tag}` - Filter by tag
- GET `/api/tastes/filter/phase/{lifePhaseName}` - Filter by life phase

### Places
- POST `/api/places` - Add place
- PUT `/api/places/{id}` - Update place
- DELETE `/api/places/{id}` - Delete place
- GET `/api/places` - Get all places
- GET `/api/places/{id}` - Get single place
- GET `/api/places/filter/status/{status}` - Filter by status
- GET `/api/places/filter/type/{type}` - Filter by type
- GET `/api/places/filter/tag/{tag}` - Filter by tag
- GET `/api/places/filter/phase/{lifePhaseName}` - Filter by life phase

### Photos
- POST `/api/photos` - Upload photo (multipart/form-data)
- DELETE `/api/photos/{id}` - Delete photo
- GET `/api/photos` - Get all photos
- GET `/api/photos/{id}` - Get single photo
- GET `/api/photos/filter/mood/{mood}` - Filter by mood
- GET `/api/photos/filter/tag/{tag}` - Filter by tag
- GET `/api/photos/filter/phase/{lifePhaseName}` - Filter by life phase

### Life Phases
- POST `/api/phases` - Create life phase
- PUT `/api/phases/{id}` - Update life phase
- DELETE `/api/phases/{id}` - Delete life phase
- GET `/api/phases` - Get all life phases
- GET `/api/phases/{id}` - Get single life phase

## Authentication

All endpoints except `/api/auth/**` require JWT authentication.

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Database Collections

- `users` - User accounts
- `journals` - Daily journal entries
- `microMemories` - Quick moment captures
- `tastes` - Personal taste tracking (songs, movies, books, series)
- `places` - Places visited or want to visit
- `photos` - Photography archive
- `lifePhases` - Life phase contexts

## File Storage

Uploaded photos are stored in `uploads/photos/` directory.
