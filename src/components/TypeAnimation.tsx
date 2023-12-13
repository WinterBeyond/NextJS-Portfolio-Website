"use client";

import { createElement, useEffect, useState } from "react";

type TypeAnimationProps = {
	className?: string;
	wrapper?: string;
	cursor?: boolean;
	textList: string[];
	typeSpeed?: number;
	eraseSpeed?: number;
	repeat?: number;
};

type Sequence = {
	text: string;
	index: number;
	typing: boolean;
	executionCount: number;
};

export default function TypeAnimation({
	className = "",
	wrapper = "span",
	cursor = true,
	textList,
	typeSpeed = 200,
	eraseSpeed = 300,
	repeat = Infinity,
}: TypeAnimationProps) {
	const [display, setDisplay] = useState(false);
	const [currentSequence, setCurrentSequence] = useState<Sequence>({
		text: "",
		index: 0,
		typing: true,
		executionCount: 1,
	});

	if (cursor) className = `${className} cursor-typing`.trim();

	useEffect(() => setDisplay(true), []);

	useEffect(() => {
		const sequenceText = textList[currentSequence.index];

		const typeText = async () => {
			// The text has been fully written out
			if (currentSequence.text.length === sequenceText.length) {
				if (
					currentSequence.index === textList.length - 1 &&
					currentSequence.executionCount >= repeat
				)
					return;

				// Delay by 2 seconds before starting to erase
				await new Promise((r) => setTimeout(r, 2000));

				setCurrentSequence((oldSequence) => ({
					...oldSequence,
					typing: false,
					executionCount:
						oldSequence.index === textList.length - 1
							? oldSequence.executionCount + 1
							: oldSequence.executionCount,
				}));

				return;
			}

			// Add one character to the text
			setCurrentSequence((oldSequence) => ({
				...oldSequence,
				text: oldSequence.text + sequenceText[oldSequence.text.length],
			}));
		};

		const eraseText = () => {
			// The text has been fully erased
			if (currentSequence.text.length === 0) {
				setCurrentSequence((oldSequence) => ({
					text: "",
					index:
						oldSequence.index === textList.length - 1
							? 0
							: oldSequence.index + 1,
					typing: true,
					executionCount: oldSequence.executionCount,
				}));

				return;
			}

			// Delete one character from the text
			setCurrentSequence((oldSequence) => ({
				...oldSequence,
				text: oldSequence.text.substring(
					0,
					oldSequence.text.length - 1
				),
			}));
		};

		const sequenceTimeout = setTimeout(
			async () => {
				if (currentSequence.typing) await typeText();
				else eraseText();
			},
			currentSequence.typing ? typeSpeed : eraseSpeed
		);

		return () => clearTimeout(sequenceTimeout);
	}, [typeSpeed, eraseSpeed, textList, repeat, currentSequence]);

	return display
		? createElement(wrapper, { className }, currentSequence.text)
		: null;
}
