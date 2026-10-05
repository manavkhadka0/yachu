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
      <h3 className="mb-5 font-display text-xl text-gold">{title}</h3>
      <div className="flex flex-col gap-3">
        {links.map(({ name, href }, index) => (
          <Link
            href={href}
            key={index}
            className="w-fit text-sm text-cream/80 transition-colors hover:text-gold"
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterLinkColumn;
