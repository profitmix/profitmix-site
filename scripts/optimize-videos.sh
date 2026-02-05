#!/bin/bash

# Video Optimization Script for ProfitMix Website
# Run this script on your video files before uploading

echo "🎬 Video Optimization Script for ProfitMix"
echo "=========================================="

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg is not installed. Please install it first."
    echo "   Ubuntu/Debian: sudo apt install ffmpeg"
    echo "   macOS: brew install ffmpeg"
    echo "   Windows: Download from ffmpeg.org"
    exit 1
fi

# Create optimized videos directory
mkdir -p public/assets/videos/hero/optimized
mkdir -p public/assets/videos/process/optimized
mkdir -p public/assets/videos/sustainability/optimized

# Function to optimize a single video
optimize_video() {
    local input_file=$1
    local output_dir=$2
    local filename=$(basename "$input_file")
    local name="${filename%.*}"
    
    echo "🔧 Optimizing: $filename"
    
    # 1. Create WebM version (Best compression)
    ffmpeg -i "$input_file" \
        -c:v libvpx-vp9 -b:v 1M -crf 30 \
        -c:a libopus -b:a 96k \
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
        -f webm \
        "$output_dir/optimized/$name.webm" \
        -y 2>/dev/null
    
    # 2. Create MP4 version (Fallback)
    ffmpeg -i "$input_file" \
        -c:v libx264 -preset slow -crf 23 \
        -c:a aac -b:a 128k \
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
        -movflags +faststart \
        "$output_dir/optimized/$name.mp4" \
        -y 2>/dev/null
    
    # 3. Create poster image (first frame)
    ffmpeg -i "$input_file" \
        -ss 00:00:01 \
        -vframes 1 \
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
        "$output_dir/optimized/$name-poster.jpg" \
        -y 2>/dev/null
    
    echo "✅ Optimized: $name (WebM + MP4 + Poster)"
    echo ""
}

# Optimize hero videos
echo "🔄 Processing Hero Videos..."
for video in public/assets/videos/hero/*.mp4 public/assets/videos/hero/*.mov public/assets/videos/hero/*.avi; do
    if [ -f "$video" ]; then
        optimize_video "$video" "public/assets/videos/hero"
    fi
done

echo "🎉 Video optimization complete!"
echo ""
echo "📁 Optimized files are in:"
echo "   - public/assets/videos/hero/optimized/"
echo "   - public/assets/videos/process/optimized/"
echo "   - public/assets/videos/sustainability/optimized/"
echo ""
echo "💡 Update your video paths in HeroSection.jsx to use optimized versions!"