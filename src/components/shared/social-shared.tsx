import React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title,
  description = "",
  className = "",
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    const shareUrl = shareLinks[platform];

    if (platform === "email") {
      window.location.href = shareUrl;
    } else {
      window.open(
        shareUrl,
        "_blank",
        "width=600,height=400,scrollbars=yes,resizable=yes"
      );
    }

    const platformName =
      platform === "twitter"
        ? "X"
        : platform.charAt(0).toUpperCase() + platform.slice(1);
    toast.success(`Content shared on ${platformName}`);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url,
        });
        toast.success("Content shared successfully");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast.success("The link has been copied to your clipboard");
      } catch (error) {
        console.log("Error copying to clipboard:", error);
      }
    }
  };

  return (
    <div className={`flex flex-row items-center gap-4 ${className}`}>
      <p className="font-bold text-gray-400">Share</p>
      <div className="flex items-center gap-2">
        {/* Native Share Button (Mobile) */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-gray-100"
          onClick={handleNativeShare}
          title="Share"
        >
          <Share2 className="h-4 w-4 text-gray-600" />
        </Button>

        {/* Facebook */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-blue-50"
          onClick={() => handleShare("facebook")}
          title="Share on Facebook"
        >
          <Facebook className="h-4 w-4 text-blue-600" />
        </Button>

        {/* X (formerly Twitter) */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-gray-50"
          onClick={() => handleShare("twitter")}
          title="Share on X"
        >
          <XIcon className="h-4 w-4 text-gray-900" />
        </Button>

        {/* WhatsApp */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-green-50"
          onClick={() => handleShare("whatsapp")}
          title="Share on WhatsApp"
        >
          <MessageCircle className="h-4 w-4 text-green-600" />
        </Button>

        {/* Email */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-gray-50"
          onClick={() => handleShare("email")}
          title="Share via Email"
        >
          <Mail className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;
