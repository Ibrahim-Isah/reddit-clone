import { Flex, Icon, Input } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../atoms/authModalAtom';
import { FaReddit } from 'react-icons/fa';
import { IoImageOutline } from 'react-icons/io5';
import { BsLink45Deg } from 'react-icons/bs';

const CreatePostLink = () => {
	const router = useRouter();
	const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);

	const onClick = () => {
		if (!user) setAuthModalState({ open: true, view: 'login' });

		const { communityId } = router.query;
		router.push(`/r/${communityId}/submit`);
	};

	return (
		<Flex
			justify='space-evenly'
			align='center'
			bg='white'
			height='56px'
			borderRadius={4}
			border='1px solid'
			borderColor='gray.300'
			cursor='pointer'
			p={2}
			mb={4}
		>
			<Icon as={FaReddit} fontSize={36} color='gray.300' mr={4} />
			<Input
				placeholder='Create Post'
				fontSize='10pt'
				_placeholder={{ color: 'gray.500' }}
				_hover={{
					bg: 'white',
					border: '1px solid',
					borderColor: 'blue.500',
				}}
				_focus={{
					outline: 'none',
					bg: 'white',
					border: '1px solid',
					borderColor: 'blue.500',
				}}
				bg='gray.50'
				borderColor='gray.200'
				height='36px'
				borderRadius={4}
				mr={4}
				onClick={onClick}
			/>
			<Icon
				as={IoImageOutline}
				fontSize={24}
				mr={4}
				color='gray.400'
				cursor='pointer'
			/>
			<Icon as={BsLink45Deg} fontSize={24} color='gray.400' cursor='pointer' />
		</Flex>
	);
};

export default CreatePostLink;
