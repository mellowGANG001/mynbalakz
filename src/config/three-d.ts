export type ThreeDSlotName = "hero" | "profile" | "promos";

export const THREE_D_SLOT_CONFIG: Record<
  ThreeDSlotName,
  {
    maxAccentModels: number;
    maxTotalWeightMb: number;
    priority: "high" | "medium";
  }
> = {
  hero: {
    maxAccentModels: 1,
    maxTotalWeightMb: 6,
    priority: "high",
  },
  profile: {
    maxAccentModels: 1,
    maxTotalWeightMb: 4,
    priority: "medium",
  },
  promos: {
    maxAccentModels: 1,
    maxTotalWeightMb: 4,
    priority: "medium",
  },
};

export const THREE_D_QUALITY_TIERS = {
  mobile: {
    shadows: "low",
    textureScale: 0.75,
  },
  desktop: {
    shadows: "high",
    textureScale: 1,
  },
} as const;

