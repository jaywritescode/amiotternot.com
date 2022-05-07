import Image from "next/image";

export default function Attribution({ user, user_id }) {
  return (
    <>
      <a href={`https://pixabay.com/users/${user}-${user_id}`}>
        {"image by "}
        <Image src="/pixabay.svg" alt="pixabay" height={16} width={30} />
        {` user ${user}`}
      </a>
    </>
  );
}
