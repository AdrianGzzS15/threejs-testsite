import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/** Site chrome shared by every page: skip link, header, main landmark, footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-white px-5 py-3 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
