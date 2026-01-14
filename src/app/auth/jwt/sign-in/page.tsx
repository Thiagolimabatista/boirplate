import { CONFIG } from 'src/config-global';

import { JwtSignInView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = { title: `Cuidar.me | Entrar` };

export default function Page() {
  return <JwtSignInView />;
}
