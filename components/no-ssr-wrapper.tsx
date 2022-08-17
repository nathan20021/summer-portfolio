import dynamic from "next/dynamic";
import * as React from "react";
// @ts-ignore
const NonSSRWrapper = (props): React.Component => (
  // eslint-disable-next-line react/prop-types
  <React.Fragment>{props.children}</React.Fragment>
);
export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
