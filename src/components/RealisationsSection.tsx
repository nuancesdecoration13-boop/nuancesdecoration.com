import { useState } from 'react';
import { Play } from 'lucide-react';

type MediaItem = {
  type: 'image' | 'video';
  src: string;
  alt?: string;
};

type LayoutSpan = 'full' | 'half';

function VideoMedia({ src }: { src: string }) {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <button
        type="button"
        onClick={() => setStarted(true)}
        className="group relative w-full h-full block bg-[var(--moka)] overflow-hidden"
      >
        <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 absolute inset-0 m-auto">
          <Play className="w-6 h-6 text-[var(--moka)] ml-1" fill="currentColor" />
        </span>
        <span className="absolute bottom-3 left-3 text-xs font-['MaisonNeue'] font-light text-white/90 bg-black/30 px-2 py-1 rounded">
          Vidéo
        </span>
      </button>
    );
  }

  return (
    <video
      src={src}
      controls
      autoPlay
      className="w-full h-full block object-contain"
    />
  );
}

function MediaView({ item }: { item: MediaItem }) {
  if (item.type === 'image') {
    return (
      <img
        src={item.src}
        alt={item.alt ?? 'Réalisation'}
        className="w-full h-auto block"
      />
    );
  }
  return <VideoMedia src={item.src} />;
}

export default function RealisationsSection({
  media = [],
  layout = [],
}: {
  media?: MediaItem[];
  layout?: LayoutSpan[];
}) {
  const rows: { span: LayoutSpan; items: MediaItem[] }[] = [];
  let halfBuffer: MediaItem[] = [];

  media.forEach((item, i) => {
    const span = layout[i] ?? 'half';
    if (span === 'full') {
      if (halfBuffer.length > 0) {
        rows.push({ span: 'half', items: halfBuffer });
        halfBuffer = [];
      }
      rows.push({ span: 'full', items: [item] });
    } else {
      halfBuffer.push(item);
      if (halfBuffer.length === 2) {
        rows.push({ span: 'half', items: halfBuffer });
        halfBuffer = [];
      }
    }
  });
  if (halfBuffer.length > 0) rows.push({ span: 'half', items: halfBuffer });

  return (
    <section className="bg-white px-8 md:px-12 pt-8 pb-16 md:pt-10 md:pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-['FreeSerif'] font-black text-[40px] text-[var(--moka)] leading-[1.1] mb-4">
            Nos réalisations
          </h2>
          <div className="w-12 h-[1px] bg-[var(--primary)] mx-auto"></div>
        </div>

        <div className="flex flex-col gap-4">
          {rows.map((row, ri) => (
            <div
              key={ri}
              className={row.span === 'full' ? 'flex' : 'flex gap-4 items-stretch'}
            >
              {row.items.map((item, ii) => (
                <div
                  key={ii}
                  className={row.span === 'half' ? 'flex-1 flex' : 'w-full'}
                >
                  <MediaView item={item} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
