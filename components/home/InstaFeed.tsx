import { beholdId } from "@/constants/constant";
import { InstagramIcon } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

const InstaFeed = () => {
  return (
    <div>
      <Script
        src="https://w.behold.so/widget.js"
        type="module"
        strategy="lazyOnload"
      ></Script>
      <div className=" p-4 text-center text-xl mb-6">
        Follow{" "}
        <Link
          href={"https://www.instagram.com/yachu.np/"}
          target="_blank"
          className="text-amber-600 font-bold underline hover:text-amber-700 transition-all inline-flex align-self"
        >
          @yachu.np
        </Link>{" "}
        on Instagram
      </div>

      <figure data-behold-id={beholdId}></figure>
    </div>
  );
};
export default InstaFeed;
