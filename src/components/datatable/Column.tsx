import { ReactNode } from "react";
import { Column } from "./DataTable";

type ColumnProps<T> = {
	isMobile?: boolean;
	column: Column<T>;
	entry: T;
};

export default function Column<T>({ isMobile, column, entry }: ColumnProps<T>) {
	const getParsedFieldValue = () => {
		let data = entry as any;
		if (column.field)
			for (const field of column.field.split(".")) data = data[field];

		if (
			column.isDate &&
			(data instanceof Date ||
				typeof data === "string" ||
				typeof data === "number")
		)
			data = new Date(data).toLocaleString();

		if (column.booleanLabel && typeof data === "boolean") {
			if (data) {
				if (typeof column.booleanLabel.true === "string")
					data = (
						<span className="rounded-xl bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">
							{column.booleanLabel.true}
						</span>
					);
				else data = column.booleanLabel.true;
			} else {
				if (typeof column.booleanLabel.false === "string")
					data = (
						<span className="rounded-xl bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
							{column.booleanLabel.false}
						</span>
					);
				else data = column.booleanLabel.false;
			}
		}

		return data as ReactNode;
	};

	const cellValue =
		column.renderCell?.(entry) ?? (column.field && getParsedFieldValue());

	if (isMobile)
		return (
			<td className="flex items-center gap-2 px-4 py-1" role="cell">
				{column.label && (
					<span className="font-semibold">{column.label}:</span>
				)}
				{cellValue}
			</td>
		);

	return (
		<td
			className="flex flex-1 items-center justify-center border-t border-neutral-700 px-4 py-2 text-center"
			role="cell"
			style={{
				minWidth: column.minWidth,
				maxWidth: column.maxWidth,
			}}
		>
			{cellValue}
		</td>
	);
}
