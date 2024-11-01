"use client";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes, forwardRef } from "react";

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({});

interface NextLinkComposedProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<
      NextLinkProps,
      "href" | "as" | "passHref" | "onMouseEnter" | "onClick" | "onTouchStart"
    > {
  to: NextLinkProps["href"];
  linkAs?: NextLinkProps["as"];
}

export const NextLinkComposed = forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>(function NextLinkComposed(props, ref) {
  const {
    to,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
    legacyBehavior = true,
    locale,
    ...other
  } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
      legacyBehavior={legacyBehavior}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
});

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps["as"];
  href: NextLinkProps["href"];
  linkAs?: NextLinkProps["as"]; // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, "to" | "linkAs" | "href"> &
  Omit<MuiLinkProps, "href">;

// A styled version of the Next.js Link component:
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const currentPathName = usePathname();

    const {
      activeClassName = "active",
      as,
      className: classNameProps,
      href,
      legacyBehavior,
      linkAs: linkAsProp,
      locale,
      noLinkStyle,
      prefetch,
      replace,
      scroll,
      shallow,
      ...rest
    } = props;

    const pathname = typeof href === "string" ? href : href.pathname;
    const className = clsx(classNameProps, {
      [activeClassName]: currentPathName === pathname && activeClassName,
    });

    const linkAs = linkAsProp || as;
    const nextJsProps = {
      to: href,
      linkAs,
      replace,
      scroll,
      shallow,
      prefetch,
      legacyBehavior,
      locale,
    };

    if (noLinkStyle) {
      return (
        <NextLinkComposed
          className={className}
          ref={ref}
          {...nextJsProps}
          {...rest}
        />
      );
    }

    return (
      <MuiLink
        component={NextLinkComposed}
        className={className}
        ref={ref}
        {...nextJsProps}
        {...rest}
      />
    );
  },
);
