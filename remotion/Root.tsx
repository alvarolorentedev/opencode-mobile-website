import {Composition} from 'remotion';

import {ProductWalkthrough} from './ProductExplainer';

export const RemotionRoot = () => (
  <>
    <Composition
      id="ProductWalkthrough"
      component={ProductWalkthrough}
      durationInFrames={360}
      fps={30}
      width={1280}
      height={720}
    />
  </>
);
