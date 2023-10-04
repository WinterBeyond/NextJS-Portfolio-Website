import Column from "./Column";
import ColumnHeader from "./ColumnHeader";
import { IDataTable } from "./DataTable";
import Row from "./Row";

export default function DesktopDataTable<T>({
	id,
	summary,
	columns,
	entries,
}: IDataTable<T>) {
	id += "-desktop";

	return (
		<table
			id={`table-${id}`}
			key={`table-${id}`}
			className="hidden flex-col rounded-lg bg-neutral-800 bg-opacity-30 bg-clip-padding backdrop-blur-lg backdrop-filter xl:flex"
			role="table"
			summary={summary}
		>
			<thead key={`table-${id}-head`} role="rowgroup">
				<Row key={`table-${id}-head-row`} isHeader>
					{columns.map((column) => (
						<ColumnHeader<T>
							key={`table-${id}-head-data-${
								column.field ?? column.label
							}`}
							column={column}
						/>
					))}
				</Row>
			</thead>
			<tbody key={`table-${id}-body`} role="rowgroup">
				{entries.map((entry) => (
					<Row key={`table-${id}-row`}>
						{columns.map((column) => (
							<Column<T>
								key={`table-${id}-data-${
									column.field ?? column.label
								}`}
								column={column}
								entry={entry}
							/>
						))}
					</Row>
				))}
			</tbody>
		</table>
	);
}
