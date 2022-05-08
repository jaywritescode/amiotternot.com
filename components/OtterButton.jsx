import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function OtterButton(props) {
  const { id, isOtter } = props;

  return (
    <Button size="lg" fontFamily="primary">
      <Link href={`/?id=${id}&otter=${isOtter}`}>
        {props.children}
      </Link>
    </Button>
  );
}
