import { Box, Progress, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function VoteResults(props) {
  const { image_id, upvotes, totalVotes, width, height, keyword } = props;
  const percent = upvotes / totalVotes;

  return (
    <Box width={222}>
      <Image
        src={`/pics/${image_id}.jpg`}
        width={222}
        height={height * 222 / width}
        alt={`photo of a ${keyword}`}
      />
      <Stat>
        <StatLabel>{`The internet has decided! This ${keyword} ${percent >= 0.5 ? "is" : "is not"} otter!`}</StatLabel>
        <Progress value={percent * 100}></Progress>
        <StatNumber>{`${upvotes} out of ${totalVotes} total votes`}</StatNumber>
      </Stat>
    </Box>
  );
}
