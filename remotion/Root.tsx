import {Composition, Still} from 'remotion';

import {
  ChatControlStill,
  ConnectionStill,
  ProductWalkthrough,
  WorkspaceStill,
} from './ProductExplainer';

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
    <Still id="ChatControl" component={ChatControlStill} width={1200} height={800} />
    <Still id="WorkspaceTools" component={WorkspaceStill} width={1200} height={800} />
    <Still id="SecureConnection" component={ConnectionStill} width={1200} height={800} />
  </>
);
