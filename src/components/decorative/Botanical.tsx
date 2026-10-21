/* Hand-drawn botanical elements used as page decorations.
   Each PNG is used as a CSS mask so the art is tinted by `color` (currentColor by default). */
import type { CSSProperties } from "react";
import leafSprigPng from "./LeafSprig.png";
import tinyMushroomPng from "./TinyMushroom.png";
import sproutPng from "./Sprout.png";
import fernPng from "./Fern.png";
import wildFlowerPng from "./WildFlower.png";
import wildFlower0Png from "./WildFlower0.png";
import wildFlower1Png from "./WildFlower1.png";
import wildFlower2Png from "./WildFlower2.png";
import wildFlower3Png from "./WildFlower3.png";
import smallLeafPng from "./SmallLeaf.png";
import flowerPng from "./FloralDivider-Flower.png";
import ceramicsWheel1Png from "./CeramicsWheel1.png";
import ceramicsWheel2Png from "./CeramicsWheel2.png";
import ceramicsWheel3Png from "./CeramicsWheel3.png";
import ceramicsWheel4Png from "./CeramicsWheel4.png";
import ceramicsWheel5Png from "./CeramicsWheel5.png";
import ceramicsWheel6Png from "./CeramicsWheel6.png";
import ceramicsWheel7Png from "./CeramicsWheel7.png";
import ceramicsWheel8Png from "./CeramicsWheel8.png";
import wateringCanPng from "./WateringCan.png";

interface BotanicalProps {
  className?: string;
  size?: number;
  color?: string;
}

function maskStyle(src: string, width: number, height: number, color: string): CSSProperties {
  const mask = `url(${src}) center / contain no-repeat`;
  return {
    display: "inline-block",
    width,
    height,
    backgroundColor: color,
    mask,
    WebkitMask: mask,
  };
}

function Mark({ src, className, size, color = "currentColor" }: BotanicalProps & { src: string; size: number }) {
  return <span aria-hidden="true" className={className} style={maskStyle(src, size, size, color)} />;
}

export function LeafSprig({ size = 40, ...props }: BotanicalProps) {
  return <Mark src={leafSprigPng} size={size} {...props} />;
}

export function TinyMushroom({ size = 32, ...props }: BotanicalProps) {
  return <Mark src={tinyMushroomPng} size={size} {...props} />;
}

export function Sprout({ size = 36, ...props }: BotanicalProps) {
  return <Mark src={sproutPng} size={size} {...props} />;
}

export function Fern({ size = 36, ...props }: BotanicalProps) {
  return <Mark src={fernPng} size={size} {...props} />;
}

export function WildFlower({ size = 36, ...props }: BotanicalProps) {
  return <Mark src={wildFlowerPng} size={size} {...props} />;
}

/* Growth frames of the wildflower on a shared canvas: stem, one leaf, two leaves, bud, then the full bloom. */
const WILDFLOWER_FRAMES = [wildFlower0Png, wildFlower1Png, wildFlower2Png, wildFlower3Png, wildFlowerPng];

export function WildFlowerFrame({ frame, size = 36, ...props }: BotanicalProps & { frame: number }) {
  return <Mark src={WILDFLOWER_FRAMES[frame]} size={size} {...props} />;
}

/* Throwing frames of the pottery wheel on a shared canvas: empty wheel, clay centred, then shaped up into a vase. */
const CERAMICS_WHEEL_FRAMES = [
  ceramicsWheel1Png, ceramicsWheel2Png, ceramicsWheel3Png, ceramicsWheel4Png,
  ceramicsWheel5Png, ceramicsWheel6Png, ceramicsWheel7Png, ceramicsWheel8Png,
];

export function CeramicsWheelFrame({ frame, size = 36, ...props }: BotanicalProps & { frame: number }) {
  return <Mark src={CERAMICS_WHEEL_FRAMES[frame]} size={size} {...props} />;
}

/* The can only fills the lower half of its 1640×2360 canvas, so it's cropped to
   the drawing (in canvas px) rather than letterboxed in a square. */
const CAN = { x: 40, y: 952, w: 1560, h: 1216, canvasW: 1640, canvasH: 2360 };
const WATERING_CAN_ASPECT = CAN.h / CAN.w;

export function WateringCan({ width = 52, className, color = "currentColor" }: { width?: number; className?: string; color?: string }) {
  const scale = width / CAN.w;
  const mask = `url(${wateringCanPng}) ${-CAN.x * scale}px ${-CAN.y * scale}px / ${CAN.canvasW * scale}px ${CAN.canvasH * scale}px no-repeat`;
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-block",
        width,
        height: width * WATERING_CAN_ASPECT,
        backgroundColor: color,
        mask,
        WebkitMask: mask,
      }}
    />
  );
}

export function SmallLeaf({ size = 20, ...props }: BotanicalProps) {
  return <Mark src={smallLeafPng} size={size} {...props} />;
}

export function FloralDivider({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, width: 120, height: 20 }}
    >
      <span style={{ flex: 1, height: 0.8, backgroundColor: color, borderRadius: 1 }} />
      <span style={maskStyle(flowerPng, 18, 18, color)} />
      <span style={{ flex: 1, height: 0.8, backgroundColor: color, borderRadius: 1 }} />
    </span>
  );
}
