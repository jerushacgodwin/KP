"use client";

import Image from "next/image";

type VideoListProps = {
  videoUrls: string[];
  onDelete?: (index: number) => void;
  readonly?: boolean;
};

const getEmbedUrl = (url: string) => {
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(youtubeRegex);
  if (match && match[1]) {
    return { type: 'youtube', src: `https://www.youtube.com/embed/${match[1]}` };
  }
  return { type: 'video', src: url };
};

const VideoList = ({ videoUrls, onDelete, readonly = false }: VideoListProps) => {
  if (!videoUrls || videoUrls.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      <label className="text-xs text-gray-500">Attached Videos</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videoUrls.map((url, index) => {
          const videoData = getEmbedUrl(url);
          
          return (
            <div key={index} className="relative flex flex-col gap-2 bg-slate-50 p-2 rounded-md border border-gray-200">
              <div className="w-full aspect-video bg-black rounded-md overflow-hidden">
                  {videoData.type === 'youtube' ? (
                    <iframe 
                      src={videoData.src} 
                      className="w-full h-full" 
                      title="Video player"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video 
                      src={videoData.src} 
                      controls 
                      className="w-full h-full object-contain"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
              </div>
              {!readonly && onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(index)}
                    className="absolute top-2 right-2 bg-white text-red-500 hover:text-red-700 rounded-full p-1 shadow-md z-10"
                  >
                    <Image src="/delete.png" alt="delete" width={14} height={14} />
                  </button>
              )}
              <div className="text-xs text-gray-500 truncate px-1">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {url}
                  </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoList;
