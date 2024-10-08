import { yachuEmail, yachuPhone } from "@/constants/constant";
import { MailIcon, MapPin, PhoneCallIcon } from "lucide-react";
import Link from "next/link";

const ContactDetails = () => {
  return (
    <div className="my-6 py-4 max-w-3xl mx-auto">
      <div className=" mx-auto py-4 justify-center flex gap-4 mb-4">
        <div className="flex gap-4">
          <MapPin className="h-4 w-4 mt-1 text-amber-600" />
          <div className="mx-4">
            <p className=" font-bold">Yachu Hair Oil</p>
            <p className=" text-gray-500">Kathmandu, Nepal</p>
          </div>
        </div>
        <div className="flex mx-4 items-center gap-2">
          <PhoneCallIcon className="h-4 w-4 text-amber-600" />
          <Link href={`tel:${yachuPhone}`} className=" hover:underline">
            {yachuPhone}
          </Link>
        </div>
        <div className="flex mx-4 items-center gap-2">
          <MailIcon className="h-4 w-4 text-amber-600" />
          <Link href={`mailto:${yachuEmail}`} className="hover:underline">
            {yachuEmail}
          </Link>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14128.5832757722!2d85.2948573!3d27.7127837!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e7e4bdbd27%3A0x28db146dea0e26c2!2sYachu%20hair%20oil!5e0!3m2!1sen!2snp!4v1700816223581!5m2!1sen!2snp"
        width="600"
        height="400"
        loading="lazy"
        className="w-full"
      ></iframe>
    </div>
  );
};
export default ContactDetails;
