import Column from "./Column";
import { IDataTable } from "./DataTable";
import Row from "./Row";

export default function MobileDataTable<T>({
	id,
	summary,
	columns,
	entries,
}: IDataTable<T>) {
	id += "-mobile";

	return (
		<table
			id={`table-${id}`}
			key={`table-${id}`}
			className="rounded-lg bg-neutral-800 bg-opacity-30 bg-clip-padding backdrop-blur-lg backdrop-filter xl:hidden"
			role="table"
			summary={summary}
		>
			<tbody key={`table-${id}-data`} role="rowgroup">
				{entries.map((entry) => (
					<Row key={`table-${id}-row`} isMobile>
						{columns.map((column) => (
							<Column<T>
								key={`table-${id}-data-${
									column.field ?? column.label
								}`}
								column={column}
								entry={entry}
								isMobile
							/>
						))}
					</Row>
				))}
			</tbody>
		</table>
	);
}
