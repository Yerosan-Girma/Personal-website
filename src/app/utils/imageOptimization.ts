/**
 * Image Optimization Utilities
 * Provides helpers for responsive image serving, format detection,
 * and mobile performance optimization
 */

export interface ImageConfig {
  basePath: string;
  webpSupported?: boolean;
  sizes: {
    mobile: number; // 480px
    tablet: number; // 768px
    desktop: number; // 1024px
    wide: number; // 1920px
  };
}

/**
 * Standard responsive image sizes for all viewports
 * Mobile-first approach covering common breakpoints
 */
export const RESPONSIVE_SIZES = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1920,
} as const;

/**
 * Picture element sizes attribute for optimal image serving
 * Tells browser which image to load based on viewport width
 */
export const PICTURE_SIZES =
  '(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px';

/**
 * Generate srcset string for responsive images
 * Assumes images are pre-optimized and stored with size suffixes
 *
 * @param basePath - Base image path (e.g., "/images/hero.jpg")
 * @returns srcset string with all sizes
 *
 * @example
 * // Generates: hero-480.jpg 480w, hero-768.jpg 768w, ...
 * generateSrcSet("/images/hero.jpg")
 */
export function generateSrcSet(basePath: string): string {
  const baseWithoutExt = basePath.replace(/\.[^/.]+$/, '');
  const ext = basePath.match(/\.[^/.]+$/)?.[0] || '.jpg';

  return [
    `${baseWithoutExt}-480${ext} 480w`,
    `${baseWithoutExt}-768${ext} 768w`,
    `${baseWithoutExt}-1024${ext} 1024w`,
    `${baseWithoutExt}-1920${ext} 1920w`,
  ].join(', ');
}

/**
 * Generate srcset for WebP format with JPEG fallback
 * Modern format for better compression on mobile
 *
 * @param basePath - Base image path
 * @returns Object with webp and jpeg srcsets
 */
export function generateMultiFormatSrcSet(basePath: string) {
  const baseWithoutExt = basePath.replace(/\.[^/.]+$/, '');

  return {
    webp: [
      `${baseWithoutExt}-480.webp 480w`,
      `${baseWithoutExt}-768.webp 768w`,
      `${baseWithoutExt}-1024.webp 1024w`,
      `${baseWithoutExt}-1920.webp 1920w`,
    ].join(', '),
    jpeg: [
      `${baseWithoutExt}-480.jpg 480w`,
      `${baseWithoutExt}-768.jpg 768w`,
      `${baseWithoutExt}-1024.jpg 1024w`,
      `${baseWithoutExt}-1920.jpg 1920w`,
    ].join(', '),
  };
}

/**
 * Calculate appropriate image size for current viewport
 * Used for dynamic srcset selection
 */
export function getImageSizeForViewport(): number {
  if (typeof window === 'undefined') return RESPONSIVE_SIZES.desktop;

  const width = window.innerWidth;

  if (width <= RESPONSIVE_SIZES.mobile) return RESPONSIVE_SIZES.mobile;
  if (width <= RESPONSIVE_SIZES.tablet) return RESPONSIVE_SIZES.tablet;
  if (width <= RESPONSIVE_SIZES.desktop) return RESPONSIVE_SIZES.desktop;
  return RESPONSIVE_SIZES.wide;
}

/**
 * Get the most appropriate image URL for current viewport
 * Helps with dynamic image selection
 *
 * @param basePath - Base image path
 * @returns Full URL for appropriate size
 */
export function getOptimizedImageUrl(basePath: string): string {
  const size = getImageSizeForViewport();
  const baseWithoutExt = basePath.replace(/\.[^/.]+$/, '');
  const ext = basePath.match(/\.[^/.]+$/)?.[0] || '.jpg';

  // Use mobile size if viewport is small, otherwise use appropriate size
  const selectedSize = size === RESPONSIVE_SIZES.mobile ? 480 : size;

  return `${baseWithoutExt}-${selectedSize}${ext}`;
}

/**
 * Generate blur placeholder data URL (simple solid color)
 * In production, use server-side blur generation or BlurHash
 *
 * @param color - Hex color code (e.g., "#1F2937")
 * @returns Data URL for blur placeholder
 */
export function generateBlurPlaceholder(color: string = '#1F2937'): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect fill="${color}" width="100" height="100"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Lazy load images with Intersection Observer
 * More efficient than native lazy loading for performance
 *
 * @param imageSelector - CSS selector for images to lazy load
 * @param rootMargin - When to start loading before entering viewport
 */
export function lazyLoadImages(
  imageSelector: string = 'img[data-lazy]',
  rootMargin: string = '50px'
): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;

          // Set src from data-src
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }

          // Set srcset from data-srcset
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }

          // Add loaded class for fade-in animation
          img.classList.add('loaded');

          // Stop observing
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin,
      threshold: 0.01,
    }
  );

  // Observe all matching images
  document.querySelectorAll(imageSelector).forEach((img) => {
    observer.observe(img);
  });

  return observer;
}

/**
 * Check if browser supports WebP format
 * Useful for conditional image format serving
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL('image/webp').indexOf('webp') === 5;
}

/**
 * Check if browser supports AVIF format (newer, better compression)
 */
export function supportsAVIF(): boolean {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL('image/avif').indexOf('avif') === 5;
}

/**
 * Get best image format for current browser
 * Returns format priority: AVIF > WebP > JPEG
 */
export function getBestImageFormat(): 'avif' | 'webp' | 'jpeg' {
  if (supportsAVIF()) return 'avif';
  if (supportsWebP()) return 'webp';
  return 'jpeg';
}

/**
 * Generate complete picture element HTML with format fallbacks
 * Use in custom components or server-side rendering
 *
 * @example
 * <picture>
 *   <source srcset="..." type="image/webp" />
 *   <source srcset="..." type="image/jpeg" />
 *   <img src="..." alt="..." />
 * </picture>
 */
export function generatePictureHTML(
  basePath: string,
  alt: string,
  className: string = ''
): string {
  const baseWithoutExt = basePath.replace(/\.[^/.]+$/, '');
  const fallbackExt = basePath.match(/\.[^/.]+$/)?.[0] || '.jpg';

  const webpSrcSet = [
    `${baseWithoutExt}-480.webp 480w`,
    `${baseWithoutExt}-768.webp 768w`,
    `${baseWithoutExt}-1024.webp 1024w`,
    `${baseWithoutExt}-1920.webp 1920w`,
  ].join(', ');

  const jpegSrcSet = [
    `${baseWithoutExt}-480${fallbackExt} 480w`,
    `${baseWithoutExt}-768${fallbackExt} 768w`,
    `${baseWithoutExt}-1024${fallbackExt} 1024w`,
    `${baseWithoutExt}-1920${fallbackExt} 1920w`,
  ].join(', ');

  return `
    <picture>
      <source srcset="${webpSrcSet}" sizes="${PICTURE_SIZES}" type="image/webp" />
      <source srcset="${jpegSrcSet}" sizes="${PICTURE_SIZES}" type="image/jpeg" />
      <img 
        src="${basePath}" 
        alt="${alt}" 
        class="${className}" 
        loading="lazy"
        decoding="async"
        width="1200"
        height="675"
      />
    </picture>
  `;
}

/**
 * Optimize image element for performance
 * Sets recommended attributes for mobile efficiency
 */
export function optimizeImageElement(img: HTMLImageElement): void {
  // Set decoding to async for non-critical images
  img.decoding = 'async';

  // Enable lazy loading
  img.loading = 'lazy';

  // Set proper sizes attribute if not present
  if (!img.sizes) {
    img.sizes = PICTURE_SIZES;
  }

  // Add responsive class for CSS styling
  img.classList.add('responsive-image');

  // Ensure width/height set to prevent layout shift
  if (!img.width || !img.height) {
    // Get from data attributes or compute from aspect ratio
    const aspectRatio = img.dataset.aspectRatio || '16/9';
    if (aspectRatio === '16/9') {
      img.width = 1200;
      img.height = 675;
    } else if (aspectRatio === '4/3') {
      img.width = 1200;
      img.height = 900;
    } else if (aspectRatio === '1/1') {
      img.width = 1200;
      img.height = 1200;
    }
  }
}

/**
 * Preload critical images for faster LCP (Largest Contentful Paint)
 * Use for above-the-fold images on mobile
 *
 * @param imagePath - Path to image to preload
 */
export function preloadImage(imagePath: string): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = imagePath;

  // Use WebP if supported, fallback to original
  if (supportsWebP()) {
    const webpPath = imagePath.replace(/\.[^/.]+$/, '.webp');
    link.imagesrcset = `${webpPath} 1x`;
  }

  document.head.appendChild(link);
}

/**
 * Calculate image performance metrics
 * Useful for monitoring and optimization decisions
 */
export function calculateImagePerformance(img: HTMLImageElement) {
  const rect = img.getBoundingClientRect();
  const isAboveFold = rect.top < window.innerHeight && rect.bottom > 0;
  const isVisible = img.offsetParent !== null;

  return {
    isAboveFold,
    isVisible,
    distanceFromViewport: Math.max(0, rect.top - window.innerHeight),
    width: img.naturalWidth || img.width,
    height: img.naturalHeight || img.height,
    fileSize: img.dataset.size ? parseInt(img.dataset.size) : undefined,
  };
}
