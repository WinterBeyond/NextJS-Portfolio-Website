import ClientDate from "./client-date";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-between gap-y-2 md:flex-row">
      <span className="text-gray-300">
        &copy; <ClientDate date={new Date()} mode="year" /> Max Wiggedal. All
        Rights Reserved.
      </span>
    </footer>
  );
}
