declare module '@splidejs/react-splide' {
  import { ComponentType, ReactNode, RefObject } from 'react';
  import { Options } from '@splidejs/splide';

  export interface AutoplayOptions {
    delay?: number;
    pauseOnHover?: boolean;
    pauseOnFocus?: boolean;
  }

  export interface AutoScrollOptions {
    speed?: number;
    autoStart?: boolean;
    rewind?: boolean;
    pauseOnHover?: boolean;
    pauseOnFocus?: boolean;
  }

  export interface ExtensionsOptions {
    AutoScroll?: AutoScrollOptions;
  }

  export interface SplideOptions extends Options {
    autoplay?: boolean | AutoplayOptions;
    extensions?: ExtensionsOptions;
  }

  export interface SplideProps {
    options?: SplideOptions;
    children?: ReactNode;
    'aria-label'?: string;
    ref?: RefObject<any>;
  }

  export interface SplideSlideProps {
    children?: ReactNode;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}
