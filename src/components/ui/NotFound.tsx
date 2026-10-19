import { PageTransition } from "../motion/PageTransition";
import { BackLink } from "../layout/PageHero";

/* Fallback for detail routes whose id doesn't match any content */
export function NotFound({
  message,
  backTo,
  backLabel,
}: {
  message: string;
  backTo: string;
  backLabel: string;
}) {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-24">
        <p className="text-muted">{message}</p>
        <BackLink to={backTo}>{backLabel}</BackLink>
      </div>
    </PageTransition>
  );
}
