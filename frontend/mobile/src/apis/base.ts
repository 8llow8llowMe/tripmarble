interface ApiResponseHeader {
  success: boolean;
  resultCode: string | null;
  resultMessage: Record<string, string> | string | null;
}

interface ApiResponseBase {
  dataHeader: ApiResponseHeader;
}

export type { ApiResponseHeader, ApiResponseBase };
