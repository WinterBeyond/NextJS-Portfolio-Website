import Pokemon from "@/lib/models/pokemon";

export default function getPokemon(): Pokemon[] {
	return [
		{
			name: "Pikachu",
			abilities: ["Static", "Lightning Rod"],
			imageUrl:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
		},
		{
			name: "Bulbasaur",
			abilities: ["Overgrow", "Chlorophyll"],
			imageUrl:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
		},
		{
			name: "Charmander",
			abilities: ["Blaze", "Solar Power"],
			imageUrl:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
		},
		{
			name: "Squirtle",
			abilities: ["Torrent", "Rain Dish"],
			imageUrl:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
		},
		{
			name: "Articuno",
			abilities: ["Pressure", "Snow Cloak"],
			imageUrl:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png",
		},
		{
			name: "Zapdos",
			abilities: ["Pressure", "Static"],
			imageUrl:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png",
		},
		{
			name: "Moltres",
			abilities: ["Pressure", "Flame Body"],
			imageUrl:
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png",
		},
	];
}
