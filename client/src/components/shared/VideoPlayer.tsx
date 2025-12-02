import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
  title?: string;
  className?: string;
}

export function VideoPlayer({ url, thumbnail, title, className }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Check if it's a YouTube or Vimeo embed URL
  const isEmbed = url.includes("youtube.com/embed") || url.includes("vimeo.com") || url.includes("youtu.be");

  if (isEmbed) {
    return (
      <div className={cn("relative rounded-lg overflow-hidden bg-black", className)} data-testid="video-player">
        {!isPlaying ? (
          <div 
            className="relative aspect-video cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={thumbnail || `https://img.youtube.com/vi/${extractYouTubeId(url)}/maxresdefault.jpg`}
              alt={title || "Video thumbnail"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
              </div>
            </div>
            {title && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium">{title}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-video">
            <iframe
              src={`${url}${url.includes("?") ? "&" : "?"}autoplay=1`}
              title={title || "Video player"}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    );
  }

  // For direct video files, use HTML5 video player
  return (
    <div className={cn("relative rounded-lg overflow-hidden bg-black", className)} data-testid="video-player">
      <video
        src={url}
        poster={thumbnail}
        controls
        className="w-full h-full"
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

function extractYouTubeId(url: string): string {
  const match = url.match(/(?:embed\/|v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : "";
}

// Custom controls component for advanced usage
interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  onPlayPause: () => void;
  onMute: () => void;
  onProgressChange: (value: number) => void;
  onFullscreen: () => void;
}

export function VideoControls({
  isPlaying,
  isMuted,
  progress,
  onPlayPause,
  onMute,
  onProgressChange,
  onFullscreen,
}: VideoControlsProps) {
  return (
    <div 
      className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      data-testid="video-controls"
    >
      <Slider
        value={[progress]}
        onValueChange={([value]) => onProgressChange(value)}
        max={100}
        step={0.1}
        className="mb-3"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPlayPause}
            className="text-white hover:bg-white/20"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onMute}
            className="text-white hover:bg-white/20"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onFullscreen}
          className="text-white hover:bg-white/20"
        >
          <Maximize className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
