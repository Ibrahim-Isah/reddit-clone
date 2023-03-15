import { Stack } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Community } from '../../atoms/communitiesAtom';
import { Post } from '../../atoms/postsAtom';
import { auth, firestore } from '../../firebase/clientApp';
import usePosts from '../../hooks/usePosts';
import PostItem from './PostItem';
import PostLoader from './PostLoader';

type Props = {
	communityData: Community;
};

const Posts = ({ communityData }: Props) => {
	const [user] = useAuthState(auth);
	const [loading, setLoading] = React.useState(false);
	const {
		postStateValue,
		setPostStateValue,
		onVote,
		onDeletePost,
		onSelectPost,
	} = usePosts();

	const getPosts = async () => {
		setLoading(true);
		try {
			const postsQuery = query(
				collection(firestore, 'posts'),
				where('communityId', '==', communityData.id),
				orderBy('createdAt', 'desc')
			);

			const postsDocs = await getDocs(postsQuery);
			const posts = postsDocs.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			setPostStateValue((prev) => ({ ...prev, posts: posts as Post[] }));

			// console.log('posts: ', posts);
		} catch (error: any) {
			console.log('getPosts error: ', error);
		}
		setLoading(false);
	};

	React.useEffect(() => {
		getPosts();
	}, []);
	return (
		<>
			{loading ? (
				<PostLoader />
			) : (
				<Stack>
					{postStateValue.posts.map((post) => (
						<PostItem
							key={post.id}
							post={post}
							onVote={onVote}
							onDeletePost={onDeletePost}
							onSelectPost={onSelectPost}
							userIsCreator={post.creatorId === user?.uid}
							userVoteValue={undefined}
						/>
					))}
				</Stack>
			)}
		</>
	);
};

export default Posts;
