// Welcome to Code in Framer
// Get Started: https://www.framer.com/docs/guides/

import { addPropertyControls, ControlType } from "framer";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/docs/guides/auto-sizing
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function MouseFollower({
  background,
  color,
  title,
  font,
  weight,
  size,
  letter,
  transform,
}) {
  // This is a React component containing an Example component
  // - Replace <Example /> with your own code
  // - Find inspiration: https://www.framer.com/developers/
  if (isMobile) return;

  const [cursorVariant, setCursorVariant] = useState("default");
  const springConfig = { damping: 25, stiffness: 300 };

  const mousePosition = {
    x: useMotionValue(-100),
    y: useMotionValue(-100),
  };

  const mouseSpringPosition = {
    x: useSpring(mousePosition.x, springConfig),
    y: useSpring(mousePosition.y, springConfig),
  };

  const containerVariants: {
    default: {};
    link: {};
    text: {};
    opaque: {};
    hide: {};
  } = {
    default: {
      mixBlendMode: "normal",
    },
    link: {
      mixBlendMode: "normal",
    },
    text: {
      mixBlendMode: "normal",
    },
    opaque: {
      mixBlendMode: "exclusion",
    },
    hide: {
      mixBlendMode: "normal",
    },
  };

  const variants: {
    default: {};
    link: {};
    text: {};
    opaque: {};
    hide: {};
  } = {
    default: {
      transform: "scale(0.25)",
      backgroundColor: background,
    },
    link: {
      transform: "scale(0.15)",
      backgroundColor: background,
    },
    text: {
      transform: "scale(1.75)",
      backgroundColor: background,
    },
    opaque: {
      transform: "scale(1.25)",
      backgroundColor: "#FFFFFF",
    },
    hide: {
      transform: "scale(0)",
      backgroundColor: background,
    },
  };

  useEffect(() => {
    addEventListeners();
    handleLinkHoverEvents("button, a", "link");
    handleLinkHoverEvents("[data-mouse-follower='text']", "text");
    handleLinkHoverEvents("[data-mouse-follower='opaque']", "opaque");
    handleLinkHoverEvents("[data-mouse-follower='hide']", "hide");

    return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseenter", onMouseEnter);
    document.removeEventListener("mouseleave", onMouseLeave);
  };

  const onMouseMove = (e) => {
    mousePosition.x.set(e.clientX);
    mousePosition.y.set(e.clientY);
  };

  const onMouseEnter = (e) => {
    setCursorVariant("default");
  };

  const onMouseLeave = (e) => {
    setCursorVariant("hide");
  };

  const handleLinkHoverEvents = (target: string, variant: string) => {
    document.querySelectorAll(target).forEach((element) => {
      element.addEventListener("mouseover", () => {
        setCursorVariant(variant);
      });
      element.addEventListener("mouseout", () => setCursorVariant("default"));
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      animate={cursorVariant}
      style={{
        ...mouseContainerStyle,
        x: mouseSpringPosition.x,
        y: mouseSpringPosition.y,
      }}
    >
      <motion.div
        variants={variants}
        animate={cursorVariant}
        style={mouseStyle}
      />
      <motion.div
        style={{
          font: `${weight} ${size}px/1 ${font}`,
          color: color,
          letterSpacing: letter,
          textTransform: transform,
          ...textStyle,
          opacity: cursorVariant === "text" ? 1 : 0,
          transform:
            cursorVariant === "text" ? "scale(1)" : "scale(0) rotate(10deg)",
        }}
      >
        {title}
      </motion.div>
    </motion.div>
  );
}

// Styles are written in object syntax
// Learn more: https://reactjs.org/docs/dom-elements.html#style
const mouseContainerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 9999,
  pointerEvents: "none",
  transition: "opacity .3s,color .4s",
} as React.CSSProperties;

const mouseStyle = {
  display: "block",
  height: 48,
  width: 48,
  borderRadius: 9999,
  position: "absolute",
  top: -27,
  left: -25,
  transition: "transition: transform .25s ease-in-out,opacity .1s",
} as React.CSSProperties;

const textStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.4s, transform 0.3s",
} as React.CSSProperties;

MouseFollower.defaultProps = {
  color: "#fff",
};

addPropertyControls(MouseFollower, {
  background: { title: "Background", type: ControlType.Color },
  title: {
    title: "Title",
    type: ControlType.String,
    defaultValue: "View",
  },
  font: { type: ControlType.String, defaultValue: "Inter" },
  color: {
    title: "Color",
    type: ControlType.Color,
  },
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
  transform: {
    type: ControlType.Enum,
    defaultValue: "none",
    options: ["none", "capitalize", "uppercase", "lowercase"],
    optionTitles: ["None", "Capitalize", "Uppercase", "Lowercase"],
  },
});
