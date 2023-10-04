import { Column } from "./DataTable";

type ColumnHeaderProps<T> = {
	isMobile?: boolean;
	column: Column<T>;
};

export default function ColumnHeader<T>({ column }: ColumnHeaderProps<T>) {
	return (
		<th
			className="flex flex-1 items-center justify-center px-4 py-2"
			role="columnheader"
			style={{
				minWidth: column.minWidth,
				maxWidth: column.maxWidth,
			}}
		>
			{column.label}
		</th>
	);
}
