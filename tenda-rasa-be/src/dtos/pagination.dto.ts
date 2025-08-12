

export interface PaginatedResponseDTO<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface BaseResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  message?: string;
}

export interface paginationParams {
  limit: number;
  offset: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}
