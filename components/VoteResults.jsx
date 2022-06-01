import { Box, Progress, Stat, StatLabel } from "@chakra-ui/react";
import Image from "next/image";

export default function VoteResults(props) {
  const { id: image_id, upvotes, totalVotes, width, height, keyword } = props;
  const percent = upvotes / totalVotes;

  return (
    <Box width={222}>
      <Image
        src={`/pics/${image_id}.jpg`}
        width={222}
        height={(height * 222) / width}
        alt={`${keyword} photo`}
      />
      <Stat>
        {/* <StatLabel>{`The internet has decided! This ${keyword} ${percent >= 0.5 ? "is" : "is not"} otter!`}</StatLabel> */}
        <Progress value={percent * 100}></Progress>
        <StatLabel>{`${upvotes} out of ${totalVotes} total votes`}</StatLabel>
      </Stat>
    </Box>
  );
}
