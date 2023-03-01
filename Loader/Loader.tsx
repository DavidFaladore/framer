// Welcome to Code in Framer
// Get Started: https://www.framer.com/docs/guides/

import { addPropertyControls, ControlType } from "framer";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const ITEM_ANIMATION_DURATION = 0.01;
const ITEM_ANIMATION_DELAY = 150;
const EASE_INOUT_EXPO = [0.87, 0, 0.13, 1];

/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/docs/guides/auto-sizing
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function Loader({
  background,
  items,
  font,
  weight,
  color,
  size,
  letter,
  transform,
}) {
  // This is a React component containing an Example component
  // - Replace <Example /> with your own code
  // - Find inspiration: https://www.framer.com/developers/
  const [activeItem, setActiveItem] = React.useState<number>(0);
  const [activeItemsVariant, setActiveItemsVariant] = React.useState("animate");
  const itemsLength = items.length;

  // Styles are written in object syntax
  // Learn more: https://reactjs.org/docs/dom-elements.html#style
  const wrapperStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    height: "100%",
    width: "100%",
    zIndex: 9999,
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: background,
  };

  const itemsStyle: React.CSSProperties = {
    position: "relative",
    display: "block",
  };

  const itemStyle: React.CSSProperties = {
    font: `${weight} ${size}px/1em ${font}`,
    letterSpacing: letter,
    color: color,
    textTransform: transform,
    whiteSpace: "nowrap",
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    willChange: "opacity",
  };

  const itemsVariants = {
    inital: { opacity: 0 },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prevCounter) =>
        prevCounter !== itemsLength - 1 ? prevCounter + 1 : prevCounter
      );
    }, ITEM_ANIMATION_DELAY);

    return () => clearInterval(interval);
  }, []);

  const LoaderItems = () => {
    return items.map((item, index) => (
      <AnimatePresence initial={false}>
        {activeItem === index && (
          <motion.div
            style={itemStyle}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: ITEM_ANIMATION_DURATION,
            }}
            onAnimationComplete={(definition) => {
              itemsLength === index + 1 && setActiveItemsVariant("exit");
            }}
          >
            {item.title}
          </motion.div>
        )}
      </AnimatePresence>
    ));
  };

  return (
    <motion.div
      style={wrapperStyle}
      animate={{ y: "-100%" }}
      transition={{
        duration: 1,
        delay: itemsLength * (ITEM_ANIMATION_DELAY / 1000),
        ease: EASE_INOUT_EXPO,
      }}
    >
      <div style={containerStyle}>
        <motion.div
          style={itemsStyle}
          variants={itemsVariants}
          animate={activeItemsVariant}
          transition={{ duration: 0.5 }}
        >
          <LoaderItems />
        </motion.div>
      </div>
    </motion.div>
  );
}

addPropertyControls(Loader, {
  background: {
    title: "Background",
    type: ControlType.Color,
  },
  items: {
    title: "Items",
    type: ControlType.Array,
    control: {
      type: ControlType.Object,
      controls: {
        title: { type: ControlType.String, defaultValue: "Hi" },
      },
    },
    defaultValue: [
      { title: "Hello" },
      { title: "Olá" },
      { title: "Ciao" },
      { title: "Bonjour" },
      { title: "Hallå" },
      { title: "स्वागत हे" },
      { title: "おい" },
      { title: "Guten tag" },
      { title: "Hallo" },
    ],
  },
  font: { type: ControlType.String, defaultValue: "Inter" },
  weight: {
    type: ControlType.Enum,
    defaultValue: "400",
    options: [
      "200",
      "italic 200",
      "300",
      "italic 300",
      "400",
      "italic 400",
      "500",
      "italic 500",
      "600",
      "italic 600",
      "700",
      "italic 700",
      "800",
      "italic 800",
    ],
    optionTitles: [
      "Extra Light",
      "Extra Light Italic",
      "Light",
      "Light Italic",
      "Regular",
      "Italic",
      "Medium",
      "Medium Italic",
      "Semibold",
      "Semibold Italic",
      "Bold",
      "Bold Italic",
      "Extra Bold",
      "Extra Bold Italic",
    ],
  },
  color: {
    title: "Color",
    type: ControlType.Color,
  },
  size: {
    type: ControlType.Number,
    defaultValue: 48,
    unit: "px",
    step: 1,
    displayStepper: true,
  },
  letter: {
    type: ControlType.Number,
    defaultValue: 0,
    max: 10,
    unit: "%",
    step: 1,
    displayStepper: true,
  },
  transform: {
    type: ControlType.Enum,
    defaultValue: "none",
    options: ["none", "capitalize", "uppercase", "lowercase"],
    optionTitles: ["None", "Capitalize", "Uppercase", "Lowercase"],
  },
});
