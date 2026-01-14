import { CONFIG } from 'src/config-global';

import { AboutView } from 'src/sections/about/view';

// ----------------------------------------------------------------------

export const metadata = { title: `About us - ` };

export default function Page() {
  return <AboutView />;
}
