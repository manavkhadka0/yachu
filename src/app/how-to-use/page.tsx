import { Metadata } from "next";
import HowToUse from "@/components/home/HowTOUse";
export const metadata: Metadata = {
    title: "How to Use Yachu Hair Oil | Application Guide",
    description:
        "Learn the best practices on how to use Yachu Hair Oil for healthy hair growth, root nourishment, and maintenance. Step-by-step application guide.",
    keywords: [
        "how to use yachu hair oil",
        "hair oil application steps",
        "yachu hair oil guide",
        "hair growth oil usage",
        "botanical hair care instructions",
        "best way to apply hair oil",
        "yachu hair care tips",
    ],
    openGraph: {
        title: "How to Use Yachu Hair Oil | Application Guide",
        description:
            "Learn the best practices on how to use Yachu Hair Oil for healthy hair growth, root nourishment, and maintenance.",
        type: "website",
        url: "/how-to-use",
        siteName: "Yachu Hair Oil",
        images: [
            {
                url: "/yachu-logo.svg",
                width: 1200,
                height: 630,
                alt: "How to Use Yachu Hair Oil Guide",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "How to Use Yachu Hair Oil | Application Guide",
        description:
            "Learn the best practices on how to use Yachu Hair Oil for healthy hair growth, root nourishment, and maintenance.",
        images: ["/yachu-logo.svg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "/how-to-use",
    },
};

export default function HowToUsePage() {
    return (
        <>
            <HowToUse />
        </>
    )
}
