"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type MapMarker = {
  id: string | number;
  lat: number;
  lng: number;
  title?: string;
};

type KakaoWindow = typeof window & {
  kakao?: {
    maps?: {
      load: (callback: () => void) => void;
      LatLng: new (lat: number, lng: number) => any;
      LatLngBounds: new () => {
        extend: (latLng: any) => void;
        isEmpty: () => boolean;
        getSouthWest: () => any;
      };
      Map: new (container: HTMLElement, options: any) => any;
      Marker: new (options: any) => any;
      event: {
        addListener: (target: any, type: string, handler: () => void) => void;
        removeListener: (
          target: any,
          type: string,
          handler: () => void
        ) => void;
      };
    };
  };
};

type MarkerStoreItem = {
  marker: any;
  overlay?: any;
  clickHandler?: () => void;
};

type PolygonPathCoordinate = {
  lat: number;
  lng: number;
};

type MapPolygon = {
  id?: string | number;
  paths: PolygonPathCoordinate[][];
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
  fillColor?: string;
  fillOpacity?: number;
  zIndex?: number;
};

type KakaoMapProps = {
  className?: string;
  center?: {
    lat: number;
    lng: number;
  } | null;
  level?: number;
  height?: number | string;
  markers?: MapMarker[];
  fitToMarkers?: boolean;
  fitBoundsPadding?: number;
  fitBoundsKey?: number | string;
  onMarkerClick?: (markerId: string | number) => void;
  draggable?: boolean;
  scrollwheel?: boolean;
  centerAnchor?: { x: number; y: number };
  selectedMarkerId?: string | number;
  polygons?: MapPolygon[];
};

const SCRIPT_ID = "kakao-map-sdk";
const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };
const DEFAULT_LEVEL = 7;
const DEFAULT_ANCHOR = { x: 0.5, y: 0.5 };

const KakaoMap = ({
  className,
  center,
  level = DEFAULT_LEVEL,
  height = 240,
  markers,
  polygons,
  fitToMarkers = false,
  fitBoundsPadding = 60,
  fitBoundsKey,
  onMarkerClick,
  draggable = true,
  scrollwheel = true,
  centerAnchor = DEFAULT_ANCHOR,
  selectedMarkerId,
}: KakaoMapProps) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const getBlueDotImage = (maps: any) => {
    // 12x12 blue circle SVG as data URL
    const svg = encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="6" fill="#3F7CF6"/></svg>'
    );
    const src = `data:image/svg+xml;charset=UTF-8,${svg}`;
    const size = new maps.Size(12, 12);
    const offset = new maps.Point(6, 6); // center the dot
    return new maps.MarkerImage(src, size, { offset });
  };

  const getSelectedPinImage = (maps: any) => {
    // 28x36 styled pin SVG (accent color + inner white + subtle shadow)
    const svg = encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='28' height='36' viewBox='0 0 28 36'>
        <defs>
          <filter id='shadow' x='-50%' y='-50%' width='200%' height='200%'>
            <feDropShadow dx='0' dy='2' stdDeviation='2' flood-color='rgba(0,0,0,0.25)'/>
          </filter>
          <linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stop-color='#5A8BFF'/>
            <stop offset='100%' stop-color='#3F7CF6'/>
          </linearGradient>
        </defs>
        <g filter='url(#shadow)'>
          <path d='M14 0c7.18 0 13 5.7 13 12.73 0 8.45-10.5 19.88-12.27 21.68-.4.41-1.05.41-1.45 0C11.5 32.6 1 21.18 1 12.73 1 5.7 6.82 0 14 0z' fill='url(#g)'/>
          <circle cx='14' cy='12' r='6.5' fill='#fff'/>
        </g>
      </svg>
    `);
    const src = `data:image/svg+xml;charset=UTF-8,${svg}`;
    const size = new maps.Size(28, 36);
    const offset = new maps.Point(14, 36); // anchor at the tip
    return new maps.MarkerImage(src, size, { offset });
  };

  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  // Insert <wbr> every `unit` characters for soft breaks in labels.
  const withSoftBreaks = (text: string, unit = 10) => {
    if (!text) return "";
    // Insert <wbr> every `unit` characters so the browser can wrap there.
    // Works with CJK too (per code unit), which is fine for short labels.
    const parts: string[] = [];
    for (let i = 0; i < text.length; i += unit) {
      parts.push(text.slice(i, i + unit));
    }
    return parts.join("<wbr>");
  };

  // Helper to set overlays visibility
  const setOverlaysVisible = (visible: boolean) => {
    const map = mapInstanceRef.current;
    const store = markerStoreRef.current;
    store.forEach((entry) => {
      if (entry.overlay) {
        entry.overlay.setMap(visible ? map : null);
      }
    });
  };
  // Helper to get a biased center LatLng so that the given point appears at centerAnchor in the container
  const getBiasedCenterLatLng = (maps: any, map: any, targetLatLng: any) => {
    const container = containerRef.current;
    if (!container || !map) return targetLatLng;
    const proj = map.getProjection();
    const pt = proj.pointFromCoords(targetLatLng);
    const dx = (centerAnchor.x - 0.5) * container.clientWidth;
    const dy = (centerAnchor.y - 0.5) * container.clientHeight;
    pt.x -= dx;
    pt.y -= dy;
    return proj.coordsFromPoint(pt);
  };

  const moveToBiasedCenter = (
    maps: any,
    map: any,
    targetLatLng: any,
    { animate = true }: { animate?: boolean } = {}
  ) => {
    if (!maps || !map || !targetLatLng) return;
    const biased = getBiasedCenterLatLng(maps, map, targetLatLng);
    if (animate && typeof map.panTo === "function") {
      map.panTo(biased);
    } else {
      map.setCenter(biased);
    }
  };
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const markerStoreRef = useRef<Map<MapMarker["id"], MarkerStoreItem>>(
    new Map()
  );
  const polygonStoreRef = useRef<Map<string, any>>(new Map());
  const mapsRef = useRef<any>(null);
  const lastKnownLevelRef = useRef<number | null>(null);

  const safeCenter = center ?? DEFAULT_CENTER;

  const kakaoMarkers = useMemo(
    () =>
      (markers ?? []).filter(
        (marker) =>
          Number.isFinite(marker.lat) &&
          Number.isFinite(marker.lng) &&
          !(marker.lat === 0 && marker.lng === 0)
      ),
    [markers]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!containerRef.current) return;

    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_MAP;
    if (!kakaoKey) {
      console.warn("Kakao map key is not configured.");
      return;
    }

    const mountMap = () => {
      const kakaoGlobal = (window as KakaoWindow).kakao;
      const maps = kakaoGlobal?.maps;
      if (!maps || !containerRef.current) return;

      mapsRef.current = maps;
      setIsMapReady(false);

      maps.load(() => {
        if (!containerRef.current) return;

        const initialCenter = new maps.LatLng(
          safeCenter.lat ?? DEFAULT_CENTER.lat,
          safeCenter.lng ?? DEFAULT_CENTER.lng
        );

        const options = {
          center: initialCenter,
          level,
          draggable,
          scrollwheel,
        };

        mapInstanceRef.current = new maps.Map(containerRef.current, options);

        // After map creation, bias the center if needed
        moveToBiasedCenter(maps, mapInstanceRef.current, initialCenter, {
          animate: false,
        });
        lastKnownLevelRef.current =
          mapInstanceRef.current.getLevel?.() ?? level;

        // Show labels only when zoom level is 7 or less
        maps.event.addListener(mapInstanceRef.current, "zoom_changed", () => {
          const currentLevel = mapInstanceRef.current.getLevel();
          setOverlaysVisible(currentLevel <= 7);
          lastKnownLevelRef.current = currentLevel;
        });

        if (!kakaoMarkers.length) {
          markerRef.current = new maps.Marker({
            position: initialCenter,
            map: mapInstanceRef.current,
          });
        }

        setIsMapReady(true);
      });
    };

    if ((window as KakaoWindow).kakao?.maps) {
      mountMap();
      return;
    }

    const existingScript = document.getElementById(
      SCRIPT_ID
    ) as HTMLScriptElement | null;

    const handleLoad = () => mountMap();

    if (existingScript) {
      existingScript.addEventListener("load", handleLoad, { once: true });
      return () =>
        existingScript.removeEventListener("load", handleLoad as () => void);
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
    script.async = true;
    script.addEventListener("load", handleLoad, { once: true });
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !mapsRef.current) return;
    mapInstanceRef.current.setDraggable(draggable);
    mapInstanceRef.current.setZoomable(scrollwheel);
  }, [draggable, scrollwheel]);

  // Sync single marker when there is no markers prop
  useEffect(() => {
    if (!mapInstanceRef.current || !mapsRef.current) return;

    if (kakaoMarkers.length > 0) {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
      return;
    }

    const maps = mapsRef.current;
    const nextCenter = new maps.LatLng(safeCenter.lat, safeCenter.lng);
    const biased = getBiasedCenterLatLng(
      maps,
      mapInstanceRef.current,
      nextCenter
    );
    mapInstanceRef.current.setCenter(biased);
    if (typeof level === "number") {
      mapInstanceRef.current.setLevel(level);
      lastKnownLevelRef.current = mapInstanceRef.current.getLevel?.() ?? level;
    }

    if (!markerRef.current) {
      markerRef.current = new maps.Marker({
        position: nextCenter,
        map: mapInstanceRef.current,
      });
    } else {
      markerRef.current.setPosition(nextCenter);
      markerRef.current.setMap(mapInstanceRef.current);
    }
  }, [
    safeCenter.lat,
    safeCenter.lng,
    level,
    kakaoMarkers.length,
    centerAnchor.x,
    centerAnchor.y,
  ]);

  // Update markers whenever markers array changes
  useEffect(() => {
    if (!mapInstanceRef.current || !mapsRef.current) return;
    const maps = mapsRef.current;
    const store = markerStoreRef.current;

    // Clear existing markers & overlays
    store.forEach((entry) => {
      if (entry.clickHandler) {
        maps.event.removeListener(entry.marker, "click", entry.clickHandler);
      }
      if (entry.overlay) {
        entry.overlay.setMap(null);
      }
      entry.marker.setMap(null);
    });
    store.clear();

    const blueDot = getBlueDotImage(maps);
    const selectedPin = getSelectedPinImage(maps);

    kakaoMarkers.forEach((markerData) => {
      const position = new maps.LatLng(markerData.lat, markerData.lng);
      const isSelected =
        selectedMarkerId != null &&
        String(markerData.id) === String(selectedMarkerId);
      const image = isSelected ? selectedPin : blueDot;

      const marker = new maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: markerData.title,
        image,
        zIndex: isSelected ? 100 : 10,
      });

      // Label under the marker, bolder/more visible for selected
      const rawTitle = markerData.title ? escapeHtml(markerData.title) : "";
      const wrappedTitle =
        rawTitle.length > 10 ? withSoftBreaks(rawTitle, 10) : rawTitle;

      const labelHtml = `
        <div style="
          position: relative;
          transform: translate(-50%, 8px);
          text-align: center;
          max-width: 160px;
          white-space: normal;
          word-break: keep-all;
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 11px;
          line-height: 1.2;
          font-weight: ${isSelected ? "700" : "600"};
          color: ${isSelected ? "#0f172a" : "#1f2937"};
          background: ${
            isSelected ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.9)"
          };
          border: 1px solid rgba(15,23,42,0.12);
          box-shadow: 0 2px 6px rgba(15,23,42,0.12);
          pointer-events: none;
        ">
          ${wrappedTitle}
        </div>`;

      const overlay = new maps.CustomOverlay({
        position,
        content: labelHtml,
        xAnchor: 0.5,
        yAnchor: 0, // position is at marker point; we translate down via CSS
      });
      overlay.setMap(mapInstanceRef.current);

      let clickHandler: (() => void) | undefined;
      if (onMarkerClick) {
        clickHandler = () => onMarkerClick(markerData.id);
        maps.event.addListener(marker, "click", clickHandler);
      }

      store.set(markerData.id, { marker, overlay, clickHandler });
    });

    // Show labels only when zoom level is 7 or less
    try {
      const currentLevel = mapInstanceRef.current?.getLevel?.();
      if (typeof currentLevel === "number") {
        setOverlaysVisible(currentLevel <= 7);
      }
    } catch {}
  }, [kakaoMarkers, onMarkerClick, selectedMarkerId]);

  useEffect(() => {
    if (!isMapReady) return;
    if (!mapInstanceRef.current || !mapsRef.current) return;

    const maps = mapsRef.current;
    const store = polygonStoreRef.current;

    store.forEach((polygon) => polygon.setMap(null));
    store.clear();

    (polygons ?? []).forEach((polygonData, index) => {
      const processedPaths = (polygonData.paths ?? [])
        .map((ring) =>
          ring
            .map((coord) => {
              if (!Number.isFinite(coord.lat) || !Number.isFinite(coord.lng)) {
                return null;
              }
              return new maps.LatLng(coord.lat, coord.lng);
            })
            .filter((coord): coord is any => coord !== null)
        )
        .filter((ring) => ring.length >= 3);

      if (!processedPaths.length) return;

      const polygon = new maps.Polygon({
        path: processedPaths,
        strokeWeight: polygonData.strokeWeight ?? 3,
        strokeColor: polygonData.strokeColor ?? "#2563eb",
        strokeOpacity: polygonData.strokeOpacity ?? 0.85,
        strokeStyle: "solid",
        fillColor: polygonData.fillColor ?? "#c8d1ff",
        fillOpacity: polygonData.fillOpacity ?? 0.22,
        zIndex: polygonData.zIndex ?? 5,
      });

      polygon.setMap(mapInstanceRef.current);
      const key =
        polygonData.id != null
          ? String(polygonData.id)
          : `polygon-${index.toString()}`;
      store.set(key, polygon);
    });

    return () => {
      store.forEach((polygon) => polygon.setMap(null));
      store.clear();
    };
  }, [isMapReady, polygons]);

  // Fit bounds to markers whenever requested
  useEffect(() => {
    if (!fitToMarkers) return;
    if (!mapInstanceRef.current || !mapsRef.current) return;

    const maps = mapsRef.current;
    const bounds = new maps.LatLngBounds();
    let hasPoint = false;

    kakaoMarkers.forEach((markerData) => {
      const latLng = new maps.LatLng(markerData.lat, markerData.lng);
      bounds.extend(latLng);
      hasPoint = true;
    });

    (polygons ?? []).forEach((polygonData) => {
      (polygonData.paths ?? []).forEach((ring) => {
        ring.forEach((coord) => {
          if (
            Number.isFinite(coord.lat) &&
            Number.isFinite(coord.lng) &&
            !(coord.lat === 0 && coord.lng === 0)
          ) {
            const latLng = new maps.LatLng(coord.lat, coord.lng);
            bounds.extend(latLng);
            hasPoint = true;
          }
        });
      });
    });

    if (!hasPoint) return;

    if (kakaoMarkers.length === 1 && !polygons?.length) {
      const markerCenter = new maps.LatLng(
        kakaoMarkers[0].lat,
        kakaoMarkers[0].lng
      );
      const biasedMarkerCenter = getBiasedCenterLatLng(
        maps,
        mapInstanceRef.current,
        markerCenter
      );
      mapInstanceRef.current.setCenter(biasedMarkerCenter);
      return;
    }

    const previousLevel =
      lastKnownLevelRef.current ?? mapInstanceRef.current.getLevel?.() ?? null;

    mapInstanceRef.current.setBounds(
      bounds,
      fitBoundsPadding,
      fitBoundsPadding,
      fitBoundsPadding,
      fitBoundsPadding
    );

    if (previousLevel !== null) {
      mapInstanceRef.current.setLevel(previousLevel);
      lastKnownLevelRef.current = previousLevel;
    }

    if (center) {
      const targetCenter = new maps.LatLng(center.lat, center.lng);
      const biasedTargetCenter = getBiasedCenterLatLng(
        maps,
        mapInstanceRef.current,
        targetCenter
      );
      mapInstanceRef.current.setCenter(biasedTargetCenter);
    }
  }, [
    fitToMarkers,
    fitBoundsKey,
    kakaoMarkers,
    fitBoundsPadding,
    level,
    polygons,
    center?.lat,
    center?.lng,
    centerAnchor.x,
    centerAnchor.y,
  ]);

  // Allow explicit center changes even when markers exist
  useEffect(() => {
    if (!mapInstanceRef.current || !mapsRef.current) return;
    if (!center) return;
    if (!kakaoMarkers.length) return;

    const maps = mapsRef.current;
    const target = new maps.LatLng(center.lat, center.lng);
    const biased = getBiasedCenterLatLng(maps, mapInstanceRef.current, target);
    mapInstanceRef.current.panTo(biased);
  }, [
    center?.lat,
    center?.lng,
    kakaoMarkers.length,
    centerAnchor.x,
    centerAnchor.y,
  ]);

  useEffect(() => {
    if (!isMapReady) return;
    if (!mapInstanceRef.current || !mapsRef.current) return;
    const maps = mapsRef.current;
    const currentCenter = mapInstanceRef.current.getCenter?.();
    if (!currentCenter) return;
    const biased = getBiasedCenterLatLng(
      maps,
      mapInstanceRef.current,
      currentCenter
    );
    mapInstanceRef.current.setCenter(biased);
  }, [centerAnchor.x, centerAnchor.y, isMapReady]);

  const heightStyle = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: heightStyle }}
    />
  );
};

export default KakaoMap;
