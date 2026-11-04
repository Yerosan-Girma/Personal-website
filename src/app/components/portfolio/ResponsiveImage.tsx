import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  blurDataUrl?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  aspectRatio?: string; // e.g. "16/9"
}

/**
 * ResponsiveImage Component
 * Provides mobile-optimized responsive images with:
 * - srcset support for multiple viewport sizes
 * - Lazy loading with Intersection Observer
 * - Placeholder blur effect during loading
 * - Fallback handling for failed loads
 * - Proper aspect ratio maintenance
 * - No layout shift (CLS optimization)
 */
export function ResponsiveImage({
  src,
  alt,
  srcSet,
  sizes,
  className = '',
  containerClassName = '',
  blurDataUrl,
  onLoad,
  onError,
  priority = false,
  aspectRatio = '16/9',
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);

  // Generate Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !src) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    const img = document.querySelector(`img[data-src="${src}"]`);
    if (img) {
      observer.observe(img);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Aspect ratio styles
  const aspectRatioStyle =
    aspectRatio === '16/9'
      ? 'aspect-video'
      : aspectRatio === '4/3'
        ? 'aspect-[4/3]'
        : 'aspect-square';

  return (
    <div
      className={`relative overflow-hidden bg-slate-200 dark:bg-slate-800 ${aspectRatioStyle} ${containerClassName}`}
    >
      {/* Placeholder blur background */}
      {blurDataUrl && !isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${blurDataUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
          }}
        />
      )}

      {/* Fallback for failed loads */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-600 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Image could not load
            </p>
          </div>
        </div>
      )}

      {/* Main image with fade-in animation */}
      <motion.img
        data-src={src}
        src={isInView || priority ? src : undefined}
        srcSet={isInView || priority ? srcSet : undefined}
        sizes={sizes}
        alt={alt}
        className={`w-full h-full object-cover ${className} ${
          !isLoaded ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

interface ResponsiveImageSetProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  blurDataUrl?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  aspectRatio?: string;
}

/**
 * Responsive image sizes for mobile-optimized srcsets
 * Covers all standard breakpoints:
 * - Mobile: 480px (small phone)
 * - Tablet: 768px (medium device)
 * - Desktop: 1024px, 1920px (larger screens)
 */
export const generateSrcSet = (basePath: string): string => {
  // Assumes image has been pre-optimized with different sizes
  // Format: original.jpg, original-480.jpg, original-768.jpg, etc.
  const baseWithoutExt = basePath.replace(/\.[^/.]+$/, '');
  const ext = basePath.match(/\.[^/.]+$/)?.[0] || '.jpg';

  return [
    `${baseWithoutExt}${ext} 480w`,
    `${baseWithoutExt}-768${ext} 768w`,
    `${baseWithoutExt}-1024${ext} 1024w`,
    `${baseWithoutExt}-1920${ext} 1920w`,
  ].join(', ');
};

export const imageSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px';

/**
 * Mobile-optimized image component with automatic srcset generation
 * Handles responsive loading across all viewport sizes
 */
export function MobileOptimizedImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  blurDataUrl,
  onLoad,
  onError,
  priority = false,
  aspectRatio = '16/9',
}: ResponsiveImageSetProps) {
  return (
    <ResponsiveImage
      src={src}
      alt={alt}
      srcSet={generateSrcSet(src)}
      sizes={imageSizes}
      className={className}
      containerClassName={containerClassName}
      blurDataUrl={blurDataUrl}
      onLoad={onLoad}
      onError={onError}
      priority={priority}
      aspectRatio={aspectRatio}
    />
  );
}
