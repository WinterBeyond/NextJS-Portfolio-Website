export default function getParsedNumberOrDefault(
	str: string | null = "",
	defaultValue: number,
	minimumValue?: number
) {
	const parsedNumber = parseInt(str ?? "");
	return isNaN(parsedNumber)
		? defaultValue
		: minimumValue && parsedNumber < minimumValue
		? minimumValue
		: parsedNumber;
}
