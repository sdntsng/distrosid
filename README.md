# DistroSid 🎵

> AI-native music distribution platform: Export → Published → Promoted

Turn your music from an exported file to published and promoted across all major platforms in just a few clicks. Built for modern creators using Suno, Udio, and other AI music tools.

## Features

### 🎯 Export Rail
- **Drag & Drop Upload**: Audio files, cover art, or external links (YouTube, SoundCloud)
- **AI Metadata Extraction**: Automatically detect title, artist, genre, mood, and more
- **Smart Validation**: Check against DSP specifications (Spotify, Apple Music, etc.)
- **Auto-Generate IDs**: ISRC and UPC codes generated automatically

### 🚀 Published Rail
- **One-Click Distribution**: Submit to multiple platforms simultaneously
- **Platform Selection**: Choose from Spotify, Apple Music, TikTok, YouTube Music, Amazon Music, Deezer, Tidal
- **Release Scheduling**: Set your release date
- **Real-time Status**: Track submission and publication status

### 📈 Promoted Rail
- **Smart Links**: Universal landing pages that redirect to the right platform
- **Social Content**: Auto-generate TikTok/Reels clips with captions from track hooks
- **Playlist Pitching**: AI-powered pitch submissions to curated playlists
- **Artist Tools**: Profile claim helpers for all major platforms

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/sdntsng/distrosid.git
cd distrosid

# Install dependencies
npm install

# Start development server
npm run dev
```

The server will start at `http://localhost:3000`

### Usage Example

1. **Upload your track**:
```bash
curl -X POST http://localhost:3000/api/upload/audio \
  -F "file=@my-track.mp3"
```

2. **Review extracted metadata** (automatically includes ISRC/UPC)

3. **Submit for distribution**:
```bash
curl -X POST http://localhost:3000/api/distribution/submit \
  -H "Content-Type: application/json" \
  -d '{
    "metadata": {
      "title": "My Track",
      "artist": "My Artist",
      "genre": "Electronic",
      "mood": "Energetic",
      "isrc": "US-DIS-25-12345",
      "upc": "123456789012"
    },
    "platforms": ["spotify", "apple_music", "tiktok"],
    "releaseDate": "2025-12-25",
    "audioFileUrl": "/uploads/audio/my-track.mp3",
    "autoGenerateContent": true
  }'
```

4. **Get your smart link and social content** (automatically generated)

## Architecture

```
distrosid/
├── src/
│   ├── services/
│   │   ├── metadata-extractor.ts      # AI metadata extraction
│   │   ├── dsp-validator.ts           # Platform validation
│   │   ├── distribution-service.ts    # Multi-platform distribution
│   │   ├── smart-link-generator.ts    # Universal links
│   │   ├── social-content-generator.ts # TikTok/Reels content
│   │   └── playlist-pitch-generator.ts # Playlist submissions
│   ├── routes/
│   │   ├── upload.ts                  # Upload endpoints
│   │   └── distribution.ts            # Distribution endpoints
│   ├── types/
│   │   └── index.ts                   # TypeScript types
│   └── utils/
│       ├── isrc-upc-generator.ts      # ID generation
│       └── id-generator.ts            # Unique IDs
├── test/                              # Test suite
└── API.md                             # API documentation
```

## API Documentation

See [API.md](./API.md) for complete API documentation.

### Key Endpoints

- `POST /api/upload/audio` - Upload and extract metadata
- `POST /api/upload/cover` - Upload cover art
- `POST /api/upload/from-link` - Import from external platform
- `POST /api/distribution/submit` - Submit for distribution
- `GET /api/distribution/:id` - Get distribution status
- `POST /api/distribution/:id/smart-link` - Generate smart link
- `POST /api/distribution/:id/social-content` - Generate social content
- `POST /api/distribution/:id/playlist-pitches` - Generate playlist pitches

## Development

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Lint

```bash
npm run lint
```

### Production

```bash
npm start
```

## Platform Support

- ✅ **Spotify**: Full distribution with playlist pitching
- ✅ **Apple Music**: Full distribution with curator tools
- ✅ **TikTok**: Commercial Music Library integration
- ✅ **YouTube Music**: Content ID distribution
- ✅ **Amazon Music**: For Artists integration
- ✅ **Deezer**: API distribution
- ✅ **Tidal**: High-quality audio distribution

## Roadmap

### Phase 1 (Current)
- [x] Core upload and metadata extraction
- [x] DSP validation
- [x] ISRC/UPC generation
- [x] Multi-platform distribution API
- [x] Smart link generation
- [x] Social content generation
- [x] Playlist pitch generation

### Phase 2 (Planned)
- [ ] Integrate real AI services (OpenAI, Claude, etc.)
- [ ] Connect to actual DSP APIs
- [ ] Add user authentication
- [ ] Build web UI
- [ ] Analytics dashboard
- [ ] Payment processing
- [ ] Artist profile management

### Phase 3 (Future)
- [ ] Mobile apps (iOS/Android)
- [ ] Advanced analytics
- [ ] Royalty tracking
- [ ] Collaboration tools
- [ ] White-label solutions

## Technology Stack

- **Runtime**: Node.js 20+
- **Language**: TypeScript
- **Framework**: Fastify
- **Validation**: Zod
- **Testing**: Vitest
- **AI Integration**: Ready for OpenAI, Claude, etc.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For questions or support, please open an issue on GitHub.

---

Built with ❤️ for music creators
