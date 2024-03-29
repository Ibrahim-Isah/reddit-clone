import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';
import { communityState } from '../../../atoms/communitiesAtom';
import PageContent from '../../../components/Layout/PageContent';
import NewPostForm from '../../../components/Posts/NewPostForm';
import { auth } from '../../../firebase/clientApp';

type Props = {};

const SubmitPostPage = (props: Props) => {
	const communityStateValue = useRecoilValue(communityState);
	const [user] = useAuthState(auth);

	console.log('Community', communityStateValue);
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
