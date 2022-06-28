import constants from "@/constants/index";
import Image from "next/image";
import TypeAnimation from "@/components/TypeAnimation";

const Hero = () => {
	return (
		<section className="flex flex-wrap pb-14 lg:flex-row justify-center items-start overflow-hidden">
			<div className="flex justify-center lg:hidden">
				<div className="w-3/4">
					<Image
						src={constants.avatar}
						alt="avatar"
						width={512}
						height={512}
						className="shadow"
					/>
				</div>
			</div>
			<div className="w-full md:w-1/2 mx-auto text-center md:text-left text-gray-800 dark:text-gray-200 lg:p-20">
				<h1 className="text-4xl md:text-8xl font-bold my-2 text-inherit">
					{constants.realname}
				</h1>
				<TypeAnimation
					textList={["Developer.", "Innovator.", "Tech Enthusiast."]}
					typeSpeed={100}
					eraseSpeed={150}
					wrapper="h2"
					className="text-3xl md:text-7xl font-bold my-2 text-inherit"
				/>
			</div>
			<div className="hidden lg:flex w-full md:w-1/2 -mr-40 mt-20">
				<div className="w-3/4 ">
					<Image
						src={constants.avatar}
						alt="avatar"
						width={512}
						height={512}
						className="shadow"
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
