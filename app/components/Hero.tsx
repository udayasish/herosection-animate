"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TYPEWRITER_HEADINGS, FLOATING_ICONS } from "../constants";
import { useTypewriter } from "../hooks/useTypewriter";

gsap.registerPlugin(ScrollTrigger);

const ANIMATION_CONFIG = {
  scrollDistance: 1200,
  scrubSmoothness: 0.5,
  iconAnimationDuration: 0.2,
  timeBetweenEachIcon: 0.04,
  // iconRotationDegrees: 360,
  iconRotationDegrees: 0,
};

const Hero: React.FC = () => {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const floatingIconElements = useRef<HTMLDivElement[]>([]);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const [hoveredIconIndex, setHoveredIconIndex] = useState<number | null>(null);

  // Custom hook for tyopewriter effects
  const { displayedLine1, displayedLine2, showCursorOnLine1 } =
    useTypewriter(TYPEWRITER_HEADINGS);

  //Get the center of the explore  button
  const getElementCenterCoordinates = (element: HTMLElement) => {
    const boundingBox = element.getBoundingClientRect(); //From MDN docs ---- The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
    console.log(`Bounding box: ${boundingBox}`);
    console.log({
      x: boundingBox.left + boundingBox.width / 2,
      y: boundingBox.top + boundingBox.height / 2,
    });

    return {
      x: boundingBox.left + boundingBox.width / 2,
      y: boundingBox.top + boundingBox.height / 2,
    };
  };

  // Helper: Calculate distance needed to move from one point to another
  const calculateDistanceToMove = (
    fromPosition: { x: number; y: number },
    toPosition: { x: number; y: number }
  ) => {
    return {
      x: toPosition.x - fromPosition.x,
      y: toPosition.y - fromPosition.y,
    };
  };

  // scroll-triggered animation
  useEffect(() => {
    const animationContext = gsap.context(() => {
      const hasIcons = floatingIconElements.current.length > 0;
      const hasButton = exploreButtonRef.current !== null;

      if (!hasIcons || !hasButton) return;

      // scroll based animation
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: `+=${ANIMATION_CONFIG.scrollDistance}`,
          scrub: ANIMATION_CONFIG.scrubSmoothness,
          pin: true, // Keep hero section visible during animation
          anticipatePin: 1,
          markers: true, // Set to true to debug scroll points
        },
      });

      // Get target position (center of explore button)
      const targetPosition = getElementCenterCoordinates(
        exploreButtonRef.current
      );

      //   scrollTimeline.addLabel("animationStart");

      floatingIconElements.current.forEach((iconElement, index) => {
        if (!iconElement) return;

        const currentIconPosition = getElementCenterCoordinates(iconElement);
        const distanceToMove = calculateDistanceToMove(
          currentIconPosition,
          targetPosition
        );

        // Add label for first icon (top icons start)
        // if (index === 0) {
        //   scrollTimeline.addLabel("topIconsDisappear");
        // }

        // Add label for middle section start
        // if (index === 3) {
        //   scrollTimeline.addLabel("middleIconsDisappear");
        // }

        // Add label for bottom section start
        // if (index === 5) {
        //   scrollTimeline.addLabel("bottomIconsDisappear");
        // }

        scrollTimeline.to(
          iconElement,
          {
            x: distanceToMove.x,
            y: distanceToMove.y,
            scale: 0, // Shrinks to nothing
            opacity: 0,
            rotation: ANIMATION_CONFIG.iconRotationDegrees,
            ease: "power4.in", // Starts very slowly, then accelerates - gradual size reduction
            duration: ANIMATION_CONFIG.iconAnimationDuration,
          },
          index * ANIMATION_CONFIG.timeBetweenEachIcon
        );
      });

      scrollTimeline.addLabel("animationComplete");
    }, heroSectionRef);

    // Cleanup animation on component unmount
    return () => animationContext.revert();
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden bg-black"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #200C0F 0%, #200C0F 20%, rgba(32, 12, 15, 0.8) 50%, transparent 100%)",
            top: "5%",
            left: "2%",
            opacity: 1,
          }}
        />

        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #091617 0%, #091617 20%, rgba(9, 22, 23, 0.8) 50%, transparent 100%)",
            top: "50%",
            left: "20%",
            opacity: 1,
          }}
        />
      </div>

      {FLOATING_ICONS.map((iconData, iconIndex) => {
        const { IconComponent, positionClass, iconColor, tooltip } = iconData;
        const mobileVisibleIndices = [0, 1, 5, 8, 10];
        const isVisibleOnMobile = mobileVisibleIndices.includes(iconIndex);
        const responsiveClass = isVisibleOnMobile ? "" : "hidden md:block";

        const isHovered = hoveredIconIndex === iconIndex;

        //tooltip positions
        let tooltipPosition = "bottom";
        if (iconIndex === 7) {
          tooltipPosition = "left";
        } else if (positionClass.includes("bottom-")) {
          tooltipPosition = "right";
        }

        const showImage = iconIndex === 0 || iconIndex === 7;

        return (
          <div
            key={iconIndex}
            className={`absolute ${positionClass} ${responsiveClass}`}
          >
            <div
              ref={(element) => {
                if (element) floatingIconElements.current[iconIndex] = element;
              }}
              className="relative rounded-full p-5 shadow-xl cursor-pointer transition-all hover:scale-110"
              style={{
                backgroundColor: isHovered ? "#ffffff" : "#362F30",
              }}
              onMouseEnter={() => setHoveredIconIndex(iconIndex)}
              onMouseLeave={() => setHoveredIconIndex(null)}
            >
              <IconComponent
                className={`w-7 h-7 ${iconColor}`}
                strokeWidth={2.5}
              />
            </div>

            {/* Tooltip implmentation */}
            {isHovered && tooltip && (
              <div
                className={`absolute z-50 animate-in fade-in duration-200 ${
                  tooltipPosition === "right"
                    ? "left-full top-1/2 -translate-y-1/2 ml-8"
                    : tooltipPosition === "left"
                    ? "right-full top-1/2 -translate-y-1/2 mr-8"
                    : "top-full left-1/2 -translate-x-1/2 mt-8"
                }`}
              >
                <div
                  className={`absolute ${
                    tooltipPosition === "right"
                      ? "right-full top-1/2 -translate-y-1/2 w-6 h-[2px] border-t-2 border-dotted border-gray-600"
                      : tooltipPosition === "left"
                      ? "left-full top-1/2 -translate-y-1/2 w-6 h-[2px] border-t-2 border-dotted border-gray-600"
                      : "bottom-full left-1/2 -translate-x-1/2 w-[2px] h-6 border-l-2 border-dotted border-gray-600"
                  }`}
                />

                <div className="bg-[#171717] border-2 border-dashed border-gray-700 rounded-2xl p-6 w-[300px] shadow-2xl">
                  {/* Icon and title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full bg-white p-3 flex items-center justify-center">
                      <IconComponent
                        className={`w-6 h-6 ${iconColor}`}
                        strokeWidth={2.5}
                      />
                    </div>
                    <h3 className="text-white text-lg font-semibold">
                      {tooltip.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    {tooltip.description}
                  </p>

                  {showImage && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src="https://www.3dimli.com/_next/static/media/car-model.40128753.avif"
                        alt={tooltip.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Hero Section Implemantaion */}
      <div className="z-10 text-center px-4">
        <h1
          className="text-4xl md:text-5xl min-h-[180px] flex flex-col items-center justify-center leading-tight"
          style={{
            fontWeight: 600,
            fontStyle: "normal",
            fontVariant: "normal",
            fontKerning: "auto",
            fontStretch: "100%",
            textTransform: "none",
            textDecoration: "none",
            textAlign: "center",
            textIndent: "0px",
          }}
        >
          <span className="block">
            {displayedLine1}
            {showCursorOnLine1 && <span className="animate-pulse ml-1">|</span>}
          </span>
          <span className="block">
            {displayedLine2}
            {!showCursorOnLine1 && (
              <span className="animate-pulse ml-1">|</span>
            )}
          </span>
        </h1>

        <p
          className="mt-6 mb-2 text-lg text-gray-400 max-w-xl mx-auto"
          style={{
            fontWeight: 500,
            fontStyle: "normal",
            fontVariant: "normal",
            fontKerning: "auto",
            fontStretch: "100%",
            textTransform: "none",
            textDecoration: "none",
            textAlign: "center",
            textIndent: "0px",
          }}
        >
          Your one-stop digital platform for 3D models and digital creations.
          Join our community of creators and collectors today.
        </p>

        <button
          ref={exploreButtonRef}
          className="nc-Button h-auto inline-flex items-center justify-center rounded-full transition-colors text-base z-[1000] 1.7sm:text-lg font-medium py-3.5 px-8 1.7sm:py-4 1.7sm:px-10 bg-[rgb(2,132,199)] hover:bg-[hsl(201,96.30%,32.20%)] text-neutral-50 dark:bg-transparent dark:border whitespace-nowrap dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 w-auto min-w-[200px] 1.7sm:min-w-[250px] overflow-hidden shine-infinite relative mt-10"
        >
          {/* Shimmer effect */}
          <span className="absolute inset-0 w-[200%] h-[200%] -top-1/2 -left-1/2 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>

          <span className="relative z-10">Explore all products</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
