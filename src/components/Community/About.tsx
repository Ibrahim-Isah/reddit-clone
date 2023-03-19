import {
	Box,
	Button,
	Divider,
	Flex,
	Icon,
	Image,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaReddit } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RiCakeLine } from 'react-icons/ri';
import { useSetRecoilState } from 'recoil';
import { Community, communityState } from '../../atoms/communitiesAtom';
import { auth, firestore, storage } from '../../firebase/clientApp';
import useSelectFile from '../../hooks/useSelectFile';

type Props = {
	communityData: Community;
};

const About = ({ communityData }: Props) => {
	const { selectedFile, onSelectFile } = useSelectFile();
	const selectedFileRef = React.useRef<HTMLInputElement>(null);
	const [user] = useAuthState(auth);
	const [uploadingImage, setUploadingImage] = React.useState<boolean>(false);
	const setCommunityStateValue = useSetRecoilState(communityState);

	const onUpdateImage = async () => {
		if (!selectedFile) return;
		setUploadingImage(true);
		try {
			const imageRef = ref(storage, `communities/${communityData.id}/image`);
			await uploadString(imageRef, selectedFile, 'data_url');
			const downloadURL = await getDownloadURL(imageRef);
			await updateDoc(doc(firestore, 'communities', communityData.id), {
				imageURL: downloadURL,
			});

			setCommunityStateValue((prev) => ({
				...prev,
				currentCommunity: {
					...prev.currentCommunity,
					imageURL: downloadURL,
				} as Community,
			}));

			setUploadingImage(false);
		} catch (err) {
			console.log('onUpdateImage error: ', err);
		}
	};
	return (
		<Box position='sticky' top='14px'>
			<Flex
				justify='space-between'
				align='center'
				bg='blue.400'
				color='white'
				p={3}
				borderRadius='4px 4px 0px 0px'
			>
				<Text fontSize='10pt' fontWeight={700}>
					About Community
				</Text>
				<Icon as={HiOutlineDotsHorizontal} />
			</Flex>
			<Flex direction='column' bg='white' p={3} borderRadius='0px 0px 4px 4px'>
				<Stack>
					<Flex width='100%' fontSize='10pt' p={2} fontWeight={700}>
						<Flex direction='column' flexGrow={1}>
							<Text>{communityData.numberOfMembers.toLocaleString()}</Text>
							<Text>Members</Text>
						</Flex>
						<Flex direction='column' flexGrow={1}>
							<Text>1</Text>
							<Text>Online</Text>
						</Flex>
					</Flex>
					<Divider />
					<Flex
						align='center'
						width='100%'
						p={1}
						fontWeight={500}
						fontSize='10pt'
					>
						<Icon as={RiCakeLine} fontSize={18} mr={2} />
						{communityData.createdAt && (
							<Text>
								Created{' '}
								{moment(
									new Date(communityData.createdAt?.seconds * 1000)
								).format('MMM DD, YYYY')}
							</Text>
						)}
					</Flex>
					<Link href={`/r/${communityData.id}/submit`} passHref>
						<Button mt={3} height='30px' width='100%'>
							Create Post
						</Button>
					</Link>
					{user?.uid === communityData.creatorId && (
						<>
							<Divider />
							<Stack spacing={1} fontSize='10pt'>
								<Text fontWeight={600}>Admin</Text>
								<Flex align='center' justify='space-between'>
									<Text
										color='blue.500'
										cursor='pointer'
										_hover={{
											textDecoration: 'underline',
										}}
										onClick={() => selectedFileRef.current?.click()}
									>
										Change Image
									</Text>
									{communityData.imageURL || selectedFile ? (
										<Image
											src={selectedFile || communityData.imageURL}
											alt='community logo'
											borderRadius={4}
											fontSize='40px'
											boxSize='66px'
										/>
									) : (
										<Icon
											as={FaReddit}
											fontSize={40}
											color='brand.100'
											mr={2}
										/>
									)}
								</Flex>
								{selectedFile &&
									(uploadingImage ? (
										<Spinner />
									) : (
										<Text cursor='pointer' onClick={onUpdateImage}>
											Save Changes
										</Text>
									))}
								<input
									hidden
									type='file'
									accept='image/x-png, image/gif, image/jpeg, image/jpg'
									ref={selectedFileRef}
									onChange={onSelectFile}
								/>
							</Stack>
						</>
					)}
				</Stack>
			</Flex>
		</Box>
	);
};

export default About;
