import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PageContent from '../../../components/Layout/PageContent';
import NewPostForm from '../../../components/Posts/NewPostForm';
import { auth } from '../../../firebase/clientApp';

type Props = {};

const SubmitPostPage = (props: Props) => {
	const [user] = useAuthState(auth);
	return (
		<PageContent>
			<>
				<Box p='14px 0px' borderBottom='1px solid' borderColor='white'>
					<Text>Create a post</Text>
					{user && <NewPostForm user={user} />}
				</Box>
			</>
			<></>
		</PageContent>
	);
};

export default SubmitPostPage;
