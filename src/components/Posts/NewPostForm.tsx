import { Alert, AlertIcon, Flex, Icon, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import {
	addDoc,
	collection,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import React from 'react';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { Post } from '../../atoms/postsAtom';
import { firestore, storage } from '../../firebase/clientApp';
import ImageUpload from './PostForm/ImageUpload';
import TextInput from './PostForm/TextInput';
import TabItem from './TabItem';

type NewPostFormProps = {
	user: User;
};

const formTabs: TabProps[] = [
	{
		title: 'Post',
		icon: IoDocumentText,
	},
	{
		title: 'Images & Video',
		icon: IoImageOutline,
	},
	{
		title: 'Link',
		icon: BsLink45Deg,
	},
	{
		title: 'Poll',
		icon: BiPoll,
	},
	{
		title: 'Talk',
		icon: BsMic,
	},
];

export type TabProps = {
	title: string;
	icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
	const router = useRouter();
	const [selectedTab, setSelectedTab] = React.useState<string>(
		formTabs[0].title
	);
	const [textInput, setTextInput] = React.useState({
		title: '',
		body: '',
	});
	const [selectedFile, setSelectedFile] = React.useState<string>();
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<boolean>(false);

	const handleCreatePost = async () => {
		const { communityId } = router.query;
		const newPost: Post = {
			communityId: communityId as string,
			creatorId: user.uid,
			creatorDisplayName: user.email!.split('@')[0],
			title: textInput.title,
			body: textInput.body,
			numberOfComments: 0,
			voteStatus: 0,
			createdAt: serverTimestamp() as Timestamp,
		};
		setLoading(true);
		try {
			const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);

			if (selectedFile) {
				const imageRef = ref(storage, `posts/${postDocRef.id}/image`);

				await uploadString(imageRef, selectedFile, 'data_url');
				const downloadURL = await getDownloadURL(imageRef);

				await updateDoc(postDocRef, {
					imageURL: downloadURL,
				});
			}

			router.back();
		} catch (err: any) {
			console.log('Create Post error: ', err);
			setError(true);
		}
		setLoading(false);
	};
	const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();
		if (e.target.files) {
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = (readerEvent) => {
				if (readerEvent.target?.result) {
					setSelectedFile(readerEvent.target.result as string);
				}
			};
			// const file = e.target.files[0];
			// setSelectedFile(URL.createObjectURL(file));
		}
	};
	const onTextChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setTextInput((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<Flex direction='column' bg='white' borderRadius={4} mt={2}>
			<Flex width='100%'>
				{formTabs.map((item: TabProps) => {
					return (
						<TabItem
							key={item.title}
							item={item}
							selected={item.title === selectedTab}
							setSelectedTab={setSelectedTab}
						/>
					);
				})}
			</Flex>
			<Flex p={4}>
				{selectedTab === 'Post' && (
					<TextInput
						textInputs={textInput}
						handleCreatePost={handleCreatePost}
						onChange={onTextChange}
						loading={loading}
					/>
				)}
				{selectedTab === 'Images & Video' && (
					<ImageUpload
						setSelectedFile={setSelectedFile}
						onSelectImage={onSelectImage}
						setSelectedTab={setSelectedTab}
						selectedFile={selectedFile}
					/>
				)}
			</Flex>
			{error && (
				<Alert status='error'>
					<AlertIcon />
					<Text mr={2}>Something went wrong</Text>
				</Alert>
			)}
		</Flex>
	);
};

export default NewPostForm;
