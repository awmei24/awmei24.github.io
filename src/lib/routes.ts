/* Routes whose first viewport is a dark surface */
export const DARK_ROUTES = ["/contact"];

/* Routes where the ambient garden effects (cursor trail, plant strip) run */
export function isPlayfulRoute(pathname: string) {
  return pathname === "/" || pathname.startsWith("/hobbies");
}
