"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  children: React.ReactNode;
  options?: EmblaOptionsType;
};

export const EmblaCarousel: React.FC<PropType> = (props) => {
  const { children, options } = props;
  const childrenCount = React.Children.count(children);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    ...options,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(`.embla__slide__number`) as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scaleClamped = numberWithinRange(tweenValue, 0.92, 1);
          const opacityClamped = numberWithinRange(
            0.4 + (scaleClamped - 0.9) * 6,
            0.4,
            1,
          );
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scaleClamped.toString()})`;
          tweenNode.style.opacity = opacityClamped.toString();
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale, setTweenNodes, setTweenFactor]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onReInit = () => {
      const snaps = emblaApi.scrollSnapList();
      setScrollSnaps(
        snaps.length > 0
          ? snaps
          : Array.from({ length: childrenCount }, (_, i) => i),
      );
      onSelect();
    };
    emblaApi.on("select", onSelect).on("reInit", onReInit).on("init", onReInit);
  }, [emblaApi, childrenCount]);

  const snapsForRender =
    scrollSnaps.length > 0
      ? scrollSnaps
      : Array.from({ length: childrenCount }, (_, i) => i);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex [touch-action:pan-y_pinch-zoom] gap-4">
          {React.Children.map(children, (child, index) => (
            <div
              className="transform-gpu grow-0 shrink-0 basis-[100%] min-w-0 flex justify-center"
              key={index}
            >
              <div className="embla__slide__number w-full [backface-visibility:hidden] origin-center transition-[transform,opacity] duration-300 ease-out will-change-transform">
                {child}
              </div>
            </div>
          ))}
        </div>
      </div>
      {snapsForRender.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {snapsForRender.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={[
                "h-2 w-2 rounded-full transition-all duration-200",
                i === selectedIndex ? "bg-white/90" : "bg-white/40",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
};
