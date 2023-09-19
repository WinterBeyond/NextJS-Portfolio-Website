type TooltipProps = {
	visibleClass: string;
	text: string;
};

export default function Toolip({ visibleClass, text }: TooltipProps) {
	return (
		<div
			className={`tooltip absolute bottom-10 shadow-dark ${visibleClass} hidden p-2 bg-neutral-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-neutral-700 text-white rounded-lg font-bold w-max z-50`}
		>
			<p className="select-none leading-none text-sm">{text}</p>
		</div>
	);
}
