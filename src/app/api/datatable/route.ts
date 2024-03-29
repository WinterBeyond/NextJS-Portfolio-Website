import getParsedNumberOrDefault from "@/lib/getParsedNumberOrDefault";
import getPokemon from "@/lib/getPokemon";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const pokemon = getPokemon();

	const searchParams = req.nextUrl.searchParams;
	const page = getParsedNumberOrDefault(searchParams.get("page"), 1, 1);
	const size = getParsedNumberOrDefault(searchParams.get("size"), 10, 1);
	const search = searchParams.get("search") || "";
	const skip = (page - 1) * size;

	const matchingPokemon = pokemon.filter((poke) =>
		poke.name.toLowerCase().startsWith(search)
	);
	const total = matchingPokemon.length;
	const entries = matchingPokemon.slice(skip, skip + size);

	return NextResponse.json({
		entries,
		total,
	});
}
