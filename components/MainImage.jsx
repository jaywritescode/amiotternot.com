import Image from "next/image";
import otter from "../public/otter.png";

export default function MainImage(props) {
  const { image_id, width, height, keyword } = props;

  const is_landscape = width >= height;

  let rendered_width, rendered_height;
  if (is_landscape) {
    rendered_width = 640;
    rendered_height = height * 640 / width;
  }
  else {
    rendered_height = 480;
    rendered_width = width * 480 / height;
  }

  if (image_id) {
    return (
      <Image
        src={`/pics/${image_id}.jpg`}
        width={rendered_width}
        height={rendered_height}
        alt={`${keyword} pic`}
      />
    );
  }

  return <Image src={otter} layout="fill" alt="image from the noun project" />;
}
