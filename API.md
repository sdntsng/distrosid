# DistroSid API Documentation

## Overview

DistroSid is an AI-native music distribution platform that streamlines the process of getting music from export to published and promoted across multiple DSPs (Digital Service Providers).

**Base URL**: `http://localhost:3000`

## Features

- 🎵 **AI Metadata Extraction**: Automatically extract title, artist, genre, mood from audio files
- ✅ **DSP Validation**: Validate audio and cover art against platform specifications
- 🏷️ **ISRC/UPC Generation**: Automatically generate industry-standard identifiers
- 🚀 **Multi-Platform Distribution**: Submit to Spotify, Apple Music, TikTok, and more
- 🔗 **Smart Link Generation**: Create universal landing pages for all platforms
- 📱 **Social Content Creation**: Auto-generate TikTok/Reels clips with captions
- 🎯 **Playlist Pitching**: Generate compelling playlist pitch submissions

## Upload Endpoints

### Upload Audio File

Extract metadata from audio file using AI.

```http
POST /api/upload/audio
Content-Type: multipart/form-data

file: <audio file>
```

**Response:**
```json
{
  "audioFileUrl": "/uploads/audio/1234567890-track.mp3",
  "extractedMetadata": {
    "title": "Summer Dreams",
    "artist": "Unknown Artist",
    "genre": "Electronic",
    "mood": "Energetic",
    "duration": 180,
    "isrc": "US-DIS-25-12345",
    "upc": "123456789012"
  },
  "isValid": true,
  "validationErrors": []
}
```

### Upload Cover Art

Upload and validate cover art.

```http
POST /api/upload/cover
Content-Type: multipart/form-data

file: <image file>
```

**Response:**
```json
{
  "coverArtUrl": "/uploads/cover/1234567890-cover.jpg",
  "isValid": true,
  "validationErrors": [],
  "dimensions": {
    "width": 3000,
    "height": 3000
  }
}
```

### Import from Link

Import track from external platform (YouTube, SoundCloud, etc.).

```http
POST /api/upload/from-link
Content-Type: application/json

{
  "url": "https://soundcloud.com/artist/track"
}
```

**Response:**
```json
{
  "audioFileUrl": "https://soundcloud.com/artist/track",
  "extractedMetadata": {
    "title": "Imported Track",
    "artist": "Unknown Artist",
    "genre": "Electronic",
    "mood": "Energetic",
    "isrc": "US-DIS-25-12345",
    "upc": "123456789012"
  },
  "isValid": true
}
```

### Validate Metadata

Validate metadata against platform requirements.

```http
POST /api/upload/validate
Content-Type: application/json

{
  "metadata": {
    "title": "Track Title",
    "artist": "Artist Name",
    "genre": "Pop",
    "mood": "Happy",
    "isrc": "US-DIS-25-12345",
    "upc": "123456789012"
  },
  "platforms": ["spotify", "apple_music", "tiktok"]
}
```

**Response:**
```json
{
  "isValid": true,
  "errors": [],
  "warnings": [
    "spotify: Ensure audio bitrate is at least 320kbps for best quality"
  ]
}
```

## Distribution Endpoints

### Submit Distribution

Submit track for distribution to selected platforms.

```http
POST /api/distribution/submit
Content-Type: application/json

{
  "metadata": {
    "title": "Summer Dreams",
    "artist": "DJ Artist",
    "genre": "Electronic",
    "mood": "Energetic",
    "isrc": "US-DIS-25-12345",
    "upc": "123456789012"
  },
  "platforms": ["spotify", "apple_music", "tiktok"],
  "releaseDate": "2025-12-25",
  "audioFileUrl": "/uploads/audio/1234567890-track.mp3",
  "coverArtUrl": "/uploads/cover/1234567890-cover.jpg",
  "autoGenerateContent": true
}
```

**Response:**
```json
{
  "id": "1702307248000-abc123def",
  "metadata": { /* ... */ },
  "platforms": ["spotify", "apple_music", "tiktok"],
  "status": "pending",
  "releaseDate": "2025-12-25",
  "smartLink": {
    "id": "link-123",
    "shortUrl": "https://distrosid.link/dj-artist-summer-dreams-abc12",
    "platforms": {
      "spotify": "https://open.spotify.com/...",
      "apple_music": "https://music.apple.com/...",
      "tiktok": "https://www.tiktok.com/..."
    }
  },
  "socialMediaContent": [
    {
      "platform": "tiktok",
      "clipUrl": "https://cdn.distrosid.com/clips/tiktok/123.mp4",
      "caption": "New Electronic vibes 🎵 \"Summer Dreams\" out now!",
      "hashtags": ["newmusic", "music", "electronic", "energetic", "tiktokmusic"],
      "duration": 15
    }
  ],
  "playlistPitches": [
    {
      "platform": "spotify",
      "genre": "Electronic",
      "mood": "Energetic",
      "description": "Summer Dreams by DJ Artist is an energetic Electronic track...",
      "targetPlaylists": ["mint", "Electronic Rising", "Dance Rising"]
    }
  ],
  "createdAt": "2025-12-11T08:00:00.000Z",
  "updatedAt": "2025-12-11T08:00:00.000Z"
}
```

### Get Distribution Status

Get status of a distribution.

```http
GET /api/distribution/:id
```

**Response:**
```json
{
  "id": "1702307248000-abc123def",
  "status": "processing",
  /* ... full distribution object ... */
}
```

**Status Values:**
- `pending`: Queued for processing
- `processing`: Being submitted to platforms
- `submitted`: Submitted to all platforms
- `published`: Live on platforms
- `failed`: Submission failed

### List All Distributions

Get all distributions.

```http
GET /api/distribution
```

**Response:**
```json
[
  {
    "id": "1702307248000-abc123def",
    "metadata": { /* ... */ },
    "status": "published",
    /* ... */
  }
]
```

### Generate Smart Link

Generate a smart link for a distribution.

```http
POST /api/distribution/:id/smart-link
```

**Response:**
```json
{
  "id": "link-123",
  "shortUrl": "https://distrosid.link/dj-artist-summer-dreams-abc12",
  "platforms": {
    "spotify": "https://open.spotify.com/...",
    "apple_music": "https://music.apple.com/...",
    /* ... */
  }
}
```

### Generate Social Content

Generate TikTok/Reels content for a distribution.

```http
POST /api/distribution/:id/social-content
Content-Type: application/json

{
  "audioUrl": "/uploads/audio/1234567890-track.mp3",
  "coverArtUrl": "/uploads/cover/1234567890-cover.jpg"
}
```

**Response:**
```json
[
  {
    "platform": "tiktok",
    "clipUrl": "https://cdn.distrosid.com/clips/tiktok/123.mp4",
    "caption": "New Electronic vibes 🎵 \"Summer Dreams\" out now!",
    "hashtags": ["newmusic", "music", "electronic", "energetic", "tiktokmusic", "fyp"],
    "duration": 15
  },
  {
    "platform": "reels",
    "clipUrl": "https://cdn.distrosid.com/clips/reels/123.mp4",
    "caption": "\"Summer Dreams\" by DJ Artist 🎵\n\nThe energetic vibes you've been waiting for 🎶",
    "hashtags": ["newmusic", "music", "electronic", "energetic", "reels"],
    "duration": 30
  }
]
```

### Generate Playlist Pitches

Generate playlist pitch submissions.

```http
POST /api/distribution/:id/playlist-pitches
```

**Response:**
```json
[
  {
    "platform": "spotify",
    "genre": "Electronic",
    "mood": "Energetic",
    "description": "Summer Dreams by DJ Artist is an energetic Electronic track that captures the essence of modern electronic music. Perfect for playlists focusing on energetic vibes and contemporary sounds.",
    "targetPlaylists": ["mint", "Electronic Rising", "Dance Rising", "Dancehall", "Energy Boost"]
  },
  /* ... more platforms ... */
]
```

## Platform Support

### Supported Platforms

- **Spotify**: Full distribution with playlist pitching
- **Apple Music**: Full distribution with curator tools
- **TikTok**: Commercial Music Library integration
- **YouTube Music**: Content ID distribution
- **Amazon Music**: For Artists integration
- **Deezer**: API distribution
- **Tidal**: High-quality audio distribution

### Platform Requirements

Each platform has specific requirements for audio quality, file formats, and metadata:

#### Spotify
- **Audio**: MP3, FLAC, WAV, OGG
- **Min Bitrate**: 320kbps
- **Max File Size**: 500MB
- **Cover Art**: JPG/PNG, min 640x640px
- **Requires**: ISRC, UPC

#### Apple Music
- **Audio**: M4A, FLAC, WAV, ALAC
- **Min Bitrate**: 256kbps
- **Max File Size**: 500MB
- **Cover Art**: JPG/PNG, min 3000x3000px
- **Requires**: ISRC, UPC

#### TikTok
- **Audio**: MP3, WAV, M4A
- **Max File Size**: 200MB
- **Cover Art**: JPG/PNG, min 500x500px
- **Requires**: None (ISRC/UPC optional)

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK`: Request successful
- `400 Bad Request`: Invalid input or validation error
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

**Error Response Format:**
```json
{
  "error": "Error message",
  "details": "Additional details"
}
```

## Rate Limiting

Currently no rate limiting is implemented. In production, rate limits would be:
- 100 requests per minute for upload endpoints
- 10 distributions per hour per user
- 1000 requests per minute for read-only endpoints
