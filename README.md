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

1. **IMPORTANT**: Create a `.env` file in the root directory:
   ```bash
   cp env.example .env
   ```

2. Fill in your Supabase credentials in the `.env` file:
   ```
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_SERVICE_KEY=your_service_role_key_here
   PORT=3000
   NODE_ENV=development
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open http://localhost:3000 in your browser

## Security Notes

- **Never commit your `.env` file** - it's already in `.gitignore`
- **Use environment variables** for all sensitive data
- **Regenerate Supabase keys** if they were ever exposed
- **Keep your service role key secure** - it has full database access

## Technical Highlights

- **Express.js Backend**: Simple REST API for SMS fetching
- **Supabase Integration**: Secure database access
- **Real-time Polling**: Automatic message updates every 5 seconds
- **Clean Architecture**: Separation of concerns between frontend and backend
- **XSS Protection**: HTML escaping for user content
- **Environment Variables**: Secure credential management

## Interview Talking Points

- **Two-part System**: Android app + Web viewer architecture
- **Real-time Updates**: Demonstrates modern web capabilities
- **Database Integration**: Shows practical Supabase usage
- **Clean Code**: Simple, maintainable Express.js backend
- **User Experience**: Responsive design with real-time feel
- **Security Best Practices**: Environment variables and credential management 