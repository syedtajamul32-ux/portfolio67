import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { HLS_SRC } from '@/data';

export default function BackgroundVideo({
  flip = false,
  overlay = 'bg-black/20',
}: {
  flip?: boolean;
  overlay?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 ${
          flip ? 'scale-y-[-1]' : ''
        }`}
      />
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
