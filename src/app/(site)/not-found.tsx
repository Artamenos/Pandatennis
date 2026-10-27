import { ButtonLink } from "@/components/primitives/button-link";
import { Container } from "@/components/primitives/container";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center py-20">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[.16em] text-[var(--color-accent)]">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-6xl">Страница не найдена</h1>
        <ButtonLink className="mt-8" href="/">На главную</ButtonLink>
      </Container>
    </main>
  );
}
