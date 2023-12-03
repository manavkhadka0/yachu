import Link from "next/link";

type FooterLinkColumnProps = {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
};

const FooterLinkColumn: React.FC<FooterLinkColumnProps> = ({
  title,
  links,
}) => {
  return (
    <div>
      <p className="text-lg font-semibold mb-6">{title}</p>
      <div className="flex flex-col gap-4">
        {links.map(({ name, href }, index) => (
          <Link
            href={href}
            key={index}
            className=" hover:text-amber-700 transition-all "
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default FooterLinkColumn;
