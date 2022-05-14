import { Box, Text } from "@chakra-ui/react";

export default function VoteResults(props) {
  const { image_id, upvotes, totalVotes } = props;

  return (
    <Box width={216}>
      <Text>{image_id}</Text>
      <Text>upvotes: {upvotes}</Text>
      <Text>total votes: {totalVotes}</Text>
    </Box>
  );
}
