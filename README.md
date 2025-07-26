# SMS2Web - Real-time SMS Viewer

A simple web application that displays SMS messages from a Supabase database in real-time.

## Features

- **Real-time Updates**: Messages appear automatically every 5 seconds
- **Clean UI**: Simple, responsive design
- **Manual Refresh**: Button to manually refresh messages
- **Secure Backend**: Express.js server with Supabase integration

## How it Works

1. **Android App**: Runs on mobile phone, reads SMS and sends to Supabase
2. **Backend**: Express.js server fetches SMS from Supabase
3. **Frontend**: Pure HTML/CSS/JavaScript displays messages
4. **Real-time**: Polling every 5 seconds for new messages

## Database Schema

The `sms` table should have these columns:
- `id` (primary key)
- `sender` (text)
- `message` (text) 
- `timestamp` (timestamp)

## Setup

1. Replace Supabase credentials in `server.js`:
   ```javascript
   const supabase = createClient(
     'YOUR_SUPABASE_URL_HERE',
     'YOUR_SUPABASE_SERVICE_KEY_HERE'
   );
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open http://localhost:3000 in your browser

## Technical Highlights

- **Express.js Backend**: Simple REST API for SMS fetching
- **Supabase Integration**: Secure database access
- **Real-time Polling**: Automatic message updates every 5 seconds
- **Clean Architecture**: Separation of concerns between frontend and backend
- **XSS Protection**: HTML escaping for user content

## Interview Talking Points

- **Two-part System**: Android app + Web viewer architecture
- **Real-time Updates**: Demonstrates modern web capabilities
- **Database Integration**: Shows practical Supabase usage
- **Clean Code**: Simple, maintainable Express.js backend
- **User Experience**: Responsive design with real-time feel 