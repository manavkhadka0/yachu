import {
  yachuEmail,
  yachuPhone,
  chibekoEmail,
  chibekoPhone,
  chibekoVatNo,
  chibekoRegistrationNo,
} from "@/constants/constant";
import { MailIcon, PhoneCallIcon, FileTextIcon, ReceiptIcon } from "lucide-react";
import Link from "next/link";

const FooterContactDetails = () => {
  return (
    <div>
      <h3 className="mb-6 text-lg font-semibold text-primary-foreground">
        Contact Details
      </h3>
      <div className="flex flex-col gap-4 text-primary-foreground">
        <div className="flex items-center gap-3">
          <PhoneCallIcon className="h-4 w-4 text-primary-foreground shrink-0" />
          <Link
            href={`tel:${yachuPhone}`}
            className="text-primary-foreground transition-colors hover:underline"
          >
            {yachuPhone}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <MailIcon className="h-4 w-4 text-primary-foreground shrink-0" />
          <Link
            href={`mailto:${yachuEmail}`}
            className="text-primary-foreground transition-colors hover:underline"
          >
            {yachuEmail}
          </Link>
        </div>

        <div className="pt-2 border-t border-slate-700/50 flex flex-col gap-3">
          <p className="font-medium text-white ">
            Chibe Traders
          </p>
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
