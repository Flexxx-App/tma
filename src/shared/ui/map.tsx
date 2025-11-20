"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
const MAPBOX_MAP_STYLE = process.env.NEXT_PUBLIC_MAPBOX_STYLE ?? "";
const MAPBOX_TEST_MODE = Boolean(
  process.env.NEXT_PUBLIC_MAPBOX_TEST_MODE ?? false,
);

interface IProps {
  className?: string;
  center: [number, number];
  zoom?: number | null;
  scrollZoom?: boolean;
  setMarker?: boolean;
  dragPan?: boolean;
  dragRotate?: boolean;
  doubleClickZoom?: boolean;
  hidden?: boolean;
}

export const Map = ({
  className,
  center,
  zoom = null,
  scrollZoom = false,
  setMarker = false,
  dragPan = false,
  dragRotate = false,
  doubleClickZoom = false,
  hidden = false,
  ...props
}: IProps) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [, setIsMapLoaded] = useState(false);

  useEffect(() => {
    try {
      mapboxgl.accessToken = MAPBOX_API_KEY;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current as HTMLElement,
        style: MAPBOX_MAP_STYLE,
        center: center,
        zoom: zoom ?? undefined,
        attributionControl: false,
        testMode: MAPBOX_TEST_MODE,
        scrollZoom,
        dragPan: dragPan,
        dragRotate: dragRotate,
        minZoom: 3,
        doubleClickZoom: doubleClickZoom,
      });

      mapRef.current.on("load", () => {
        setIsMapLoaded(true);
      });

      if (setMarker) {
        new mapboxgl.Marker({ pitchAlignment: "map" })
          .setLngLat(center)
          .addTo(mapRef.current);
      }

      mapRef.current.on("error", (e) => {
        console.error("Map error:", e);
      });
    } catch (error) {
      console.error("Failed to create map:", error);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setIsMapLoaded(false);
      }
    };
  }, [
    center,
    setMarker,
    dragPan,
    zoom,
    dragRotate,
    doubleClickZoom,
    scrollZoom,
    MAPBOX_API_KEY,
    MAPBOX_MAP_STYLE,
    MAPBOX_TEST_MODE,
    hidden,
  ]);

  return (
    <>
      <div
        id="map-container"
        className={`wrapper h-full w-full overflow-hidden ${className ?? ""} ${hidden ? "hidden" : ""}`}
        ref={mapContainerRef}
        {...props}
        style={{ borderRadius: "12px" }} // fallback in case for legacy
      />
      <style jsx global>{`
        #map-container .mapboxgl-canvas {
          border-radius: 12px;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};
