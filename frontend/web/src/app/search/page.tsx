"use client";

// styles
import styles from "./Search.module.scss";
// components
import Input from "@/shared/ui/common/Input/Input";
import CircleList from "@/shared/ui/common/CircleList/CircleList";
import useRepresentativeRegions from "@/entities/trips/hooks/useRepresentativeRegions";
import { useEffect, useMemo, useState } from "react";
import { apiClient } from "@/shared/lib/api/client";
import type { ApiResponse } from "@/shared/types";
import { useRouter } from "next/navigation";

interface AutocompleteRegion {
  representativeRegionId: string;
  representativeRegionName: string;
  representativeRegionImageUrl: string | null;
}

export default function Search() {
  const router = useRouter();
  const { data } = useRepresentativeRegions();
  const items = useMemo(
    () =>
      (data?.data?.dataBody || []).map(
        (r: {
          representativeRegionId: number;
          representativeRegionName: string;
          representativeRegionImageUrl: string | null;
        }) => ({
          id: r.representativeRegionId,
          name: r.representativeRegionName,
          imgUrl: r.representativeRegionImageUrl || "/images/no-image.png",
        })
      ),
    [data]
  );

  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<AutocompleteRegion[]>([]);
  const [hasSearchError, setHasSearchError] = useState(false);
  const [lastFetchedKeyword, setLastFetchedKeyword] = useState("");
  const [showExactMatchNotice, setShowExactMatchNotice] = useState(false);

  useEffect(() => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      setSuggestions([]);
      setHasSearchError(false);
      setLastFetchedKeyword("");
      setShowExactMatchNotice(false);
      setIsSearching(false);
      return;
    }

    let isCancelled = false;
    const debounceTimer = setTimeout(() => {
      setIsSearching(true);
      apiClient
        .get<ApiResponse<AutocompleteRegion[]>>(
          "/regions/representative/search",
          {
            params: { keyword: trimmedKeyword },
          }
        )
        .then((response) => {
          if (isCancelled) return;
          setSuggestions(response.data.dataBody ?? []);
          setLastFetchedKeyword(trimmedKeyword);
          setHasSearchError(false);
          setShowExactMatchNotice(false);
        })
        .catch(() => {
          if (isCancelled) return;
          setSuggestions([]);
          setHasSearchError(true);
          setLastFetchedKeyword("");
          setShowExactMatchNotice(false);
        })
        .finally(() => {
          if (isCancelled) return;
          setIsSearching(false);
        });
    }, 350);

    return () => {
      isCancelled = true;
      clearTimeout(debounceTimer);
      setIsSearching(false);
    };
  }, [keyword]);

  const handleSelectSuggestion = (region: AutocompleteRegion) => {
    setKeyword(region.representativeRegionName);
    setShowExactMatchNotice(false);
    router.push(`/spots/${region.representativeRegionId}`);
  };

  const handleSearchSubmit = async () => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      setShowExactMatchNotice(false);
      return;
    }

    const normalizedKeyword = trimmedKeyword.toLowerCase();
    const tryNavigate = (regions: AutocompleteRegion[]) => {
      const exactMatch = regions.find(
        (region) =>
          region.representativeRegionName.trim().toLowerCase() ===
          normalizedKeyword
      );

      if (exactMatch) {
        setShowExactMatchNotice(false);
        router.push(`/spots/${exactMatch.representativeRegionId}`);
      } else {
        setShowExactMatchNotice(true);
      }
    };

    if (lastFetchedKeyword.trim().toLowerCase() === normalizedKeyword) {
      tryNavigate(suggestions);
      return;
    }

    try {
      setIsSearching(true);
      const response = await apiClient.get<ApiResponse<AutocompleteRegion[]>>(
        "/regions/representative/search",
        {
          params: { keyword: trimmedKeyword },
        }
      );
      const nextSuggestions = response.data.dataBody ?? [];
      setSuggestions(nextSuggestions);
      setLastFetchedKeyword(trimmedKeyword);
      setHasSearchError(false);
      tryNavigate(nextSuggestions);
    } catch (_) {
      setHasSearchError(true);
      setShowExactMatchNotice(false);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className={`appPage ${styles.container}`}>
      <div className={styles.section}>
        <div className={styles.subTitle}>원하는 여행지를 검색해보세요!</div>
        <div className={styles.inputBox}>
          <Input
            value={keyword}
            onChange={setKeyword}
            onSubmit={handleSearchSubmit}
            isLoading={isSearching}
          />
          {keyword.trim() && (
            <div className={styles.suggestionList}>
              {suggestions.map((region) => (
                <button
                  key={region.representativeRegionId}
                  type="button"
                  className={styles.suggestionItem}
                  onClick={() => handleSelectSuggestion(region)}
                >
                  <span className={styles.suggestionName}>
                    {region.representativeRegionName}
                  </span>
                  <span className={styles.suggestionAction}>바로 보기</span>
                </button>
              ))}
              {!isSearching && !hasSearchError && suggestions.length === 0 && (
                <div className={styles.suggestionEmpty}>
                  검색 결과가 없습니다.
                </div>
              )}
              {hasSearchError && (
                <div className={styles.suggestionError}>
                  자동완성 결과를 불러오지 못했습니다. 잠시 후 다시
                  시도해주세요.
                </div>
              )}
              {isSearching && suggestions.length === 0 && !hasSearchError && (
                <div className={styles.suggestionEmpty}>검색 중...</div>
              )}
              {showExactMatchNotice && (
                <div
                  className={`${styles.suggestionNotice} ${styles.suggestionNoticeInline}`}
                >
                  검색 버튼은 자동완성 결과와 정확히 일치할 때만 이동합니다.
                  목록에서 여행지를 선택해주세요.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.subTitle}>추천 여행지</div>
        <CircleList baseHref="/spots" items={items} />
      </div>
    </div>
  );
}
