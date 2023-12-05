import { yachuEmail, yachuPhone } from "@/constants/constant";
import { MailIcon, MapPin, PhoneCallIcon } from "lucide-react";
import Link from "next/link";
const FooterContactDetails = () => {
  return (
    <div>
      <p className="text-lg font-semibold mb-2">Contact Details</p>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <MapPin className="h-4 w-4 mt-1" />
          <div className="">
            <p>Yachu Hair Oil</p>
            <p className=" text-gray-300">Kathmandu, Nepal</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PhoneCallIcon className="h-4 w-4" />
          <Link href={`tel:${yachuPhone}`} className=" hover:underline">
            {yachuPhone}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <MailIcon className="h-4 w-4" />
          <Link href={`mailto:${yachuEmail}`} className="hover:underline">
            {yachuEmail}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FooterContactDetails;
