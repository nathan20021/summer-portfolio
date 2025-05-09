import * as React from "react";
import dynamic from "next/dynamic";
import Spline from "@splinetool/react-spline";

const SplineWithProps = (props: any) => <Spline {...props} />;

export default dynamic(() => Promise.resolve(SplineWithProps), {
  ssr: false,
});
