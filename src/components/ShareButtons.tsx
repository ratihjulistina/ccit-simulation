import { useState } from "react";
import { Link2, Check, Linkedin, Twitter, Facebook, MessageCircle } from "lucide-react";

type Props = { url: string; title: string };

const cls =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary";

export function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    { href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, label: "Share on LinkedIn", Icon: Linkedin },
    { href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, label: "Share on X", Icon: Twitter },
    { href: `https://api.whatsapp.com/send?text=${t}%20${u}`, label: "Share on WhatsApp", Icon: MessageCircle },
    { href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, label: "Share on Facebook", Icon: Facebook },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Share
      </span>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={cls}
          onClick={async (e) => {
            if (typeof navigator !== "undefined" && navigator.share) {
              e.preventDefault();
              const ok = await nativeShare();
              if (!ok) window.open(href, "_blank", "noopener,noreferrer");
            }
          }}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" title="Copy link" className={cls}>
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
      </button>
    </div>
  );
}
