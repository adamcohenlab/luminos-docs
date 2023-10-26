import Image from "next/image";

function Cards({ children }) {
  return <div className="grid grid-cols-2 gap-2 pt-4 cards">{children}</div>;
}

Cards.Block = ({ children }) => (
  <div className="border rounded-md p-4 dark:border-gray-600 border-gray-200 flex flex-col gap-4 text-xs text-gray-600 dark:text-gray-400 dark:bg-gray-900/25 dark:hover:bg-gray-800/50 bg-gray-100/25 hover:bg-gray-200/50">
    {children}
  </div>
);

Cards.Image = ({ src, alt }) => (
  <div className="relative h-32 overflow-hidden">
    <Image
      priority
      src={src}
      alt={alt}
      fill={true} // This will make the image fill its parent's dimensions
      className="object-cover object-center"
      sizes="100vw"
    />
  </div>
);

export default Cards;
