import {Composition} from 'remotion';

import {ProductWalkthrough} from './ProductExplainer';
import {PromoVideo} from './PromoVideo';

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
    <Composition
      id="PromoVideo2026"
      component={PromoVideo}
      durationInFrames={990}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
