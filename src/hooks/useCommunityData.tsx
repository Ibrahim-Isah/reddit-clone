import {
	collection,
	doc,
	getDocs,
	increment,
	writeBatch,
} from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authModalState } from '../atoms/authModalAtom';
import {
	Community,
	CommunitySnippet,
	communityState,
} from '../atoms/communitiesAtom';
import { auth, firestore } from '../firebase/clientApp';

const useCommunityData = () => {
	const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [communityStateValue, setCommunityStateValue] =
		useRecoilState(communityState);

	const onJoinOrLeaveCommunity = (
		communityData: Community,
		isJoined: boolean
	) => {
		if (!user) {
			setAuthModalState({
				open: true,
				view: 'login',
			});
			return;
		}

		setLoading(true);
		if (isJoined) {
			leaveCommunity(communityData.id);
			return;
		}
		joinCommunity(communityData);
	};

	const getMySnippets = async () => {
		setLoading(true);
		try {
			const snippetDocs = await getDocs(
				collection(firestore, `users/${user?.uid}/communitySnippets`)
			);
			const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));

			setCommunityStateValue((prev) => ({
				...prev,
				mySnippets: snippets as CommunitySnippet[],
			}));
			setLoading(false);
		} catch (error: any) {
			console.log('getMySnippets Error', error);
			setError(error.message);
		}
	};
	const joinCommunity = async (communityData: Community) => {
		try {
			const batch = writeBatch(firestore);

			const newSnippet: CommunitySnippet = {
				communityId: communityData.id,
				imageURL: communityData.imageURL || '',
			};

			batch.set(
				doc(
					firestore,
					`users/${user?.uid}/communitySnippets`,
					communityData.id
				),
				newSnippet
			);

			batch.update(doc(firestore, 'communities', communityData.id), {
				numberOfMembers: increment(1),
			});

			await batch.commit();

			setCommunityStateValue((prev) => ({
				...prev,
				mySnippets: [...prev.mySnippets, newSnippet],
			}));
			setLoading(false);
		} catch (error: any) {
			console.log('joinCommunity Error', error);
			setError(error.message);
		}
	};
	const leaveCommunity = async (communityId: string) => {
		try {
			const batch = writeBatch(firestore);

			batch.delete(
				doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
			);

			batch.update(doc(firestore, 'communities', communityId), {
				numberOfMembers: increment(-1),
			});

			await batch.commit();

			setCommunityStateValue((prev) => ({
				...prev,
				mySnippets: prev.mySnippets.filter(
					(item) => item.communityId !== communityId
				),
			}));
			setLoading(false);
		} catch (error: any) {
			console.log('leave Community Error', error);
			setError(error.message);
		}
	};

	React.useEffect(() => {
		if (!user) return;
		getMySnippets();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	return {
		communityStateValue,
		joinCommunity,
		leaveCommunity,
		onJoinOrLeaveCommunity,
		loading,
	};
};

export default useCommunityData;
