import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react';
import { useRecoilState } from 'recoil';
import { Post, postState } from '../atoms/postsAtom';
import { firestore, storage } from '../firebase/clientApp';

const usePosts = () => {
	const [postStateValue, setPostStateValue] = useRecoilState(postState);

	const onVote = async () => {};

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
