import React from "react";

interface Props {
  to: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
  target?: "_blank";
  download?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const ExternalLink: React.FC<Props> = React.memo(function Link({
  className,
  to,
  target,
  children,
  onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    // fall through the default behavior
  },
  ...props
}) {
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <a
      className={className}
      href={to}
      target={target}
      onClick={onClick}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
    /* eslint-enable react/jsx-props-no-spreading */
  );
});
