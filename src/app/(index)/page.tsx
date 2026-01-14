import { JwtSignInView } from 'src/sections/auth/jwt';


// ----------------------------------------------------------------------

export const metadata = {
  title: 'Cuidar.me | Home',
  description:
    'Projeto Cuidar.me - Plataforma para ajudar funcionários.',
};

export default function Page() {
  return <JwtSignInView/>
}
