/**
 * Basic usage example for DistroSid API
 * 
 * This example shows how to:
 * 1. Upload an audio file
 * 2. Review and edit metadata
 * 3. Submit for distribution
 * 4. Get smart link and social content
 */

// Example: Upload audio file and extract metadata
async function uploadAudio(filePath: string) {
  const formData = new FormData();
  const file = await fetch(filePath).then(r => r.blob());
  formData.append('file', file);

  const response = await fetch('http://localhost:3000/api/upload/audio', {
    method: 'POST',
    body: formData,
  });

  return await response.json();
}

// Example: Upload cover art
async function uploadCover(filePath: string) {
  const formData = new FormData();
  const file = await fetch(filePath).then(r => r.blob());
  formData.append('file', file);

  const response = await fetch('http://localhost:3000/api/upload/cover', {
    method: 'POST',
    body: formData,
  });

  return await response.json();
}

// Example: Import from external link
async function importFromLink(url: string) {
  const response = await fetch('http://localhost:3000/api/upload/from-link', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  return await response.json();
}

// Example: Submit for distribution
async function submitDistribution(distributionData: {
  metadata: any;
  platforms: string[];
  releaseDate: string;
  audioFileUrl: string;
  coverArtUrl?: string;
  autoGenerateContent?: boolean;
}) {
  const response = await fetch('http://localhost:3000/api/distribution/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(distributionData),
  });

  return await response.json();
}

// Example: Get distribution status
async function getDistribution(distributionId: string) {
  const response = await fetch(`http://localhost:3000/api/distribution/${distributionId}`);
  return await response.json();
}

// Example: Complete workflow
async function completeWorkflow() {
  console.log('Step 1: Upload audio file');
  const audioUpload = await uploadAudio('/path/to/track.mp3');
  console.log('Extracted metadata:', audioUpload.extractedMetadata);

  console.log('\nStep 2: Upload cover art');
  const coverUpload = await uploadCover('/path/to/cover.jpg');
  console.log('Cover uploaded:', coverUpload.coverArtUrl);

  console.log('\nStep 3: Submit for distribution');
  const distribution = await submitDistribution({
    metadata: audioUpload.extractedMetadata,
    platforms: ['spotify', 'apple_music', 'tiktok'],
    releaseDate: '2025-12-25',
    audioFileUrl: audioUpload.audioFileUrl,
    coverArtUrl: coverUpload.coverArtUrl,
    autoGenerateContent: true, // Auto-generate smart link, social content, and playlist pitches
  });

  console.log('\nDistribution submitted:', distribution.id);
  console.log('Status:', distribution.status);
  console.log('Smart link:', distribution.smartLink?.shortUrl);
  console.log('Social content generated:', distribution.socialMediaContent?.length, 'pieces');
  console.log('Playlist pitches:', distribution.playlistPitches?.length, 'platforms');

  console.log('\nStep 4: Check status');
  const status = await getDistribution(distribution.id);
  console.log('Current status:', status.status);

  return distribution;
}

// Alternative workflow: Import from external link
async function importWorkflow() {
  console.log('Step 1: Import from SoundCloud');
  const imported = await importFromLink('https://soundcloud.com/artist/track');
  console.log('Imported metadata:', imported.extractedMetadata);

  console.log('\nStep 2: Submit for distribution');
  const distribution = await submitDistribution({
    metadata: imported.extractedMetadata,
    platforms: ['spotify', 'apple_music'],
    releaseDate: '2025-12-25',
    audioFileUrl: imported.audioFileUrl,
    autoGenerateContent: true,
  });

  console.log('\nDistribution submitted:', distribution.id);

  return distribution;
}

// Example: Generate additional content after submission
async function generateAdditionalContent(distributionId: string) {
  console.log('Generate smart link');
  const smartLinkResponse = await fetch(
    `http://localhost:3000/api/distribution/${distributionId}/smart-link`,
    { method: 'POST' }
  );
  const smartLink = await smartLinkResponse.json();
  console.log('Smart link:', smartLink.shortUrl);

  console.log('\nGenerate social content');
  const socialResponse = await fetch(
    `http://localhost:3000/api/distribution/${distributionId}/social-content`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audioUrl: '/uploads/audio/track.mp3',
        coverArtUrl: '/uploads/cover/cover.jpg',
      }),
    }
  );
  const socialContent = await socialResponse.json();
  console.log('Social content:', socialContent);

  console.log('\nGenerate playlist pitches');
  const pitchesResponse = await fetch(
    `http://localhost:3000/api/distribution/${distributionId}/playlist-pitches`,
    { method: 'POST' }
  );
  const pitches = await pitchesResponse.json();
  console.log('Playlist pitches:', pitches);
}

// Run examples
if (import.meta.url === `file://${process.argv[1]}`) {
  completeWorkflow()
    .then(() => console.log('\n✅ Workflow completed successfully'))
    .catch(err => console.error('\n❌ Error:', err));
}

export {
  uploadAudio,
  uploadCover,
  importFromLink,
  submitDistribution,
  getDistribution,
  completeWorkflow,
  importWorkflow,
  generateAdditionalContent,
};
