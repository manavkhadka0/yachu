import {
  yachuEmail,
  yachuPhone,
  yachuCompanyName,
} from "@/constants/constant";
import { MailIcon, MapPin, PhoneCallIcon } from "lucide-react";
import Link from "next/link";

const ContactDetails = () => {
  return (
    <div className="my-6 py-4 max-w-3xl mx-auto m-[20px]">
      {/* Contact Info */}
      <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-6 gap-4 mb-4">
        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <p className="font-bold">{yachuCompanyName}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2">
          <PhoneCallIcon className="h-5 w-5 text-amber-600" />
          <Link href={`tel:${yachuPhone}`} className="hover:underline">
            {yachuPhone}
          </Link>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <MailIcon className="h-5 w-5 text-amber-600" />
          <Link href={`mailto:${yachuEmail}`} className="hover:underline">
            {yachuEmail}
          </Link>
        </div>
      </div>

      {/* Map */}
      {/* <iframe
        src={yachuMapEmbedUrl}
        loading="lazy"
        className="w-full h-64 sm:h-80 rounded-md"
        title={`${yachuCompanyName} Location Map`}
      ></iframe> */}
    </div>
  );
};

export default ContactDetails;
