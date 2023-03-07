import { Flex } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { Community } from '../../../atoms/communitiesAtom';
import { firestore } from '../../../firebase/clientApp';
import safeJsonStringify from 'safe-json-stringify';

type Props = {
	communityData: Community;
};

const CommunityPage = ({ communityData }: Props) => {
	if (!communityData)
		return (
			<>
				<div>Community not exist</div>
			</>
		);
	return (
		<>
			<Flex>
				<h1>{communityData.id}</h1>
			</Flex>
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
