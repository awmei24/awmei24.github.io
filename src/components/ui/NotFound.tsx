import { Link } from "react-router-dom";
import { PageTransition } from "../motion/PageTransition";

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
        <p className="text-stone font-light">{message}</p>
        <Link to={backTo} className="link-sage text-sm text-sage">
          ← {backLabel}
        </Link>
      </div>
    </PageTransition>
  );
}
