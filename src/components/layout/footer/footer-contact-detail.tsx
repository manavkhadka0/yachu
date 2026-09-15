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
      <h3 className="mb-6 text-lg font-semibold text-primary-foreground">
        Contact Details
      </h3>
      <div className="flex flex-col gap-3 text-primary-foreground">
        <div>
          <p className="font-medium text-white">{yachuCustomerService}</p>
          <p className="text-sm text-slate-300">Customer Service</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <PhoneCallIcon className="h-4 w-4 text-primary-foreground shrink-0" />
          <Link
            href={`tel:${yachuPhone}`}
            className="text-primary-foreground transition-colors hover:underline"
          >
            {yachuPhone}
          </Link>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MailIcon className="h-4 w-4 text-primary-foreground shrink-0" />
          <Link
            href={`mailto:${yachuEmail}`}
            className="text-primary-foreground transition-colors hover:underline"
          >
            {yachuEmail}
          </Link>
        </div>

        <div className="pt-2 border-t border-slate-700/50 flex flex-col gap-3">
          <div>
            <p className="font-medium text-white">Chibe Traders Pvt. Ltd.</p>
            <p className=" text-sm text-slate-300">{chibekoOffice}</p>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <MapPinIcon className="h-4 w-4 text-primary-foreground shrink-0 mt-0.5" />
            <span>{chibekoAddress}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <PhoneCallIcon className="h-4 w-4 text-primary-foreground shrink-0" />
            <Link
              href={`tel:${chibekoPhone}`}
              className="text-primary-foreground transition-colors hover:underline"
            >
              {chibekoPhone}
            </Link>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MailIcon className="h-4 w-4 text-primary-foreground shrink-0" />
            <Link
              href={`mailto:${chibekoEmail}`}
              className="text-primary-foreground transition-colors hover:underline"
            >
              {chibekoEmail}
            </Link>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <ReceiptIcon className="h-4 w-4 text-primary-foreground shrink-0" />
            <span>VAT No: {chibekoVatNo}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FileTextIcon className="h-4 w-4 text-primary-foreground shrink-0" />
            <span>Reg No: {chibekoRegistrationNo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FooterContactDetails;
