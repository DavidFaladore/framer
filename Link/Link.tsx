// Welcome to Code in Framer
// Get Started: https://www.framer.com/docs/guides/
import useMouse from "@react-hook/mouse-position";
import { addPropertyControls, ControlType } from "framer";
import { motion } from "framer-motion";
import React from "react";

/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/docs/guides/auto-sizing
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function Link({
  link,
  title,
  font,
  size,
  weight,
  style,
  transform,
  color,
  letter,
  line,
}) {
  // This is a React component containing an Example component
  // - Replace <Example /> with your own code
  // - Find inspiration: https://www.framer.com/developers/
  const elementRef = React.useRef<HTMLDivElement>(null);
  const [activeVariant, setActiveVariant] = React.useState("default");
  const [activeMagneticVariant, setActiveMagneticVariant] =
    React.useState("default");

  const mouse = useMouse(elementRef, {
    enterDelay: 0,
    leaveDelay: 0,
    fps: 30,
  });

  const linkStyle: React.CSSProperties = {
    font: `${weight} ${size}px/1 ${font}`,
    color: color,
    letterSpacing: letter,
    textTransform: transform,
    lineHeight: `${line}em`,
    textDecoration: "none",
    position: "relative",
    display: "inline-block",
    overflow: "hidden",
    cursor: "pointer",
  };

  const magneticVariants = {
    default: {
      color: "#000",
      x: "0",
      y: "0",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    hover: {
      x: (mouse.x - mouse.elementWidth / 2) * 0.6,
      y: (mouse.y - mouse.elementHeight / 2) * 0.6,
      transition: {
        type: "spring",
        mass: 0.3,
        damping: 20,
        stiffness: 100,
        bounce: 0.75,
      },
    },
  };

  const defaultTextVariants = {
    default: {
      y: 0,
      rotate: 0,
      transition: {
        delay: 0.05,
        duration: 0.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
    hover: {
      y: "-125%",
      rotate: -5,
      transition: {
        duration: 0.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  const hoverTextVariants = {
    default: {
      y: "125%",
      rotate: 5,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
    hover: {
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        delay: 0.05,
        duration: 0.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  const handleMouseEnter = () => {
    setActiveMagneticVariant("hover");
  };

  const handleMouseLeave = () => {
    setActiveMagneticVariant("default");
  };

  return (
    <motion.div
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={magneticVariants}
      animate={activeMagneticVariant}
    >
      <motion.a
        href={link}
        onMouseEnter={() => {
          setActiveVariant("hover");
        }}
        onMouseLeave={() => {
          setActiveVariant("default");
        }}
        style={{ ...linkStyle }}
      >
        <motion.span
          variants={defaultTextVariants}
          animate={activeVariant}
          style={{
            position: "relative",
            display: "block",
          }}
        >
          {title}
        </motion.span>
        <motion.span
          variants={hoverTextVariants}
          animate={activeVariant}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "translateY(125%)",
            opacity: 0,
            ...linkTextStyle,
          }}
        >
          {title}
        </motion.span>
      </motion.a>
    </motion.div>
  );
}

// Styles are written in object syntax
// Learn more: https://reactjs.org/docs/dom-elements.html#style
const linkTextStyle: React.CSSProperties = {
  transformOrigin: "top left",
};

addPropertyControls(Link, {
  link: {
    title: "Link",
    type: ControlType.Link,
  },
  title: {
    title: "Title",
    type: ControlType.String,
    defaultValue: "Link",
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
    defaultValue: 16,
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
  line: {
    type: ControlType.Number,
    defaultValue: 1,
    max: 3,
    unit: "em",
    step: 0.1,
    displayStepper: true,
  },
  transform: {
    type: ControlType.Enum,
    defaultValue: "none",
    options: ["none", "capitalize", "uppercase", "lowercase"],
    optionTitles: ["None", "Capitalize", "Uppercase", "Lowercase"],
  },
});
