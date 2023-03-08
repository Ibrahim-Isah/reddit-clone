import { Flex, Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const CommunityNotFound = () => {
	return (
		<Flex
			direction='column'
			alignItems='center'
			justifyContent='center'
			minHeight='60vh'
		>
			Sorry, that community does not exist or has been banned.
			<Link href='/'>
				<Button mt={4}>GO HOME</Button>
			</Link>
		</Flex>
	);
};

export default CommunityNotFound;
