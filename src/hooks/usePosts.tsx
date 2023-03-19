import { collection, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { Post, postState, PostVote } from '../atoms/postsAtom';
import { auth, firestore, storage } from '../firebase/clientApp';

const usePosts = () => {
	const [user] = useAuthState(auth);
	const [postStateValue, setPostStateValue] = useRecoilState(postState);

	const onVote = async (post: Post, vote: number, communityId: string) => {
		try {
			const { voteStatus } = post;
			const existingVote = postStateValue.postVotes.find(
				(vote) => vote.postId === post.id
			);

			const batch = writeBatch(firestore);
			const updatedPost = { ...post };
			const updatedPosts = [...postStateValue.posts];
			let updatedPostVotes = [...postStateValue.postVotes];
			let voteChange = vote;

			if (!existingVote) {
				const postVoteRef = doc(
					collection(firestore, 'users', `${user?.uid}/postVotes`)
				);

				const newVote: PostVote = {
					id: postVoteRef.id,
					postId: post.id!,
					communityId,
					voteValue: vote,
				};

				batch.set(postVoteRef, newVote);

				updatedPost.voteStatus = voteStatus + vote;
				updatedPostVotes = [...updatedPostVotes, newVote];
			} else {
				const postVoteRef = doc(
					firestore,
					'users',
					`${user?.uid}/postVotes/${existingVote.id}`
				);

				if (existingVote.voteValue === vote) {
					updatedPost.voteStatus = voteStatus - vote;
					updatedPostVotes = updatedPostVotes.filter(
						(vote) => vote.id !== existingVote.id
					);

					batch.delete(postVoteRef);
					voteChange *= -1;
					// batch.delete(postVoteRef);
					// voteChange = -vote;
					// updatedPostVotes = updatedPostVotes.filter(
					// 	(vote) => vote.id !== existingVote.id
					// );
				} else {
					updatedPost.voteStatus = voteStatus + 2 * vote;

					const voteIdx = postStateValue.postVotes.findIndex(
						(vote) => vote.id === existingVote.id
					);

					updatedPostVotes[voteIdx] = {
						...existingVote,
						voteValue: vote,
					};

					batch.update(postVoteRef, {
						voteValue: vote,
					});

					voteChange = 2 * vote;
				}
			}

			const postRef = doc(firestore, 'posts', post.id!);
			batch.update(postRef, {
				voteStatus: voteStatus + voteChange,
			});

			await batch.commit();

			const postIdx = postStateValue.posts.findIndex(
				(vote) => vote.id === post.id
			);
			updatedPosts[postIdx] = updatedPost;
			setPostStateValue((prev) => ({
				...prev,
				posts: updatedPosts,
				postVotes: updatedPostVotes,
			}));
		} catch (err: any) {
			console.log('onVote error: ', err);
		}
	};

	const onSelectPost = () => {};

	const onDeletePost = async (post: Post): Promise<boolean> => {
		try {
			// const docRef = doc(firestore, 'posts', post.id);
			// await deleteDoc(docRef);
			if (post.imageURL) {
				const imageRef = ref(storage, `posts/${post.id}/image`);
				await deleteObject(imageRef);
			}

			const postDocRef = doc(firestore, 'posts', post.id!);
			await deleteDoc(postDocRef);

			setPostStateValue((prev) => ({
				...prev,
				posts: prev.posts.filter((item) => item.id !== post.id),
			}));
			return true;
		} catch (err: any) {
			console.log('onDeletePost error: ', err);
			return false;
		}
	};

	return {
		postStateValue,
		setPostStateValue,
		onVote,
		onSelectPost,
		onDeletePost,
	};
};

export default usePosts;
