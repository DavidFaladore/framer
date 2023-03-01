import type { ComponentType } from "react";

// Learn more: https://www.framer.com/docs/guides/overrides/
export function withText(Component): ComponentType {
  return (props) => {
    return <Component {...props} data-mouse-follower="text" />;
  };
}

export function withOpaque(Component): ComponentType {
  return (props) => {
    return <Component {...props} data-mouse-follower="opaque" />;
  };
}

export function withHide(Component): ComponentType {
  return (props) => {
    return <Component {...props} data-mouse-follower="hide" />;
  };
}
