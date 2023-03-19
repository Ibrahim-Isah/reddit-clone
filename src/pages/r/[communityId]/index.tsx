import { Flex } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { Community, communityState } from '../../../atoms/communitiesAtom';
import { firestore } from '../../../firebase/clientApp';
import safeJsonStringify from 'safe-json-stringify';
import CommunityNotFound from '../../../components/Community/NotFound';
import Header from '../../../components/Community/Header';
import PageContent from '../../../components/Layout/PageContent';
import CreatePostLink from '../../../components/Community/CreatePostLink';
import Posts from '../../../components/Posts/Posts';
import { useSetRecoilState } from 'recoil';
import About from '../../../components/Community/About';

type Props = {
	communityData: Community;
};

const CommunityPage = ({ communityData }: Props) => {
	const setCommunityStateValue = useSetRecoilState(communityState);
	if (!communityData) return <CommunityNotFound />;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		setCommunityStateValue((prev) => ({
			...prev,
			currentCommunity: communityData,
		}));
	}, []);
	return (
		<>
			<Header communityData={communityData} />
			<PageContent>
				<>
					<CreatePostLink />
					<Posts communityData={communityData} />
				</>
				<>
					<About communityData={communityData} />
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
