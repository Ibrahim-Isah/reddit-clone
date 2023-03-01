import { Button, Flex } from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';
import { auth } from '../../../firebase/clientApp';
import AuthModal from '../../Modal/Auth/AuthModal';
import AuthButtons from './AuthButtons';
import ActionIcons from './Icons';

type RightContentProps = {
	user?: User | null;
};

const RightContent = (props: RightContentProps) => {
	const { user } = props;
	return (
		<>
			<AuthModal />
			<Flex justify='center' align='center'>
				{user ? <ActionIcons /> : <AuthButtons />}
			</Flex>
		</>
	);
};

export default RightContent;
