declare module "@splinetool/react-spline/next" {
  import * as React from "react";

  interface SplineProps {
    scene: string;
    className?: string;
    style?: React.CSSProperties;
  }

  const Spline: React.FC<SplineProps>;

  export default Spline;
}
