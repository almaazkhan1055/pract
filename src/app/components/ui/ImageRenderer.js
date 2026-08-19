import Image from "next/image";

const ImageRenderer = ({ product }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        height: "250px",
        width: "250px",
      }}
      className="img"
    >
      <Image
        src={product?.images[0]}
        alt={product.name}
        height={250}
        width={250}
      />
    </div>
  );
};
export default ImageRenderer;
