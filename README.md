# MyStudySpace

**MyStudySpace** is a full-stack web application designed to help students discover, contribute to, and manage study spots around their campus or city. Users can view locations on an interactive map, upload new spots, and manage their own profile with personalized data and images.

---

## Features

- User registration and login with secure password hashing
- Google Maps integration for interactive location-based browsing
- Dynamic study spot list with expandable detailed views
- Upload form for submitting new spots with descriptions, tags, and address 
- Profile pages with liked and uploaded spots
- Image upload support for profile pictures and study spot galleries
- Responsive dark-themed user interface built with Tailwind CSS

---

## Tech Stack

---

### Frontend  
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  
![Google Maps API](https://img.shields.io/badge/Google_Maps_API-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)

---

### Backend  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)  
![Next.js API Routes](https://img.shields.io/badge/Next.js_API_Routes-000000?style=for-the-badge&logo=vercel&logoColor=white)  
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)  
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)  
![bcrypt](https://img.shields.io/badge/bcrypt-efefef?style=for-the-badge&logo=security&logoColor=black)

---

## Project Structure

```
src/
├── app/
│   ├── api/                      # API routes (login, register, user, spots)
│   ├── login/, register/         # Authentication pages
│   ├── map/, upload/, user/      # Main application views
├── components/                   # Shared UI components (Navbar, Map, SpotCard, etc.)
├── config/                       # MongoDB connection config
├── context/                      # React context for authentication
├── data/                         # Static data for development
├── hooks/                        # Custom React hooks
├── lib/                          # Auth, DB, and map utility functions
├── models/                       # Mongoose models for StudySpot and User
├── styles/                       # Global styles and themes
```

---

## Getting Started

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables in `.env.local`:

```
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

3. Start the development server:

```bash
npm run dev
```

4. Visit `http://localhost:3000` in your browser.

---

## Key Components

| Component         | Description                                          |
|------------------|------------------------------------------------------|
| `SpotCard`        | Preview view of each study spot                     |
| `SpotDetailPanel` | Detailed view with tags, reviews, and gallery       |
| `Map`             | Google Maps interface for displaying locations      |
| `Navbar`          | Top navigation with dynamic links                   |
| `ProfileInfo`     | User profile with editable image and activity       |
| `AddStudySpot`    | Form to submit new study spots                      |

---

## External Resources Used

- MongoDB Atlas
- Google Maps JavaScript API and Places API
- Next.js Documentation
- Tailwind CSS Documentation
- Font Awesome
- `bcrypt` for password encryption
- FileReader API (for image uploads)

---

## Challenges Faced

Early development was slowed by inconsistent schema design. MongoDB’s flexibility led to untracked changes across the codebase whenever the `StudySpot` model was modified. This was resolved through structured meetings and a single source of truth approach for schema updates.

State management in the frontend, particularly for selected study spots and conditional rendering of the detail view, introduced complexity in prop drilling and layout rendering. Authentication and profile image persistence were also non-trivial, requiring the introduction of a backend route to store profile images in MongoDB and a fallback handling approach on the frontend.

Integrating the Google Maps API and photo reference URLs required handling API key configuration, proper request formatting, and defensive rendering strategies for missing or invalid data.

---

## License

This project was built for educational purposes by Group 200. Not licensed for commercial use.
