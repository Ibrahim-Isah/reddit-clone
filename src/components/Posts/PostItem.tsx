import React, { useState } from 'react';
import {
	Alert,
	AlertIcon,
	Flex,
	Icon,
	Image,
	Skeleton,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import moment from 'moment';
import { NextRouter } from 'next/router';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsChat, BsDot } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';
import {
	IoArrowDownCircleOutline,
	IoArrowDownCircleSharp,
	IoArrowRedoOutline,
	IoArrowUpCircleOutline,
	IoArrowUpCircleSharp,
	IoBookmarkOutline,
} from 'react-icons/io5';
import { Post } from '../../atoms/postsAtom';
import Link from 'next/link';

type Props = {
	post: Post;
	userIsCreator: boolean;
	userVoteValue?: number;
	onVote: (post: Post, vote: number, communityId: string) => void;
	onSelectPost: () => void;
	onDeletePost: (post: Post) => Promise<boolean>;
};

const PostItem = ({
	post,
	userIsCreator,
	userVoteValue,
	onVote,
	onSelectPost,
	onDeletePost,
}: Props) => {
	const [loadingImage, setLoadingImage] = useState(true);
	const [loadingDelete, setLoadingDelete] = useState(false);
	const [error, setError] = useState(false);

	const handleDelete = async () => {
		setLoadingDelete(true);
		try {
			const success = await onDeletePost(post);

			if (!success) {
				throw new Error('Cant delete post');
			}

			console.log('Post deleted successfully');
		} catch (err: any) {
			console.log('handleDelete error: ', err);
			setError(err.message);
		}
		setLoadingDelete(false);
	};
	return (
		<Flex
			border='1px solid'
			borderColor='gray.300'
			borderRadius={4}
			bg='white'
			_hover={{
				borderColor: 'gray.500',
			}}
			cursor='pointer'
			onClick={onSelectPost}
		>
			<Flex
				direction='column'
				align='center'
				bg='gray.100'
				p={2}
				width='40px'
				borderRadius={4}
			>
				<Icon
					as={
						userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
					}
					color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
					fontSize={22}
					onClick={() => onVote(post, 1, post.communityId)}
					cursor='pointer'
				/>
				<Text fontSize='9pt'>{post.voteStatus}</Text>
				<Icon
					as={
						userVoteValue === -1
							? IoArrowDownCircleSharp
							: IoArrowDownCircleOutline
					}
					color={userVoteValue === -1 ? '#4379ff' : 'gray.400'}
					fontSize={22}
					cursor='pointer'
					onClick={() => onVote(post, -1, post.communityId)}
				/>
			</Flex>
			<Flex direction='column' width='100%'>
				{error && (
					<Alert status='error'>
						<AlertIcon />
						<Text mr={2}>{error}</Text>
					</Alert>
				)}
				<Stack spacing={1} padding='10px'>
					<Stack direction='row' spacing={0.6} align='center' fontSize='9pt'>
						{/* Home Page Check */}
						<Text>
							Posted by u/{post.creatorDisplayName}{' '}
							{moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
						</Text>
					</Stack>

					<Text fontSize='12pt' fontWeight={600}>
						{post.title}
					</Text>
					<Text fontSize='10pt'>{post.body}</Text>
					{post.imageURL && (
						<Flex justify='center' align='center' p={2}>
							{loadingImage && (
								<Skeleton height='260px' width='100%' borderRadius={4} />
							)}
							<Image
								src={post.imageURL}
								display={loadingImage ? 'none' : 'unset'}
								maxHeight='460px'
								alt='Post Image'
								onLoad={() => setLoadingImage(false)}
							/>
						</Flex>
					)}
				</Stack>
				<Flex ml={1} mb={0.5} color='gray.500'>
					<Flex
						align='center'
						p='8px 10px'
						borderRadius={4}
						_hover={{
							bg: 'gray.200',
						}}
						cursor='pointer'
					>
						<Icon as={BsChat} mr={2} />
						<Text fontSize='9pt'>{post.numberOfComments}</Text>
					</Flex>
					<Flex
						align='center'
						p='8px 10px'
						borderRadius={4}
						_hover={{
							bg: 'gray.200',
						}}
						cursor='pointer'
					>
						<Icon as={IoArrowRedoOutline} mr={2} />
						<Text fontSize='9pt'>Share</Text>
					</Flex>
					<Flex
						align='center'
						p='8px 10px'
						borderRadius={4}
						_hover={{
							bg: 'gray.200',
						}}
						cursor='pointer'
					>
						<Icon as={IoBookmarkOutline} mr={2} />
						<Text fontSize='9pt'>Save</Text>
					</Flex>
					{userIsCreator && (
						<Flex
							align='center'
							p='8px 10px'
							borderRadius={4}
							_hover={{
								bg: 'gray.200',
							}}
							cursor='pointer'
							onClick={handleDelete}
						>
							{loadingDelete ? (
								<Spinner size='sm' />
							) : (
								<>
									<Icon as={AiOutlineDelete} mr={2} />
									<Text fontSize='9pt'>Delete</Text>
								</>
							)}
						</Flex>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default PostItem;
