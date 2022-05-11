import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function OtterButton(props) {
  const { id, isOtter } = props;
  const router = useRouter();

  const onClick = async (e) => {
    await fetch(`/api/${id}/vote`, {
      method: 'post',
      body: { isOtter },
    });
    router.push(`/?previousImage=${id}`)
  }

  return (
    <Button size="lg" fontFamily="primary" onClick={onClick}>
      {props.children}
    </Button>
  );
}
