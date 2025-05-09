import * as React from "react";
import dynamic from "next/dynamic";
import Spline from "@splinetool/react-spline";

const SplineWithProps = (props: any) => (
  <Spline
    {...props}
    scene="https://prod.spline.design/RwmvyKIRcAII4-yT/scene.splinecode"
  />
);

export default dynamic(() => Promise.resolve(SplineWithProps), {
  ssr: false,
});
