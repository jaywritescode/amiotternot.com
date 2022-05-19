import Image from "next/image";
import otter from "public/otter.png";

export default function MainImage(props) {
  const { image_id, width, height, keyword } = props;

  if (image_id) {
    return (
      <Image
        src={`/pics/image_id.jpg`}
        width={width}
        height={height}
        alt={`${keyword} pic`}
      />
    );
  }

  return <Image src={otter} layout="fill" alt="image from the noun project" />;
}
