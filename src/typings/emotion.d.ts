import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      brand: string;
      brandbg: string;
      darkgray: string;
      gray: string;
      lightgray: string;
      white: string;
      event: string;
    };
  }
}
