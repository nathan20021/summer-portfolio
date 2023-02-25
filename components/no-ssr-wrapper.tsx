import dynamic from "next/dynamic";
import * as React from "react";

const NonSSRWrapper = (props: any) => <>{props.children}</>;

export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
