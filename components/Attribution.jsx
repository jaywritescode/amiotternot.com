import Image from "next/image";
import pixabay from "../public/pixabay.svg"

export default function Attribution({ user, user_id }) {
  return (
    <>
      <a href={`https://pixabay.com/users/${user}-${user_id}`}>
        {"image by "}
        <Image src={pixabay} alt="pixabay" layout="intrinsic" height={16} width={82} />
        {` user ${user}`}
      </a>
    </>
  );
}
