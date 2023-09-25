type TooltipProps = {
	visibleClass: string;
	text: string;
};

export default function Toolip({ visibleClass, text }: TooltipProps) {
	return (
		<div
			className={`tooltip shadow-dark absolute bottom-10 ${visibleClass} z-50 hidden w-max rounded-lg border border-neutral-700 bg-neutral-900 bg-opacity-10 bg-clip-padding p-2 font-bold text-white backdrop-blur-lg backdrop-filter`}
		>
			<p className="select-none text-sm leading-none">{text}</p>
		</div>
	);
}
