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
      <h3 className="mb-6 text-lg font-semibold text-primary-foreground">{title}</h3>
      <div className="flex flex-col gap-4">
        {links.map(({ name, href }, index) => (
          <Link
            href={href}
            key={index}
            className="text-primary-foreground transition-colors hover:underline"
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterLinkColumn;
