import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { WhitelistForm } from "@/components/WhitelistForm";
const CDN_ROOT = "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main";

const HOME_BACKGROUND = `${CDN_ROOT}/backgroundstory/homepage.png`;
const TITLE_LOGO = `${CDN_ROOT}/backgroundstory/home%20fronttext.png`;
const FOOTER_LOGO = `${CDN_ROOT}/footer/ARCSULTANSfootertext.png`;
const THRONE_BUTTON = `${CDN_ROOT}/buttons/button-4kd.png`;
const WHITELIST_TAG = `${CDN_ROOT}/whitelist_submit/whitelistag.png`;
const WHITELIST_BUTTON_BACKGROUND = {
  backgroundColor: "transparent",
  backgroundImage: `url(${THRONE_BUTTON})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  imageRendering: "pixelated",
} as const;
const WHITELIST_BACKGROUND = `${CDN_ROOT}/backgroundstory/whitelistpage.png`;

const CENTER_PREVIEW = `${CDN_ROOT}/layers/arcsultans_mixed_100.gif`;
const MAIN_FRAME = `${CDN_ROOT}/frames/mainframe.png`;
const FOUR_FRAMES = `${CDN_ROOT}/frames/fourframes.png`;

const SIDE_FRAMES = [
  `${CDN_ROOT}/layers/arcsultans_arc_backgound_100.gif`,
  `${CDN_ROOT}/layers/arcsultans_magma_burst_100.gif`,
  `${CDN_ROOT}/layers/arcsultans_solid_sky_blue_100.gif`,
  `${CDN_ROOT}/layers/arcsultans_solid_slate_gray_100.gif`,
] as const;

function StateBackground({ isWhitelist }: { isWhitelist: boolean }) {
  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden">
      <img
        src={HOME_BACKGROUND}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover object-center [image-rendering:pixelated] transition-opacity duration-700 ease-in-out ${
          isWhitelist ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={WHITELIST_BACKGROUND}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover object-center [image-rendering:pixelated] transition-opacity duration-700 ease-in-out ${
          isWhitelist ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className={`absolute inset-0 bg-background ${isWhitelist ? "opacity-45" : "opacity-10"}`} />
    </div>
  );
}

function SideGifPreview({ gif, slot }: { gif: string; slot: number }) {
  return (
    <div className="relative h-24 w-24 overflow-hidden">
      <img
        src={gif}
        alt={`Animated ARCSultans NFT preview ${slot + 1}`}
        className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]"
      />
      <img
        src={FOUR_FRAMES}
        alt=""
        className="absolute left-1/2 top-1/2 h-[150%] w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain [image-rendering:pixelated]"
      />
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARCSultans — NFT Whitelist Signup" },
      {
        name: "description",
        content:
          "Secure your spot on the ARCSultans whitelist. Mint 16 September 2026 — join the golden dynasty on ARC.",
      },
      { property: "og:title", content: "ARCSultans — NFT Whitelist Signup" },
      {
        property: "og:description",
        content:
          "Secure your spot on the ARCSultans whitelist. Mint 16 September 2026 — join the golden dynasty on ARC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [view, setView] = useState<"home" | "whitelist" | "form" | "success">("home");

  function handleWhitelistDone() {
    setView("success");
  }

  const isWhitelist = view === "whitelist";

  return (
    <main id="top" className="relative flex min-h-dvh flex-col overflow-hidden bg-background">
      <StateBackground isWhitelist={isWhitelist || view === "form"} />

      {/* Top corner badges — left & right */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between px-4 py-3 sm:px-6 sm:py-4">
        <div className="pl-2.5 sm:pl-3">
          <p className="font-display text-[9px] font-bold uppercase leading-4 text-footer-title sm:text-[10px]">✦ ARC MAINNET</p>
          <p className="mt-0.5 pl-9 font-display text-[8px] uppercase leading-[1.4] text-footer-copy/70 sm:pl-10 sm:text-[9px]">
            DESERTS<br />DYNASTY<br />ONCHAIN
          </p>
        </div>
        <p className="text-right font-display text-[8px] uppercase leading-4 text-footer-copy sm:text-[9px]">
          999 SULTANS&nbsp;&nbsp;//&nbsp;&nbsp;ONE THRONE
        </p>
      </div>

      {/* 4 corner GIF preview boxes — anchored to viewport corners (whitelist + form states, lg+) */}
      {(isWhitelist || view === "form") && (
        <>
          <div className="fixed left-40 top-20 z-10 hidden h-24 w-24 lg:block">
            <SideGifPreview gif={SIDE_FRAMES[0]} slot={0} />
          </div>
          <div className="fixed bottom-32 left-40 z-10 hidden h-24 w-24 lg:block">
            <SideGifPreview gif={SIDE_FRAMES[1]} slot={1} />
          </div>
          <div className="fixed right-40 top-20 z-10 hidden h-24 w-24 lg:block">
            <SideGifPreview gif={SIDE_FRAMES[2]} slot={2} />
          </div>
          <div className="fixed bottom-32 right-40 z-10 hidden h-24 w-24 lg:block">
            <SideGifPreview gif={SIDE_FRAMES[3]} slot={3} />
          </div>
        </>
      )}

      {/* Content — fills the available viewport above the footer */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-3">
        {view === "home" ? (
          <section key="home" className="state-enter mx-auto flex h-full w-full max-w-3xl -translate-y-12 flex-col items-center justify-center pt-24 text-center sm:-translate-y-16 sm:pt-28">
            <h1 className="sr-only">ARCSultans</h1>
            <img
              src={TITLE_LOGO}
              alt="ARCSultans"
              className="w-full max-w-lg object-contain [image-rendering:pixelated] sm:max-w-xl"
            />
            <p className="mt-4 max-w-2xl font-display text-sm font-bold leading-7 text-footer-title [text-shadow:0_2px_0_var(--background),0_0_10px_color-mix(in_oklab,var(--footer-title)_30%,transparent)] sm:text-lg sm:leading-8">
              999 Sultans arriving on ARC.<br />Claim your throne before the gates close.
            </p>
            <Button
              size="lg"
              onClick={() => setView("whitelist")}
              style={WHITELIST_BUTTON_BACKGROUND}
              className="mt-5 h-9 w-full max-w-[250px] border-0 bg-primary px-2 font-display text-[10px] font-bold text-footer-title shadow-none hover:bg-primary/90 sm:h-10 sm:text-xs"
            >
              ENTER THE SULTANATE
            </Button>
          </section>
        ) : view === "whitelist" ? (
          <section key="whitelist" className="state-enter mx-auto flex w-full max-w-xl items-center justify-center">
            <div className="w-full max-w-lg">
              <header className="relative z-10 -mb-7 px-4 pt-1 text-center sm:-mb-10">
                <h1 className="sr-only">ARCSultans</h1>
                <img
                  src={TITLE_LOGO}
                  alt="ARCSultans"
                  className="mx-auto h-16 w-auto max-w-full object-contain [image-rendering:pixelated] sm:h-24"
                />
              </header>

              <div className="flex flex-col items-center px-4">
                <div className="relative aspect-square w-full max-w-sm sm:max-w-md">
                  <img
                    src={CENTER_PREVIEW}
                    alt="Animated ARCSultans NFT collection preview"
                    className="absolute left-[32.3%] top-[29.03%] h-[34.61%] w-[35.41%] object-cover [image-rendering:pixelated]"
                  />
                  <img
                    src={MAIN_FRAME}
                    alt=""
                    className="absolute inset-0 h-full w-full object-contain [image-rendering:pixelated]"
                  />
                  <Button
                    size="lg"
                    onClick={() => setView("form")}
                    style={WHITELIST_BUTTON_BACKGROUND}
                    className="absolute left-[20%] top-[72.5%] h-[12%] w-[60%] border-0 bg-primary px-2 font-display text-[10px] font-bold text-footer-title shadow-none hover:bg-primary/90 sm:text-xs"
                  >
                    CLAIM YOUR THRONE
                  </Button>
                </div>

                <p className="-mt-10 text-center font-display text-[10px] font-bold leading-5 text-footer-title [text-shadow:0_2px_0_var(--background),0_0_10px_color-mix(in_oklab,var(--footer-title)_30%,transparent)] sm:-mt-12 sm:text-xs">
                  999 Sultans. 1 Arc Sultan.<br />A golden dynasty on ARC network.
                </p>
              </div>
            </div>
          </section>
        ) : view === "form" ? (
          <section key="form" className="state-enter mx-auto flex w-full max-w-xl flex-col items-center justify-center">
            <div className="w-full max-w-[360px]">
              <header className="relative z-10 -mb-1 px-4 text-center">
                <h1 className="sr-only">ARCSultans Whitelist</h1>
                <img
                  src={WHITELIST_TAG}
                  alt="Whitelist"
                  className="mx-auto h-12 w-auto max-w-full object-contain [image-rendering:pixelated] sm:h-16"
                />
              </header>

              <div className="px-1 py-1 sm:px-2 sm:py-2">
                <WhitelistForm onDone={handleWhitelistDone} />
              </div>
            </div>
          </section>
        ) : (
          <section key="success" className="state-enter mx-auto flex w-full max-w-2xl items-center justify-center text-center">
            <div className="success-panel relative w-full border-4 border-accent bg-popover/95 px-5 py-8 pixel-shadow sm:px-10 sm:py-10">
              <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-accent" />
              <span aria-hidden className="absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-accent" />
              <span aria-hidden className="absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-accent" />
              <span aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-accent" />
              <div className="mx-auto mb-5 w-fit border-2 border-accent bg-accent/10 px-3 py-2 font-display text-[9px] font-bold text-accent sm:text-[10px]">
                ✓ DETAILS RECORDED
              </div>
              <h1 className="success-title font-display text-3xl font-extrabold text-accent sm:text-5xl">
                Your Throne Is Reserved.
              </h1>
              <p className="mx-auto mt-5 max-w-lg font-display text-[11px] leading-6 text-foreground sm:text-sm">
                Your details have been recorded. Welcome to the dynasty.
              </p>
              <div aria-hidden className="mx-auto my-6 flex items-center justify-center gap-3 text-accent">
                <span className="h-px w-12 bg-accent/60" />
                <span className="font-display text-xs">◆</span>
                <span className="h-px w-12 bg-accent/60" />
              </div>
              <Button
                size="lg"
                onClick={() => setView("home")}
                className="h-14 w-full max-w-sm border-0 border-b-8 border-secondary bg-primary px-4 font-display text-[11px] font-bold text-primary-foreground shadow-none hover:bg-primary/90 active:translate-y-2 active:border-b-0 sm:text-sm"
              >
                RETURN TO THE KINGDOM
              </Button>
            </div>
          </section>
        )}
      </div>

      <footer className="relative z-20 w-full shrink-0 border-t-2 border-footer-border bg-footer-surface font-display text-footer-copy">
        <div className="mx-auto grid w-full max-w-[1536px] gap-x-8 gap-y-5 px-5 py-5 sm:px-8 lg:grid-cols-[minmax(190px,1fr)_minmax(360px,2fr)_auto] lg:items-center lg:px-10 lg:py-4">
          <div className="min-w-0">
            <img src={FOOTER_LOGO} alt="ARCSultans" className="h-7 w-auto max-w-full object-contain [image-rendering:pixelated] sm:h-8" />
            <p className="mt-2 text-[9px] leading-4 text-footer-copy sm:text-[10px]">Mint 16 September 2026 · ARC MAINNET</p>
          </div>

          <div className="min-w-0 lg:px-5">
            <nav aria-label="Footer navigation" className="flex min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[9px] text-footer-copy sm:gap-x-4">
              {['Home', 'Lore', 'Roadmap', 'FAQ', 'Whitepaper'].map((label, index) => (
                <span key={label} className="contents">
                  {index > 0 && <span aria-hidden className="text-footer-divider">|</span>}
                  <span className={label === 'Home' ? 'text-footer-title' : undefined}>{label}</span>
                </span>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5 border-t border-footer-divider pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="flex items-center gap-2.5">
              {[
                {
                  href: "https://x.com/arcsultans",
                  label: "X (Twitter)",
                  icon: `${CDN_ROOT}/footer/x-pixel-outline.svg`,
                },
                {
                  href: "https://t.me/arcsultans",
                  label: "Telegram",
                  icon: `${CDN_ROOT}/footer/telegram-pixel.svg`,
                },
                {
                  href: "https://opensea.io/collection/YOUR_COLLECTION",
                  label: "OpenSea",
                  icon: `${CDN_ROOT}/footer/opensea-pixel.svg`,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-footer-icon-border bg-footer-icon transition-colors duration-150 hover:border-footer-title focus-visible:border-footer-title focus-visible:outline-none sm:h-11 sm:w-11"
                >
                  <img src={item.icon} alt="" className="h-5 w-5 object-contain [image-rendering:pixelated] sm:h-6 sm:w-6" />
                </a>
              ))}
            </div>

            <p className="border-l border-footer-divider pl-4 text-[8px] uppercase leading-[1.55] text-muted-foreground">
              999 SULTANS<br />ONE DYNASTY<br />FOREVER ONCHAIN
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
