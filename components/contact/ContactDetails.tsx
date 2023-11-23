import { MailIcon, MapPin, PhoneCallIcon } from "lucide-react";
import Link from "next/link";

const ContactDetails = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <MapPin className="h-4 w-4 mt-1 text-amber-600" />
          <div className="">
            <p className=" font-bold">Yachu Hair Oil</p>
            <p className=" text-gray-500">Kathmandu, Nepal</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PhoneCallIcon className="h-4 w-4 text-amber-600" />
          <Link href="">01-2323233</Link>/ <Link href="">982565233</Link>
        </div>
        <div className="flex items-center gap-2">
          <MailIcon className="h-4 w-4 text-amber-600" />
          <Link href="">yachu@hairoil.com</Link>
        </div>
      </div>
    </div>
  );
};
export default ContactDetails;
