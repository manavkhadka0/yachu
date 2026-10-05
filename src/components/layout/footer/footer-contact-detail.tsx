import {
  yachuEmail,
  yachuPhone,
  yachuCustomerService,
  chibekoEmail,
  chibekoPhone,
  chibekoVatNo,
  chibekoRegistrationNo,
  chibekoAddress,
  chibekoOffice,
} from "@/constants/constant";
import {
  MailIcon,
  PhoneCallIcon,
  FileTextIcon,
  ReceiptIcon,
  MapPinIcon,
} from "lucide-react";
import Link from "next/link";

const FooterContactDetails = () => {
  return (
    <div>
      <h3 className="mb-5 font-display text-xl text-gold">
        Contact Details
      </h3>
      <div className="flex flex-col gap-3 text-cream/80">
        <div>
          {/* <p className="font-medium text-white">{yachuCustomerService}</p> */}
          <p className="text-xs uppercase tracking-widest text-cream/50">
            Customer Service
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <PhoneCallIcon className="h-4 w-4 shrink-0 text-gold" />
          <Link
            href={`tel:${yachuPhone}`}
            className="transition-colors hover:text-gold"
          >
            {yachuPhone}
          </Link>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MailIcon className="h-4 w-4 shrink-0 text-gold" />
          <Link
            href={`mailto:${yachuEmail}`}
            className="transition-colors hover:text-gold"
          >
            {yachuEmail}
          </Link>
        </div>

        <div className="mt-2 flex flex-col gap-3 border-t border-cream/15 pt-5">
          <div>
            <p className="font-medium text-cream">Chibe Traders Pvt. Ltd.</p>
            <p className="text-xs uppercase tracking-widest text-cream/50">
              {chibekoOffice}
            </p>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <MapPinIcon className="h-4 w-4 shrink-0 text-gold mt-0.5" />
            <span>{chibekoAddress}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <PhoneCallIcon className="h-4 w-4 shrink-0 text-gold" />
            <Link
              href={`tel:${chibekoPhone}`}
              className="transition-colors hover:text-gold"
            >
              {chibekoPhone}
            </Link>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MailIcon className="h-4 w-4 shrink-0 text-gold" />
            <Link
              href={`mailto:${chibekoEmail}`}
              className="transition-colors hover:text-gold"
            >
              {chibekoEmail}
            </Link>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <ReceiptIcon className="h-4 w-4 shrink-0 text-gold" />
            <span>VAT No: {chibekoVatNo}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FileTextIcon className="h-4 w-4 shrink-0 text-gold" />
            <span>Reg No: {chibekoRegistrationNo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FooterContactDetails;
