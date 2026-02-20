# EcoTrack - Project Overview

## What is EcoTrack?

EcoTrack is a **local community sharing platform** that allows neighbors to share and lend tools, equipment, and other items. The project demonstrates a complete microservices architecture running entirely on your local machine—no cloud services required.

## Technology Stack

### Backend (Java Spring Boot)
- **Java 17+** with Spring Boot 3.2.0
- **Netflix Eureka** for service discovery
- **Spring Cloud Gateway** for API routing
- **Spring Data JPA** for database access
- **MySQL** for data persistence

### Frontend (React)
- **React 18** with modern hooks
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **Axios** for API communication
- **React Router** for navigation

## Architecture

The platform consists of 4 microservices:

1. **Discovery Server** (Port 8761)
   - Netflix Eureka server
   - Service registry for all microservices
   - Dashboard to monitor service health

2. **API Gateway** (Port 8080)
   - Single entry point for the React app
   - Routes requests to appropriate microservices
   - Handles CORS for frontend communication

3. **Item Service** (Dynamic Port)
   - Manages items available for sharing
   - CRUD operations for items
   - Search and filter functionality
   - Uses MySQL database: `db_items`

4. **User Service** (Dynamic Port)
   - User registration and authentication
   - Profile management
   - Login system
   - Uses MySQL database: `db_users`

## Key Features

### For Users
- ✅ Register and create a profile
- ✅ Login to access the platform
- ✅ Browse all available items in the community
- ✅ Search items by name
- ✅ Filter items by availability
- ✅ View items by category

### For Item Owners
- ✅ Add new items to share
- ✅ Edit item details
- ✅ Toggle item availability
- ✅ Delete items
- ✅ View all personal items

## How It Works

1. **Service Discovery**: All microservices register themselves with Eureka Discovery Server
2. **API Gateway**: Frontend makes all requests to the gateway (port 8080)
3. **Load Balancing**: Gateway automatically routes requests to available service instances
4. **Data Persistence**: Each service has its own MySQL database
5. **Frontend**: React app provides a user-friendly interface

## Development Highlights

### Microservices Pattern
- Each service is independent and can be deployed separately
- Services communicate through the API Gateway
- Dynamic port assignment for horizontal scaling

### Database Per Service
- Item Service: `db_items` database
- User Service: `db_users` database
- Follows microservices best practice of data isolation

### Modern Frontend
- Component-based React architecture
- Responsive design for mobile and desktop
- Real-time state management
- Clean and intuitive UI

## Getting Started

See `README.md` for detailed setup instructions or `QUICK_START.md` for quick commands.

## Project Structure Benefits

✅ **Scalable**: Add more service instances easily
✅ **Maintainable**: Each service has a clear responsibility
✅ **Local First**: Runs entirely on your machine
✅ **Production Ready**: Architecture mirrors real-world systems
✅ **Learning Friendly**: Clear separation of concerns

## Future Enhancements

Potential features to add:
- JWT-based authentication
- Item image uploads
- User ratings and reviews
- Messaging between users
- Booking/reservation system
- Email notifications
- Admin dashboard

---

**Enjoy building and extending EcoTrack! 🌱**
