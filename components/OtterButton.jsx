import { Button } from "@chakra-ui/react";

export default function OtterButton(props) {
  return (
    <Button size="lg" fontFamily="primary">{props.children}</Button>
  );
}