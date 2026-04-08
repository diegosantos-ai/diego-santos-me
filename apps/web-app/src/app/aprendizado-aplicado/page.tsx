import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Aprendizado Aplicado | Diego Santos',
  description:
    'Biblioteca curada de materiais práticos para revisão técnica, consulta rápida e aprendizado aplicado.',
};

export default function AppliedLearningPage() {
  redirect('/conteudos');
}
