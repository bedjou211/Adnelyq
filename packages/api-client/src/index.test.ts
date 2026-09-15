import { afterEach, describe, expect, it, vi } from "vitest";

import { ApiError, createApiClient } from "./index";

describe("API client", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("returns the health payload", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ status: "ok" }), { status: 200 }))
    );

    const client = createApiClient({ baseUrl: "http://localhost:8000/" });

    await expect(client.health()).resolves.toEqual({ status: "ok" });
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/health",
      expect.objectContaining({ headers: expect.objectContaining({ "Content-Type": "application/json" }) })
    );
  });

  it("raises a typed error for failed requests", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ detail: "Unavailable" }), { status: 503 }))
    );

    const client = createApiClient({ baseUrl: "http://localhost:8000" });

    await expect(client.health()).rejects.toBeInstanceOf(ApiError);
  });
});
