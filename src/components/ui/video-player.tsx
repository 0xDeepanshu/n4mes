"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFullscreen } from "@/lib/use-fullscreen";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const CustomSlider = ({
  value,
  onChange,
  className,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  /** Accessible name (progress / volume). */
  label: string;
}) => {
  const clamp = (next: number) => Math.min(Math.max(next, 0), 100);

  return (
    <motion.div
      className={cn(
        "relative w-full h-1 bg-white/20 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
        className,
      )}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        onChange(clamp(percentage));
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowRight") {
          e.preventDefault();
          onChange(clamp(value + 5));
        } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
          e.preventDefault();
          onChange(clamp(value - 5));
        } else if (e.key === "Home") {
          e.preventDefault();
          onChange(0);
        } else if (e.key === "End") {
          e.preventDefault();
          onChange(100);
        }
      }}
    >
      <motion.div
        className="absolute top-0 left-0 h-full bg-white rounded-full"
        style={{ width: `${value}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </motion.div>
  );
};

const VideoPlayer = ({
  src,
  poster,
  autoPlay = false,
}: {
  src: string;
  /** Optional poster shown until playback starts. */
  poster?: string;
  /** Start playback (with audio) as soon as the viewer opens it. */
  autoPlay?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreen = useFullscreen(containerRef, videoRef);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      if (videoWidth && videoHeight) {
        setAspectRatio(videoWidth / videoHeight);
      }
      setDuration(videoRef.current.duration);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-sync aspect/duration when the source changes
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.videoWidth && el.videoHeight) {
      setAspectRatio(el.videoWidth / el.videoHeight);
    }
    if (el.duration) {
      setDuration(el.duration);
    }
  }, [src]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      const newVolume = value / 100;
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(Number.isFinite(progress) ? progress : 0);
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current?.duration) {
      const time = (value / 100) * videoRef.current.duration;
      if (Number.isFinite(time)) {
        videoRef.current.currentTime = time;
        setProgress(value);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isMuted) {
        setVolume(0);
      } else {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const setSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-xl overflow-hidden bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm max-h-[82vh] max-w-[92vw] md:max-w-4xl w-fit h-fit",
        fullscreen.isFullscreen &&
          "fixed inset-0 w-screen h-screen max-w-none max-h-none rounded-none bg-black shadow-none flex items-center justify-center overflow-hidden z-50",
      )}
      style={
        !fullscreen.isFullscreen && aspectRatio
          ? { aspectRatio: `${aspectRatio}` }
          : undefined
      }
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onPointerDown={() => setShowControls(true)}
    >
      {/* biome-ignore lint/a11y/useMediaCaption: arbitrary project reels have no caption files */}
      <video
        ref={videoRef}
        className={cn(
          "block object-contain",
          fullscreen.isFullscreen
            ? "w-full h-full max-w-full max-h-full"
            : "w-full h-full max-h-[82vh] max-w-[92vw] md:max-w-4xl",
        )}
        poster={poster}
        autoPlay={autoPlay}
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        src={src}
        onClick={togglePlay}
      />

      <AnimatePresence>
        {showControls && (
          <motion.div
            className={cn(
              "absolute bottom-2 sm:bottom-3 left-1/2 w-[calc(100%-16px)] max-w-xl p-2.5 sm:p-4 bg-[#11111198] backdrop-blur-md rounded-2xl",
              fullscreen.isFullscreen &&
                "bottom-6 sm:bottom-8 w-[calc(100%-32px)] max-w-2xl",
            )}
            initial={{ y: 20, x: "-50%", opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, x: "-50%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 20, x: "-50%", opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "circInOut", type: "spring" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white text-xs sm:text-sm tabular-nums">
                {formatTime(currentTime)}
              </span>
              <CustomSlider
                value={progress}
                onChange={handleSeek}
                className="flex-1"
                label="Seek"
              />
              <span className="text-white text-xs sm:text-sm tabular-nums">
                {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-1 sm:gap-2">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    onClick={togglePlay}
                    variant="ghost"
                    size="icon"
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="text-white hover:bg-[#111111d1] hover:text-white"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                </motion.div>
                <div className="flex items-center gap-x-1 min-w-0">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      onClick={toggleMute}
                      variant="ghost"
                      size="icon"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                      className="text-white hover:bg-[#111111d1] hover:text-white"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : volume > 0.5 ? (
                        <Volume2 className="h-5 w-5" />
                      ) : (
                        <Volume1 className="h-5 w-5" />
                      )}
                    </Button>
                  </motion.div>

                  <div className="w-16 sm:w-24">
                    <CustomSlider
                      value={volume * 100}
                      onChange={handleVolumeChange}
                      label="Volume"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {[0.5, 1, 1.5, 2].map((speed) => (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    key={speed}
                  >
                    <Button
                      onClick={() => setSpeed(speed)}
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "text-white hover:bg-[#111111d1] hover:text-white",
                        playbackSpeed === speed && "bg-[#111111d1]",
                      )}
                    >
                      {speed}x
                    </Button>
                  </motion.div>
                ))}

                {fullscreen.supported && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      onClick={fullscreen.toggle}
                      variant="ghost"
                      size="icon"
                      aria-label={
                        fullscreen.isFullscreen
                          ? "Exit fullscreen"
                          : "Enter fullscreen"
                      }
                      title={
                        fullscreen.isFullscreen
                          ? "Exit fullscreen"
                          : "Enter fullscreen"
                      }
                      className="text-white hover:bg-[#111111d1] hover:text-white"
                    >
                      {fullscreen.isFullscreen ? (
                        <Minimize className="h-5 w-5" />
                      ) : (
                        <Maximize className="h-5 w-5" />
                      )}
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoPlayer;
