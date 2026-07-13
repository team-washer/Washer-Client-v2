const SECOND = 1000;
const MINUTE = 60 * SECOND;

/**
 * 도메인별 신선도 기준.
 * 세탁기 상태는 사용자가 기기를 쓰는 즉시 바뀌므로 짧게,
 * 관리자 계정 정보처럼 세션 중 사실상 고정인 값은 길게 잡는다.
 */
export const STALE_TIME = {
  MACHINE: 30 * SECOND,
  RESERVATION: MINUTE,
  REPORT: 3 * MINUTE,
  USER: 3 * MINUTE,
  MY_INFO: 30 * MINUTE,
} as const;

export const DEFAULT_STALE_TIME = MINUTE;

// gcTime이 가장 긴 staleTime보다 짧으면 비활성 쿼리의 캐시가 먼저 수거되어
// staleTime이 무의미해지므로, STALE_TIME의 최댓값(MY_INFO) 이상으로 잡는다.
export const DEFAULT_GC_TIME = 30 * MINUTE;
