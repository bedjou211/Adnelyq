import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renders an accessible button", () => {
    render(<Button>Créer une boutique</Button>);

    const button = screen.getByRole("button", { name: "Créer une boutique" });
    expect((button as HTMLButtonElement).disabled).toBe(false);
  });
});
