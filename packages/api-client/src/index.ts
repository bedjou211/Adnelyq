export interface HealthResponse {
  status: "ok";
}

export interface ApiClientOptions {
  baseUrl: string;
  getAccessToken?: () => Promise<string | null>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function createApiClient(options: ApiClientOptions) {
  const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
    const token = await options.getAccessToken?.();
    const response = await fetch(`${options.baseUrl.replace(/\/$/, "")}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init?.headers
      }
    });

    const body: unknown = await response.json().catch(() => undefined);
    if (!response.ok) {
      throw new ApiError(`API request failed with status ${response.status}`, response.status, body);
    }
    return body as T;
  };

  return {
    health: () => request<HealthResponse>("/health")
  };
}
