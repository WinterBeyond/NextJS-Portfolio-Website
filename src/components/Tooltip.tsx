import { cn } from "@/lib/common";

type TooltipProps = {
	visibleClass: string;
	text: string;
};

export default function Toolip({ visibleClass, text }: TooltipProps) {
	return (
		<div
			className={cn(
				"tooltip shadow-dark absolute bottom-10 right-0 z-50 hidden w-max rounded-lg border border-neutral-700 bg-neutral-900 bg-opacity-10 bg-clip-padding p-2 font-bold text-white backdrop-blur-lg backdrop-filter 2xl:right-[initial]",
				visibleClass
			)}
		>
			<p className="select-none text-sm leading-none">{text}</p>
		</div>
	);
}
