"use client";

import Image from "next/image";
import DataTable from "./datatable/DataTable";
import Pokemon from "@/lib/models/pokemon";

export default function PokedexDataTable() {
	return (
		<DataTable<Pokemon>
			id="pokemon"
			title="Pokedex"
			useParamsId
			url="/api/datatable"
			columns={[
				{
					label: "Pokemon",
					renderCell: (pokemon) => {
						return (
							<div className="flex items-center justify-center">
								<Image
									src={pokemon.imageUrl}
									alt={`Image of ${pokemon.name}`}
									width={150}
									height={150}
								/>
								{pokemon.name}
							</div>
						);
					},
				},
				{
					label: "Abilities",
					renderCell: (pokemon) => {
						if (pokemon.abilities.length === 0)
							return (
								<span className="text-red-500">
									No abilities!
								</span>
							);

						return (
							<ul>
								{pokemon.abilities.map((ability) => (
									<li
										key={`pokemon-${pokemon.name}-${ability}`}
									>
										{ability}
									</li>
								))}
							</ul>
						);
					},
				},
			]}
		/>
	);
}
