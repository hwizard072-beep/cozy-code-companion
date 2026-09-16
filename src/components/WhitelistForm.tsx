import { useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CDN_ROOT = "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/TheSaudisARC@main";
const THRONE_BUTTON = `${CDN_ROOT}/buttons/button-4kd.png`;
const FIELD_FRAME_IMAGE = `${CDN_ROOT}/whitelist_submit/buttonframe.png`;
const FOLLOW_FRAME_IMAGE = `${CDN_ROOT}/whitelist_submit/followed.png`;

const WALLET_RE = /^0x[a-fA-F0-9]{40}$/;
// Direct comment link: https://x.com/USERNAME/status/123 or https://twitter.com/USERNAME/status/123
const X_COMMENT_RE = /^https:\/\/(?:x\.com|twitter\.com)\/([A-Za-z0-9_]+)\/status\/\d+$/;

// Sprite-crop frames: the artwork has transparent margins baked into the
// source image, so we render only the art region at its native aspect ratio —
// corners and line thickness stay exactly as drawn, never stretched.
const FIELD_SPRITE = {
  width: "100.28%",
  height: "196.21%",
  left: "-0.23%",
  top: "-45.8%",
} as const;

const FOLLOW_SPRITE = {
  width: "102.55%",
  height: "123.93%",
  left: "-1.23%",
  top: "-10.62%",
} as const;

export function SpriteFrame({
  src,
  sprite,
  aspect,
  children,
}: {
  src: string;
  sprite: Readonly<Record<"width" | "height" | "left" | "top", string>>;
  aspect: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full" style={{ aspectRatio: aspect }}>
      <img
        src={src}
        alt=""
        aria-hidden
        className="pointer-events-none absolute max-w-none select-none [image-rendering:pixelated]"
        style={sprite}
      />
      {children}
    </div>
  );
}

const SUBMIT_BUTTON = {
  backgroundColor: "transparent",
  backgroundImage: `url(${THRONE_BUTTON})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  imageRendering: "pixelated",
} as const;

type Errors = Partial<Record<"walletAddress" | "xUsername" | "xCommentLink" | "form", string>>;

export function WhitelistForm({ onDone }: { onDone?: () => void }) {
  const [walletAddress, setWalletAddress] = useState("");
  const [xUsername, setXUsername] = useState("");
  const [xCommentLink, setXCommentLink] = useState("");
  const [followed, setFollowed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const walletValid = WALLET_RE.test(walletAddress.trim());
  const usernameClean = xUsername.trim().replace(/^@/, "");
  const usernameValid = usernameClean.length > 0;

  const linkMatchResult = xCommentLink.trim().match(X_COMMENT_RE);
  const linkMatch = linkMatchResult !== null;
  const linkUsername = linkMatchResult ? linkMatchResult[1] : null;
  const usernameMatch =
    linkUsername != null && linkUsername.toLowerCase() === usernameClean.toLowerCase();
  const linkValid = linkMatch && usernameMatch;

  // Inline error for the comment link field (shown while typing)
  let linkError: string | null = null;
  if (xCommentLink.trim().length > 0) {
    if (!linkMatch) {
      linkError =
        "Please paste the direct link to your comment (use the Share → Copy Link button on your comment, not a shortened link).";
    } else if (!usernameMatch) {
      linkError = "X username doesn't match the username in your comment link.";
    }
  }

  const canSubmit = walletValid && usernameValid && linkValid && followed && !submitting;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("https://whitelist.arcsultans.vip/submit", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet_address: walletAddress.trim(),
          x_username: usernameClean,
          x_comment_link: xCommentLink.trim(),
        }),
      });
      if (res.ok) {
        onDone?.();
      } else {
        let message = "Something went wrong. Please try again.";
        try {
          const body = await res.json();
          if (body && typeof body.error === "string" && body.error.length > 0) {
            message = body.error;
          }
        } catch {
          // response wasn't JSON — keep the generic message
        }
        setErrors({ form: message });
      }
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-1.5" noValidate>
      <div className="space-y-1">
        <Label htmlFor="wallet" className="font-display text-[9px] text-footer-title sm:text-[10px]">
          ARC WALLET ADDRESS
        </Label>
        <SpriteFrame src={FIELD_FRAME_IMAGE} sprite={FIELD_SPRITE} aspect="2166 / 369">
          <div className="absolute inset-x-[11%] bottom-[19.5%] top-[19.2%] flex items-center">
            <Input
              id="wallet"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x…"
              autoComplete="off"
              spellCheck={false}
              maxLength={42}
              className="h-full rounded-none border-0 bg-transparent px-0 font-mono text-xs text-footer-title shadow-none placeholder:text-footer-title/40 focus-visible:ring-0 sm:text-sm"
            />
          </div>
        </SpriteFrame>
        {walletAddress.length > 0 && !walletValid && (
          <p className="text-xs text-destructive">Must start with 0x followed by 40 hex characters.</p>
        )}
        {errors.walletAddress && <p className="text-xs text-destructive">{errors.walletAddress}</p>}
      </div>

      <div className="space-y-1">
        <Label htmlFor="x-username" className="font-display text-[9px] text-footer-title sm:text-[10px]">
          X USERNAME
        </Label>
        <SpriteFrame src={FIELD_FRAME_IMAGE} sprite={FIELD_SPRITE} aspect="2166 / 369">
          <div className="absolute inset-x-[11%] bottom-[19.5%] top-[19.2%] flex items-center">
            <Input
              id="x-username"
              value={xUsername}
              onChange={(e) => setXUsername(e.target.value)}
              placeholder="@yourhandle"
              maxLength={50}
              className="h-full rounded-none border-0 bg-transparent px-0 font-mono text-xs text-footer-title shadow-none placeholder:text-footer-title/40 focus-visible:ring-0 sm:text-sm"
            />
          </div>
        </SpriteFrame>
        {errors.xUsername && <p className="text-xs text-destructive">{errors.xUsername}</p>}
      </div>

      <div className="space-y-1">
        <Label htmlFor="x-comment-link" className="font-display text-[9px] text-footer-title sm:text-[10px]">
          X COMMENT LINK
        </Label>
        <SpriteFrame src={FIELD_FRAME_IMAGE} sprite={FIELD_SPRITE} aspect="2166 / 369">
          <div className="absolute inset-x-[11%] bottom-[19.5%] top-[19.2%] flex items-center">
            <Input
              id="x-comment-link"
              value={xCommentLink}
              onChange={(e) => setXCommentLink(e.target.value)}
              placeholder="https://x.com/…"
              autoComplete="off"
              spellCheck={false}
              maxLength={500}
              className="h-full rounded-none border-0 bg-transparent px-0 font-mono text-xs text-footer-title shadow-none placeholder:text-footer-title/40 focus-visible:ring-0 sm:text-sm"
            />
          </div>
        </SpriteFrame>
        {linkError && <p className="text-xs text-destructive">{linkError}</p>}
        {errors.xCommentLink && <p className="text-xs text-destructive">{errors.xCommentLink}</p>}
      </div>

      <SpriteFrame src={FOLLOW_FRAME_IMAGE} sprite={FOLLOW_SPRITE} aspect="2118 / 584">
        <div className="absolute inset-x-[8%] bottom-[23%] top-[22.6%] flex items-center">
          <div>
          <a
            href="https://x.com/arcsultans"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-display text-[10px] font-bold text-footer-title"
          >
            Follow @ARCSultans on X
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <div className="mt-1.5 flex items-start gap-2.5">
            <Checkbox
              id="followed"
              checked={followed}
              onCheckedChange={(v) => setFollowed(v === true)}
              className="mt-0.5 rounded-none border-footer-title data-[state=checked]:bg-footer-title"
            />
            <Label htmlFor="followed" className="font-display text-[9px] leading-5 font-normal text-footer-title">
              I'VE FOLLOWED @ARCSultans ON X
            </Label>
          </div>
          </div>
        </div>
      </SpriteFrame>

      {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}

      <Button
        type="submit"
        disabled={!canSubmit}
        style={SUBMIT_BUTTON}
        className="mx-auto block h-10 w-full max-w-[230px] border-0 bg-transparent font-display text-[11px] font-bold text-footer-title shadow-none hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-100 sm:h-11 sm:max-w-[250px] sm:text-xs"
      >
        {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        SEAL YOUR CLAIM
      </Button>
    </form>
  );
}
