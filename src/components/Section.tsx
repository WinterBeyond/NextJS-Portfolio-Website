import { ReactNode } from "react";

type SectionProps = {
  heading?: ReactNode;
  shortHeading?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  center?: boolean;
};

export default function Section({
  heading,
  shortHeading,
  description,
  children,
  center,
}: SectionProps) {
  return (
    <section
      className={`flex ${center ? "" : "group/section lg:even:justify-end"}`}
    >
      <div
        className={`flex ${
          center ? "items-center justify-center" : ""
        } w-full flex-col gap-y-4`}
      >
        <div
          className={`flex flex-col gap-y-4 ${
            center ? "" : "lg:group-even/section:text-right"
          }`}
        >
          {heading && (
            <>
              {shortHeading ? (
                <>
                  <h1
                    className={`${
                      center ? "text-center" : ""
                    } hidden text-6xl font-bold text-white md:block`}
                    tabIndex={0}
                  >
                    {heading}
                  </h1>
                  <h1
                    className={`${
                      center ? "text-center" : ""
                    } text-6xl font-bold text-white md:hidden`}
                    tabIndex={0}
                  >
                    {shortHeading}
                  </h1>
                </>
              ) : (
                <h2
                  className={`${
                    center ? "text-center" : ""
                  } text-6xl font-bold text-white`}
                  tabIndex={0}
                >
                  {heading}
                </h2>
              )}
            </>
          )}
          {description && (
            <p
              className={`max-w-3xl text-justify text-xl text-gray-200 ${
                center
                  ? ""
                  : "lg:group-even/section:ml-auto lg:group-even/section:text-right"
              } font-semibold`}
              tabIndex={0}
            >
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
