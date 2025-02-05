import { useEffect, useRef } from "react";

type Props = {
  url: string | null;
};

const Player: React.FC<Props> = ({ url }) => {

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      if (url) {
        audioRef.current.play();
      }
    }
  }, [ url ]);

  return (
    <div className="w-full pt-4 px-4">
      <audio className="w-full" controls ref={audioRef} src={url || undefined} />
    </div>
  );

};

export default Player;
