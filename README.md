# Life Logger - Personal Memory Vault

A private, single-user personal life-logging web application for documenting daily life, thoughts, emotions, and memories.

## 🎯 Project Overview

Life Logger is a full-stack application designed to help you:
- Record daily journals and long-term memories
- Track personal tastes (music, movies, books, series)
- Remember places visited or want to visit using interactive maps
- Store and reflect on photographs
- Organize life into meaningful phases

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.1
- **Language**: Java 17
- **Database**: MongoDB
- **Security**: JWT Authentication
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Maps**: Leaflet.js

## 📋 Prerequisites

Before running the application, ensure you have:

1. **Java 17 or higher** - [Download](https://www.oracle.com/java/technologies/downloads/)
2. **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
3. **Node.js 16+** - [Download](https://nodejs.org/)
4. **MongoDB 4.4+** - [Download](https://www.mongodb.com/try/download/community)

## 🚀 Getting Started

### 1. Start MongoDB

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

Or use MongoDB Compass to start the service.

### 2. Run the Backend

```bash
cd life-logger/backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Run the Frontend

Open a new terminal:

```bash
cd life-logger/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📱 Features

### ✅ Implemented Features

#### 1. **Authentication**
- User registration
- Login with JWT tokens
- Secure session management

#### 2. **Daily Journal** (Most Important)
- Create, edit, and soft-delete journal entries
- Automatic date and time stamping
- Mood tracking (7 mood states)
- Tag-based organization
- Context categorization (college, personal, family, work)
- Full-text search
- Filter by mood, tags, context, and life phases

#### 3. **Quick Memories (Micro Logs)**
- Capture short moments (1-2 lines)
- Timeline view
- Mood and tag filtering

#### 4. **Personal Taste Tracking**
- Track songs, movies, series, and books
- Rate items (1-5 stars)
- Add personal notes
- Search and filter by type
- Sort by rating or date

#### 5. **Places & Experiences**
- Add visited places or wishlist locations
- Interactive map visualization (Leaflet)
- Geolocation coordinates
- Visit status tracking
- Experience notes

#### 6. **Photography Archive**
- Upload photos with metadata
- Story and technical notes
- Mood and tag-based organization
- Gallery view

#### 7. **Life Phases**
- Create life phase contexts
- Link all content to specific life periods
- Optional start and end dates

## 🗂️ Project Structure

```
life-logger/
├── backend/
│   ├── src/main/java/com/lifelogger/
│   │   ├── config/          # Security, CORS, Web config
│   │   ├── controller/      # REST API endpoints
│   │   ├── dto/             # Request/Response objects
│   │   ├── exception/       # Error handling
│   │   ├── model/           # MongoDB entities
│   │   ├── repository/      # Data access layer
│   │   ├── security/        # JWT implementation
│   │   ├── service/         # Business logic
│   │   └── util/            # Helper utilities
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── context/         # React context (Auth)
    │   ├── pages/           # Feature pages
    │   ├── services/        # API integration
    │   ├── App.jsx          # Main app component
    │   └── main.jsx         # Entry point
    ├── package.json
    └── vite.config.js
```

## 🔐 Security

- **Password Hashing**: BCrypt
- **Authentication**: JWT tokens
- **Authorization**: User-specific data access
- **CORS**: Configured for localhost development
- **Session**: Stateless (JWT-based)

## 📊 Database Collections

- `users` - User accounts
- `journals` - Daily journal entries (with soft delete)
- `microMemories` - Quick moment captures
- `tastes` - Personal taste tracking
- `places` - Places and experiences
- `photos` - Photography archive
- `lifePhases` - Life phase contexts

## 🎨 UI/UX Features

- **Dark Theme**: Modern, eye-friendly dark mode
- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Fade-in effects and transitions
- **Mood Colors**: Visual mood indicators
- **Tag System**: Flexible categorization
- **Search & Filter**: Powerful data discovery

## 🔧 Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.properties`:

```properties
# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/lifelogger

# JWT
jwt.secret=your-secret-key-change-in-production
jwt.expiration=86400000

# File Upload
file.upload.dir=uploads/photos
```

### Frontend Configuration
Edit `frontend/vite.config.js` for proxy settings if needed.

## 🧪 Testing

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## 📦 Building for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/life-logger-backend-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
# Serve the dist/ folder with your preferred web server
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `application.properties`
- Verify port 27017 is not blocked

### CORS Errors
- Verify frontend URL in `SecurityConfig.java`
- Check Vite proxy configuration

### JWT Token Issues
- Clear browser localStorage
- Re-login to get a fresh token

## 📝 API Documentation

See `backend/README.md` for complete API endpoint documentation.

## 🎯 Development Roadmap

### Completed ✅
- Authentication system
- Journal CRUD with search and filters
- Micro memories
- Taste tracking
- Places with map integration
- Photo upload and gallery
- Life phases management

### Future Enhancements 🚀
- Export data (PDF, JSON)
- Data backup and restore
- Advanced analytics and insights
- Calendar view for journals
- Rich text editor
- Mobile app (React Native)

## 👤 Single User Design

This application is designed for **single-user, private use**:
- No social features
- No public profiles
- No sharing capabilities
- Complete privacy by default

## 📄 License

This is a personal project for educational and personal use.

## 🤝 Contributing

This is a personal life-logging application. Fork it and customize for your own use!

## 💡 Tips for Daily Use

1. **Consistency**: Write journal entries daily
2. **Tags**: Use consistent tags for better organization
3. **Life Phases**: Create phases for major life periods
4. **Backup**: Regularly export your MongoDB data
5. **Photos**: Add stories to make memories meaningful

## 📞 Support

For issues or questions, refer to the implementation plan in `.artifacts/life-logger-implementation-plan.md`

---

**Built with ❤️ for personal memory preservation and life reflection**
