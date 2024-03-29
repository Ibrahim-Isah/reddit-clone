import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { FaReddit } from 'react-icons/fa';
import { Community } from '../../atoms/communitiesAtom';
import useCommunityData from '../../hooks/useCommunityData';

type HeaderProps = {
	communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
	const {
		communityStateValue,
		joinCommunity,
		leaveCommunity,
		onJoinOrLeaveCommunity,
		loading,
	} = useCommunityData();
	const isJoined = !!communityStateValue.mySnippets.find(
		(community) => community.communityId === communityData.id
	);

	return (
		<Flex direction='column' height='146px' width='100%'>
			<Box height='50%' bg='blue.400' />
			<Flex justify='center' bg='white' flexGrow={1}>
				<Flex width='95%' maxWidth='860px'>
					{communityStateValue.currentCommunity?.imageURL ? (
						// eslint-disable-next-line jsx-a11y/alt-text
						<Image
							src={communityStateValue.currentCommunity?.imageURL}
							borderRadius='full'
							boxSize='66px'
							alt='Community Logo'
							position='relative'
							top={-3}
							border='4px solid white'
							color='blue.400'
						/>
					) : (
						<Icon
							as={FaReddit}
							fontSize={64}
							position='relative'
							top={-3}
							color='blue.500'
							border='4px solid white'
							borderRadius='50%'
						/>
					)}
					<Flex padding='10px 16px'>
						<Flex direction='column' mr={6}>
							<Text fontWeight={800} fontSize='16pt'>
								{communityData.id}
							</Text>
							<Text fontWeight={600} fontSize='10pt' color='gray.400'>
								{communityData.id}
							</Text>
						</Flex>
						<Button
							variant={isJoined ? 'outline' : 'solid'}
							height='30px'
							pr={4}
							pl={6}
							isLoading={loading}
							onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
						>
							{isJoined ? 'Joined' : 'Join'}
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Header;
