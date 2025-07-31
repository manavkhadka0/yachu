import {
  yachuEmail,
  yachuPhone,
  yachuAddress,
  yachuCompanyName,
} from "@/constants/constant";
import { MailIcon, MapPin, PhoneCallIcon } from "lucide-react";
import Link from "next/link";

const FooterContactDetails = () => {
  return (
    <div>
      <h3 className="mb-6 text-lg font-semibold text-primary-foreground">
        Contact Details
      </h3>
      <div className="flex flex-col gap-4 text-primary-foreground">
        <div className="flex gap-3">
          <MapPin className="h-4 w-4 flex-shrink-0 mt-1 text-primary-foreground" />
          <div>
            <p className="font-medium">{yachuCompanyName}</p>
            <p className="text-sm opacity-80">{yachuAddress}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PhoneCallIcon className="h-4 w-4 text-primary-foreground" />
          <Link
            href={`tel:${yachuPhone}`}
            className="text-primary-foreground transition-colors hover:underline"
          >
            {yachuPhone}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <MailIcon className="h-4 w-4 text-primary-foreground" />
          <Link
            href={`mailto:${yachuEmail}`}
            className="text-primary-foreground transition-colors hover:underline"
          >
            {yachuEmail}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FooterContactDetails;
