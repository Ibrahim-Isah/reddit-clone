import { Flex } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { Community } from '../../../atoms/communitiesAtom';
import { firestore } from '../../../firebase/clientApp';
import safeJsonStringify from 'safe-json-stringify';
import CommunityNotFound from '../../../components/Community/NotFound';
import Header from '../../../components/Community/Header';
import PageContent from '../../../components/Layout/PageContent';
import CreatePostLink from '../../../components/Community/CreatePostLink';

type Props = {
	communityData: Community;
};

const CommunityPage = ({ communityData }: Props) => {
	if (!communityData) return <CommunityNotFound />;
	return (
		<>
			<Header communityData={communityData} />
			<PageContent>
				<>
					<CreatePostLink />
				</>
				<>
					<div>RHS</div>
				</>
			</PageContent>
		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query } = context;
	const { communityId } = query;

	try {
		const communityRef = doc(firestore, 'communities', communityId as string);
		const communityDoc = await getDoc(communityRef);

		return {
			props: {
				communityData: communityDoc.exists()
					? JSON.parse(
							safeJsonStringify({
								id: communityDoc.id,
								...communityDoc.data(),
							})
					  )
					: '',
			},
		};
	} catch (error) {
		// could add error ppage
		console.log('get Server Side Errors', error);
	}
}

export default CommunityPage;
