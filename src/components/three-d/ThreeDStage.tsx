"use client";

import { useReducedMotion } from "framer-motion";
import { THREE_D_SLOT_CONFIG, type ThreeDSlotName } from "@/config/three-d";
import { cn } from "@/lib/utils";

type ThreeDStageProps = {
  slot: ThreeDSlotName;
  className?: string;
  children: React.ReactNode;
};

export function ThreeDStage({ slot, className, children }: ThreeDStageProps) {
  const prefersReducedMotion = useReducedMotion();
  const config = THREE_D_SLOT_CONFIG[slot];

  return (
    <div
      data-3d-slot={slot}
      data-3d-max-models={config.maxAccentModels}
      data-3d-max-mb={config.maxTotalWeightMb}
      className={cn(
        "relative",
        prefersReducedMotion ? "motion-reduce:transition-none" : "",
        className
      )}
    >
      {children}
    </div>
  );
}

