import type{ComponentPropsWithoutRef}from"react";
export function ButtonLink({children,className="",...props}:ComponentPropsWithoutRef<"a">){return <a className={`button ${className}`} {...props}>{children}</a>;}
