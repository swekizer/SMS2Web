# SMS2Web - Real-time SMS Viewer

A simple, MVP web application that displays SMS messages from a Supabase database in real-time.

## Features

- **Real-time Updates**: Messages appear instantly when added to the database
- **Clean UI**: Simple, responsive design
- **Status Indicator**: Shows real-time connection status

## How it Works

1. **Frontend**: Pure HTML/CSS/JavaScript (no frameworks)
2. **Database**: Supabase PostgreSQL table named `sms`
3. **Real-time**: Uses Supabase's real-time subscriptions

## Database Schema

The `sms` table should have these columns:
- `id` (primary key)
- `sender` (text)
- `message` (text) 
- `timestamp` (timestamp)

## Setup

1. Open `index.html` in a web browser
2. View real-time SMS messages

## Technical Highlights

- **Supabase Real-time**: Uses PostgreSQL's LISTEN/NOTIFY for instant updates
- **Event-driven**: Listens to INSERT, UPDATE, DELETE events
- **Error Handling**: Graceful error handling and status indicators
- **XSS Protection**: HTML escaping for user content

## Interview Talking Points

- **Simplicity**: No complex frameworks, easy to understand
- **Real-time**: Demonstrates modern web capabilities
- **Database Integration**: Shows practical Supabase usage
- **User Experience**: Status indicators and responsive design 