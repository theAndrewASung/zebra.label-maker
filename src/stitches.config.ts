// stitches.config.ts
import { createStitches } from '@stitches/react';
import { cyan, slate } from '@radix-ui/colors';

export const { styled } = createStitches({
  theme: {
    colors: {
      ...cyan,
      ...slate,
    }
  }
})