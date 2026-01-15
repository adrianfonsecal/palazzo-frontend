'use client'
import { useState, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Camera, Upload, Image as ImageIcon, X, Check } from 'lucide-react';

const PhotoUploadSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: uploaderRef, isVisible: uploaderVisible } = useScrollReveal();
  
  const [photos, setPhotos] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files) {
      handleFiles(Array.from(files));
    }
  };

  const handleFiles = (files) => {
    const newPhotos = files.slice(0, 6 - photos.length).map(file => URL.createObjectURL(file));
    setPhotos(prev => [...prev, ...newPhotos].slice(0, 6));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    handleFiles(files);
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (photos.length > 0) {
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  return (
    <section className="relative min-h-screen bg-background py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`mb-16 text-center transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">Share the Memories</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">Photo Gallery</h2>
          <div className="section-divider mt-8" />
          <p className="mt-8 text-muted-foreground max-w-xl mx-auto">
            Help us capture every moment! Upload your favorite photos from our celebration.
          </p>
        </div>

        {/* Upload Area */}
        <div 
          ref={uploaderRef}
          className={`transition-all duration-1000 delay-200 ${uploaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="flex flex-col items-center gap-4">
              <div className="glass-card inline-flex h-20 w-20 items-center justify-center rounded-full">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium">
                  Drag photos here or click to browse
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Upload up to 6 photos • JPG, PNG, HEIC
                </p>
              </div>
            </div>
          </div>

          {/* Photo Grid */}
          {photos.length > 0 && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div 
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-2xl group animate-scale-in"
                >
                  <img
                    src={photo}
                    alt={`Upload ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => removePhoto(index)}
                      className="glass-button p-3 text-foreground"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add more placeholder */}
              {photos.length < 6 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-2xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Upload className="h-6 w-6" />
                  <span className="text-sm">Add More</span>
                </button>
              )}
            </div>
          )}

          {/* Upload Button */}
          {photos.length > 0 && (
            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                onClick={handleUpload}
                className="glass-button text-foreground flex items-center gap-2"
              >
                {uploadSuccess ? (
                  <>
                    <Check className="h-5 w-5 text-primary" />
                    Photos Uploaded!
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    Upload {photos.length} Photo{photos.length > 1 ? 's' : ''}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Sample Gallery Grid */}
        <div className="mt-20">
          <p className="text-center text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8">
            Recent Uploads
          </p>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i}
                className="aspect-square rounded-lg bg-muted/30 flex items-center justify-center"
              >
                <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoUploadSection;
