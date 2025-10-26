import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import Constants from 'expo-constants';

type KakaoMapProps = {
  latitude: number;
  longitude: number;
  height?: number; // 기본 200
  zoomLevel?: number; // 작을수록 확대, 기본 5
};

const ENV_KEY =
  process.env.EXPO_PUBLIC_KAKAO_MAP ??
  ((Constants.expoConfig?.extra as any)?.EXPO_PUBLIC_KAKAO_MAP as string | undefined);

export default function KakaoMap({
  latitude,
  longitude,
  height = 200,
  zoomLevel = 5,
}: KakaoMapProps) {
  const html = useMemo(
    () => `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
    <style>
      html,body,#map{margin:0;padding:0;width:100%;height:100%}
      .fab{position:absolute;right:12px;bottom:12px;width:40px;height:40px;border-radius:20px;
        display:flex;align-items:center;justify-content:center;background:#ffffffcc;border:1px solid #e5e7eb}
    </style>
    <script>
      (function(){
        // RN으로 메시지 보내기
        function post(type, payload){ try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({type, ...payload})) }catch(e){} }
        // 글로벌 에러 캐치 (SDK 404, 도메인 미허용 등)
        window.addEventListener('error', function(e){
          post('error', { msg: (e && (e.message || e.error && e.error.message)) || 'window.error' });
        });

        // 키 검증(비어있음)
        var APPKEY='${ENV_KEY ?? ''}';
        if(!APPKEY){
          post('error', { msg: 'missing_appkey' });
          return;
        }

        // Kakao SDK 스크립트 주입 (autoload=false)
        var s = document.createElement('script');
        s.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=' + APPKEY + '&autoload=false';
        s.async = true;
        s.onerror = function(){ post('error', { msg: 'sdk_script_onerror' }); };
        document.head.appendChild(s);

        s.onload = function(){
          try {
            if(!(window.kakao && window.kakao.maps)){
              post('error', { msg: 'sdk_loaded_but_no_maps' });
              return;
            }
            window.kakao.maps.load(function init(){
              try{
                var center = new kakao.maps.LatLng(${latitude}, ${longitude});
                var map = new kakao.maps.Map(document.getElementById('map'), { center: center, level: ${zoomLevel} });
                var marker = new kakao.maps.Marker({ position: center });
                marker.setMap(map);

                // RN -> Web 중심 이동
                document.addEventListener('message', function(e){
                  try{
                    var msg = JSON.parse(e.data);
                    if(msg.type === 'setCenter'){
                      var pos = new kakao.maps.LatLng(msg.lat, msg.lng);
                      map.setCenter(pos);
                      marker.setPosition(pos);
                    }
                  }catch(_){}
                });

                // Web -> RN 중심 읽기
                window.postCenter = function(){
                  var c = map.getCenter();
                  post('center', { lat: c.getLat(), lng: c.getLng() });
                };

                post('ready', {});
              }catch(e){
                post('error', { msg: 'init_exception:' + (e && e.message) });
              }
            });
          }catch(e){
            post('error', { msg: 'kakao_maps_load_exception:' + (e && e.message) });
          }
        };
      })();
    </script>
  </head>
  <body>
    <div id="map"></div>
    // <button class="fab" onclick="postCenter()">⌖</button>
  </body>
</html>`,
    [latitude, longitude, zoomLevel],
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.EXPO_PUBLIC_KAKAO_MAP}`,
        );
        const text = await res.text();
        console.log('🧭 Kakao SDK response preview:', text.slice(0, 120));

        if (text.includes('AccessDeniedError') || text.includes('domain mismatched')) {
          console.warn('🚨 카카오 도메인 미등록 문제입니다.');
        } else {
          console.log('✅ Kakao SDK 정상 응답 (도메인 허용 OK)');
        }
      } catch (e) {
        console.error('❌ Fetch 실패:', e);
      }
    })();
  }, []);

  return (
    <View style={[styles.wrap, { height }]}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        scrollEnabled={false}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 12, overflow: 'hidden', backgroundColor: '#F2F4F6' },
  debug: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#00000055',
    borderRadius: 6,
  },
  debugText: { color: '#fff', fontSize: 11 },
});
