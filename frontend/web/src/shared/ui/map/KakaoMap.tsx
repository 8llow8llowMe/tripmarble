"use client";

import { useEffect, useRef } from "react";

type KakaoMapProps = {
  className?: string;
  center?: {
    lat: number;
    lng: number;
  };
  level?: number;
  height?: number | string; // px number or any CSS height string
};

type KakaoWindow = typeof window & {
  kakao?: {
    maps?: {
      load: (callback: () => void) => void;
      LatLng: new (lat: number, lng: number) => any;
      Map: new (container: HTMLElement, options: any) => any;
      Marker: new (options: any) => any;
    };
  };
};

const SCRIPT_ID = "kakao-map-sdk";
const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };
const DEFAULT_LEVEL = 7;

const KakaoMap = ({
  className,
  center = DEFAULT_CENTER,
  level = DEFAULT_LEVEL,
  height = 240,
}: KakaoMapProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mapContainer = containerRef.current;
    if (!mapContainer) return;

    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_MAP;
    if (!kakaoKey) {
      console.warn("Kakao map key is not configured.");
      return;
    }

    const initialize = () => {
      const kakaoGlobal = (window as KakaoWindow).kakao;
      const maps = kakaoGlobal?.maps;
      if (!maps || !containerRef.current) return;

      maps.load(() => {
        if (!containerRef.current) return;
        const kakaoCenter = new maps.LatLng(
          center.lat ?? DEFAULT_CENTER.lat,
          center.lng ?? DEFAULT_CENTER.lng
        );

        const options = {
          center: kakaoCenter,
          level: level ?? DEFAULT_LEVEL,
        };

        mapInstanceRef.current = new maps.Map(containerRef.current, options);

        // Create a marker at the center
        markerRef.current = new maps.Marker({
          position: kakaoCenter,
          map: mapInstanceRef.current,
        });
      });
    };

    if ((window as KakaoWindow).kakao?.maps) {
      initialize();
      return;
    }

    const existingScript = document.getElementById(
      SCRIPT_ID
    ) as HTMLScriptElement | null;
    const handleLoad = () => initialize();

    if (existingScript) {
      existingScript.addEventListener("load", handleLoad, { once: true });
      return () => existingScript.removeEventListener("load", handleLoad);
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
    // center/level updates handled in separate effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const kakaoGlobal = (window as KakaoWindow).kakao;
    const maps = kakaoGlobal?.maps;
    if (!maps || !mapInstanceRef.current) return;

    const kakaoCenter = new maps.LatLng(center.lat, center.lng);
    mapInstanceRef.current.setCenter(kakaoCenter);
    if (typeof level === "number") {
      mapInstanceRef.current.setLevel(level);
    }
    if (markerRef.current) {
      markerRef.current.setPosition(kakaoCenter);
    }
  }, [center.lat, center.lng, level]);

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
