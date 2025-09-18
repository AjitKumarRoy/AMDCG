"use client";

import { useState, useMemo } from 'react';
import { type GalleryImage as IGalleryImage } from '@/types';
import { PageHero } from '@/components/ui/PageHero';
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  Captions,
  Download,
  Fullscreen,
  Thumbnails,
  Zoom,
} from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';



type ImageWithId = IGalleryImage & { _id: string; src: string; width: number; height: number; };

const pageBanner = '/images/pagesBanner/banner6.png';

export function GalleryPageClient({ images }: { images: ImageWithId[] }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const photos = useMemo(() => images.map(img => ({
    ...img,
    src: img.image,
    width: img.width,  
    height: img.height,  
  })), [images]);


  return (
    <div>
      <PageHero 
        title="Our Gallery"
        backgroundImage={pageBanner}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <RowsPhotoAlbum
          photos={photos}
          targetRowHeight={250}  
          onClick={({ index }) => setLightboxIndex(index)}
        />
        
        <Lightbox
          plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
          captions={{
          showToggle: true,
          descriptionTextAlign: 'end',
          }}
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          slides={photos}
        />
      </div>
    </div>
  );
}