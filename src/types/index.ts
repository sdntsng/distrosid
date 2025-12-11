import { z } from 'zod';

// Metadata schemas
export const MetadataSchema = z.object({
  title: z.string(),
  artist: z.string(),
  album: z.string().optional(),
  genre: z.string(),
  mood: z.string(),
  duration: z.number().optional(),
  releaseDate: z.string().optional(),
  isrc: z.string().optional(),
  upc: z.string().optional(),
});

export type Metadata = z.infer<typeof MetadataSchema>;

// Platform selection
export const PlatformSchema = z.enum([
  'spotify',
  'apple_music',
  'tiktok',
  'youtube_music',
  'amazon_music',
  'deezer',
  'tidal',
]);

export type Platform = z.infer<typeof PlatformSchema>;

// Distribution form
export const DistributionFormSchema = z.object({
  metadata: MetadataSchema,
  platforms: z.array(PlatformSchema),
  releaseDate: z.string(),
  coverArtUrl: z.string().optional(),
  audioFileUrl: z.string(),
  autoGenerateContent: z.boolean().default(true),
});

export type DistributionForm = z.infer<typeof DistributionFormSchema>;

// Upload result
export interface UploadResult {
  audioFileUrl: string;
  coverArtUrl?: string;
  extractedMetadata: Metadata;
  isValid: boolean;
  validationErrors?: string[];
}

// Smart link
export interface SmartLink {
  id: string;
  shortUrl: string;
  platforms: Record<Platform, string>;
}

// Social media content
export interface SocialMediaContent {
  platform: 'tiktok' | 'reels';
  clipUrl: string;
  caption: string;
  hashtags: string[];
  duration: number;
}

// Playlist pitch
export interface PlaylistPitch {
  platform: Platform;
  genre: string;
  mood: string;
  description: string;
  targetPlaylists: string[];
}

// Distribution status
export const DistributionStatusSchema = z.enum([
  'pending',
  'processing',
  'submitted',
  'published',
  'failed',
]);

export type DistributionStatus = z.infer<typeof DistributionStatusSchema>;

export interface Distribution {
  id: string;
  metadata: Metadata;
  platforms: Platform[];
  status: DistributionStatus;
  releaseDate: string;
  smartLink?: SmartLink;
  socialMediaContent?: SocialMediaContent[];
  playlistPitches?: PlaylistPitch[];
  createdAt: string;
  updatedAt: string;
}
