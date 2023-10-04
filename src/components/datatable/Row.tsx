import { ReactNode } from "react";

type RowProps = {
	isHeader?: boolean;
	isMobile?: boolean;
	children: ReactNode;
};

export default function Row({ isHeader, isMobile, children }: RowProps) {
	if (isMobile)
		return (
			<tr
				role={isHeader ? "rowheader" : "row"}
				className="flex flex-col justify-start border-t border-neutral-700 py-4 first:pt-0 [&:nth-last-child(2)]:pb-0"
			>
				{children}
			</tr>
		);

	return (
		<tr role={isHeader ? "rowheader" : "row"} className="flex">
			{children}
		</tr>
	);
}
