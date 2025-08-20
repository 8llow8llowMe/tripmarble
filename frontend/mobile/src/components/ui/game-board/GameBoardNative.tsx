import { TripGameTileView } from '@/hooks/game/useGetGameTiles';
import React, {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import Svg, { Rect, Text as SvgText, TSpan, Defs, ClipPath } from 'react-native-svg';

type Props = {
  count?: number; // 한 변 칸 수 (기본 5)
  tiles: TripGameTileView[];
  onCellPress?: (tile: TripGameTileView, index: number) => void;
  pieceSource?: any; // require('.../Logo.png') 또는 { uri: ... }
  size?: number; // 한 칸 크기 (기본 80)
  onIndexChange?: (index: number) => void;
};

// === 좌표 매핑(오른쪽 아래 시작, 시계방향) ===
function buildLogicalPositions(count: number) {
  const max = count - 1;
  const logical: { row: number; col: number }[] = [];
  // 1) bottom row: right -> left
  for (let c = max; c >= 0; c--) logical.push({ row: max, col: c });
  // 2) left col: bottom-1 -> top
  for (let r = max - 1; r >= 0; r--) logical.push({ row: r, col: 0 });
  // 3) top row: left+1 -> right
  for (let c = 1; c <= max; c++) logical.push({ row: 0, col: c });
  // 4) right col: top+1 -> bottom-1
  for (let r = 1; r <= max - 1; r++) logical.push({ row: r, col: max });
  return logical;
}

// === 보드 렌더 순서(행 우선 외곽) ===
function buildRenderPositions(count: number) {
  const positions: { row: number; col: number }[] = [];
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (row === 0 || row === count - 1 || col === 0 || col === count - 1) {
        positions.push({ row, col });
      }
    }
  }
  return positions;
}

// === 보드 팔레트 (웹과 유사) ===
function getCellColors(type: string): [string, string] {
  switch (type) {
    case 'start-go':
      return ['#d4f6da', '#7edb8a'];
    case 'PHOTO':
      return ['#FCB6CB', '#C790A5'];
    case 'REVIEW':
      return ['#01C5D9', '#0296A4'];
    case 'CHECKIN_GPS':
      return ['#40C896', '#2E936F'];
    default:
      return ['#F7F7F8', '#BBBBBB'];
  }
}
export type GameBoardHandle = {
  move: (steps: number) => void;
  getIndex: () => number;
};
const GameBoardNative = forwardRef<GameBoardHandle, Props>(function GameBoardNative(
  { count = 5, tiles, onCellPress, pieceSource, size = 80, onIndexChange }: Props,
  ref,
) {
  const PADDING_LEFT = 0;
  const [container, setContainer] = useState({ width: 0, height: 0 });
  const width = container.width || size * count + PADDING_LEFT;
  const height = container.height || size * count + 15;
  const CELL = Math.max(1, Math.floor((width - PADDING_LEFT) / count));

  // 그리기 순서와 논리 순서
  const renderPositions = useMemo(() => buildRenderPositions(count), [count]);
  const logicalPositions = useMemo(() => buildLogicalPositions(count), [count]);

  // 좌표 → 타일 매핑 (시작칸 비우고 GO)
  const boardData = useMemo(() => {
    const toKey = (r: number, c: number) => `${r},${c}`;
    const map = new Map<string, { index: number; type: string; title: string }>();

    // start-go 예약
    const startPos = logicalPositions[0];
    map.set(toKey(startPos.row, startPos.col), { index: -1, type: 'start-go', title: 'GO' });

    // +1 offset 시계방향 배치
    for (let i = 0; i < tiles.length; i++) {
      const pos = logicalPositions[(i + 1) % logicalPositions.length];
      const t = tiles[i];
      const type =
        t.missionTypeCode === 'PHOTO'
          ? 'PHOTO'
          : t.missionTypeCode === 'REVIEW'
            ? 'REVIEW'
            : t.missionTypeCode === 'CHECKIN_GPS'
              ? 'CHECKIN_GPS'
              : 'normal';
      map.set(toKey(pos.row, pos.col), { index: i, type, title: t.tripSpotName });
    }

    // 렌더 순서로 배열 만들되, 각 셀에 매핑된 payload를 넣기
    return renderPositions.map(({ row, col }) => {
      const payload = map.get(toKey(row, col));
      return {
        row,
        col,
        index: payload?.index ?? -1,
        type: payload?.type ?? 'normal',
        title: payload?.title ?? '',
      };
    });
  }, [renderPositions, logicalPositions, tiles]);

  // === 말 위치/이동 ===
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pieceXY, setPieceXY] = useState({ x: width / 2, y: height / 2 }); // 시작값 임시
  const [isMoving, setIsMoving] = useState(false);

  // 셀 중심 좌표 얻기
  const getCenterXY = (row: number, col: number) => ({
    x: col * CELL + CELL / 2 + PADDING_LEFT,
    y: row * CELL + CELL / 2 + 30,
  });

  // 인덱스로 좌표 얻기(논리 순서 기준)
  const getXYByIndex = (idx: number) => {
    const pos = logicalPositions[idx % logicalPositions.length];
    return getCenterXY(pos.row, pos.col);
  };

  // 포물선 보간
  const parabola = (sx: number, sy: number, ex: number, ey: number, h: number, t: number) => {
    'worklet';
    const cx = (sx + ex) / 2;
    const cy = Math.min(sy, ey) - h;
    const x = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cx + t * t * ex;
    const y = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cy + t * t * ey;
    return { x, y };
  };

  // 이동 애니메이션 (웹과 동일: 스텝 수만큼 재귀)
  const animateMove = (steps: number) => {
    if (isMoving) return;
    setIsMoving(true);

    let moved = 0;
    const duration = 250;

    const stepOnce = (fromIdx: number, toIdx: number) => {
      const from = getXYByIndex(fromIdx);
      const to = getXYByIndex(toIdx);
      let start: number | null = null;

      const raf = (ts: number) => {
        if (start == null) start = ts;
        const t = Math.min((ts - start) / duration, 1);
        const p = parabola(from.x, from.y, to.x, to.y, 50, t);
        setPieceXY(p);
        if (t < 1) {
          requestAnimationFrame(raf);
        } else {
          moved += 1;
          if (moved < steps) {
            stepOnce(
              (fromIdx + 1) % logicalPositions.length,
              (toIdx + 1) % logicalPositions.length,
            );
          } else {
            setIsMoving(false);
            const next = toIdx % logicalPositions.length;
            setCurrentIndex(next);
            if (typeof onIndexChange === 'function') onIndexChange(next); // 부모에 알림
          }
        }
      };
      requestAnimationFrame(raf);
    };

    stepOnce(currentIndex, (currentIndex + 1) % logicalPositions.length);
  };

  // 타일 클릭
  const handleCellPress = (cell: (typeof boardData)[number]) => {
    if (cell.index !== -1 && onCellPress) {
      onCellPress(tiles[cell.index], cell.index);
    }
  };

  // 초기 말 위치 = 시작칸(오른쪽 아래) 중앙
  useEffect(() => {
    const start = logicalPositions[0];
    setPieceXY(getCenterXY(start.row, start.col));
    setCurrentIndex(0);
  }, [count, width, height]);

  // 한 글자 픽셀폭 추정: 한글/전각 ~ 0.95 * fontSize, ascii ~ 0.55 * fontSize
  const charWidth = (ch: string, fontSize: number) =>
    /[ -~]/.test(ch) ? fontSize * 0.55 : fontSize * 0.95;

  const layoutSvgLines = (
    text: string,
    maxWidthPx: number,
    fontSize: number,
    maxLines = 4,
  ): string[] => {
    if (!text) return [''];
    const lines: string[] = [];
    let line = '';
    let w = 0;

    const pushLine = (s: string) => {
      lines.push(s);
      line = '';
      w = 0;
    };

    for (const ch of text) {
      const cw = charWidth(ch, fontSize);
      if (w + cw > maxWidthPx) {
        if (line.length === 0) {
          // 아주 긴 한 글자도 커버
          pushLine(ch);
        } else {
          pushLine(line);
          line = ch;
          w = cw;
        }
        if (lines.length === maxLines) break;
      } else {
        line += ch;
        w += cw;
      }
    }
    if (lines.length < maxLines && line) lines.push(line);

    // 말줄임 처리
    if (lines.length > maxLines) lines.length = maxLines;
    if (lines.length === maxLines) {
      // 마지막 줄 폭이 넘치면 '…'로 줄이기
      const last = lines[lines.length - 1];
      let lw = 0;
      const ell = '…';
      const ellW = charWidth(ell, fontSize);
      const maxW = Math.max(0, maxWidthPx - ellW);
      let out = '';
      for (const ch of last) {
        const cw = charWidth(ch, fontSize);
        if (lw + cw > maxW) break;
        out += ch;
        lw += cw;
      }
      lines[lines.length - 1] = out + ell;
    }
    return lines;
  };

  useImperativeHandle(
    ref,
    () => ({
      move: (steps: number) => animateMove(steps),
      getIndex: () => currentIndex,
    }),
    [currentIndex], // animateMove가 클로저면 포함
  );

  return (
    <View
      style={{ width: '100%', height: '105%' }}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        if (width !== container.width || height !== container.height) {
          setContainer({ width, height });
        }
      }}
    >
      <Svg width={width} height={height}>
        {/* 배경 */}
        <Rect x={0} y={0} width={width} height={height} fill="#ecf1fe" />
        {/* 셀들 그리기 (3D 효과 대신 상/하 투톤) */}
        {boardData.map((cell) => {
          const x = cell.col * CELL + PADDING_LEFT;
          const y = cell.row * CELL;
          const [main, bottom] = getCellColors(cell.type);

          const fontSize = 12;
          const lineHeight = 14;
          const maxTextWidth = CELL * 0.9; // 셀 폭의 80%만 사용
          const lines = layoutSvgLines(cell.title, maxTextWidth, fontSize, 4);

          // 수직 가운데 정렬을 위해 첫 줄 y를 위로 조금 올림
          const baseX = x + CELL / 2;
          const baseY = y + CELL / 2 + 4 - ((lines.length - 1) * lineHeight) / 2;

          const clipId = `clip-${cell.row}-${cell.col}`;
          const bandH = 14;

          return (
            <Fragment key={`${cell.row}-${cell.col}`}>
              {/* 공통 클립패스: 동일한 라운드 코너 유지 */}
              <Defs>
                <ClipPath id={`main-${clipId}`}>
                  <Rect x={x} y={y} width={CELL} height={CELL} rx={12} ry={12} />
                </ClipPath>
                <ClipPath id={`bottom-${clipId}`}>
                  <Rect x={x} y={y} width={CELL} height={CELL + bandH} rx={12} ry={12} />
                </ClipPath>
              </Defs>

              {/* 아래쪽 그림자 밴드 — 두껍게, 모서리 따라가게 */}
              <Rect
                x={x}
                y={y}
                width={CELL}
                height={CELL + bandH}
                fill={bottom}
                opacity={0.53}
                clipPath={`url(#bottom-${clipId})`}
              />
              {/* 메인 면 — 단색, 더 두드러진 라운드 */}
              <Rect
                x={x}
                y={y}
                width={CELL}
                height={CELL}
                rx={16}
                ry={16}
                fill={main}
                opacity={0.8}
                clipPath={`url(#main-${clipId})`}
              />

              {/* 텍스트 (GO 전용) */}
              {cell.type === 'start-go' ? (
                <>
                  <SvgText
                    x={x + CELL / 2}
                    y={y + CELL / 2 - 6}
                    fontSize={24}
                    fontWeight="800"
                    fill="#0a8453"
                    textAnchor="middle"
                  >
                    GO
                  </SvgText>
                  <SvgText
                    x={x + CELL / 2}
                    y={y + CELL - 12}
                    fontSize={12}
                    fontWeight="700"
                    fill="#0a8453"
                    textAnchor="middle"
                  >
                    {'<----------'}
                  </SvgText>
                </>
              ) : (
                <SvgText
                  x={baseX}
                  y={baseY}
                  fontSize={fontSize}
                  fontWeight="700"
                  fill="#1f2937"
                  textAnchor="middle"
                >
                  {lines.map((ln, i) => (
                    <TSpan key={i} x={baseX} dy={i === 0 ? 0 : lineHeight}>
                      {ln}
                    </TSpan>
                  ))}
                </SvgText>
              )}
            </Fragment>
          );
        })}
      </Svg>

      {/* 타일 클릭 영역(Pressable) — SVG에도 onPress 있지만, 플랫폼 일관성을 위해 오버레이 뷰 사용 */}
      {boardData.map((cell) => {
        const x = cell.col * CELL + PADDING_LEFT;
        const y = cell.row * CELL;
        return (
          <Pressable
            key={`hit-${cell.row}-${cell.col}`}
            onPress={() => handleCellPress(cell)}
            style={[styles.hit, { left: x, top: y, width: CELL, height: CELL }]}
          />
        );
      })}

      {/* 말(이미지) — 칸 너비 0.6배, 바닥 맞춤 */}
      {!!pieceSource && (
        <Image
          source={pieceSource}
          resizeMode="contain"
          style={{
            position: 'absolute',
            width: CELL * 0.6,
            height: CELL * 0.6,
            left: pieceXY.x - (CELL * 0.6) / 2,
            top: pieceXY.y - CELL * 0.6, // 바닥 기준
          }}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  hit: {
    position: 'absolute',
    // debug:
    // backgroundColor: 'rgba(255,0,0,0.05)'
  },
});

export default GameBoardNative;
