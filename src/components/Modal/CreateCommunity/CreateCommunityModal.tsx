import {
	Box,
	Button,
	Checkbox,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	Icon,
} from '@chakra-ui/react';
import React from 'react';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
type Props = {
	open: boolean;
	handleClose: () => void;
};

const CreateCommunityModal = ({ open, handleClose }: Props) => {
	const [communityName, setCommunityName] = React.useState<string>('');
	const [communityType, setCommunityType] = React.useState<
		'public' | 'restricted' | 'private'
	>('public');
	const [charsRemaining, setCharsRemaining] = React.useState<number>(21);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 21) return;
		setCommunityName(e.target.value);
		setCharsRemaining(21 - e.target.value.length);
	};

	const onCommunityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCommunityType(e.target.name as 'public' | 'restricted' | 'private');
	};

	return (
		<>
			<Modal isOpen={open} onClose={handleClose} size='lg'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						display='flex'
						fontSize={15}
						flexDirection='column'
						padding={3}
					>
						Create a Community
					</ModalHeader>
					<Box pl={3} pr={3}>
						<ModalCloseButton />
						<ModalBody display='flex' flexDirection='column' padding='10px 0px'>
							<Text fontSize={15} fontWeight={600}>
								Name
							</Text>
							<Text fontSize={11} color='gray.500'>
								Community names including capitalization cannot be changed.
							</Text>
							<Text
								position='relative'
								top='28px'
								left='10px'
								width='20px'
								color='gray.400'
							>
								r/
							</Text>
							<Input
								position='relative'
								value={communityName}
								size='sm'
								pl='22px'
								onChange={handleChange}
							/>
							<Text
								fontSize={12}
								color={charsRemaining === 0 ? 'red' : 'gray.500'}
							>
								{charsRemaining} Characters remaining
							</Text>
							<Box my={4}>
								<Text fontWeight={600} fontSize={15}>
									Community Type
								</Text>
								<Stack spacing={2}>
									<Checkbox
										name='public'
										isChecked={communityType === 'public'}
										onChange={onCommunityTypeChange}
									>
										<Flex align='center'>
											<Icon as={BsFillPersonFill} color='gray.500' mr={2} />
											<Text fontSize='10pt' mr={1}>
												Public
											</Text>
											<Text fontSize='8pt' color='gray.500' pt={1}>
												Anyone can view and post
											</Text>
										</Flex>
									</Checkbox>
									<Checkbox
										name='restricted'
										isChecked={communityType === 'restricted'}
										onChange={onCommunityTypeChange}
									>
										<Flex align='center'>
											<Icon as={BsFillEyeFill} color='gray.500' mr={2} />

											<Text fontSize='10pt' mr={1}>
												Restricted
											</Text>
											<Text fontSize='8pt' color='gray.500' pt={1}>
												Anyone can view but only approved users can post
											</Text>
										</Flex>
									</Checkbox>
									<Checkbox
										name='private'
										isChecked={communityType === 'private'}
										onChange={onCommunityTypeChange}
									>
										<Flex align='center'>
											<Icon as={RiLockPasswordFill} color='gray.500' mr={2} />

											<Text fontSize='10pt' mr={1}>
												Private
											</Text>
											<Text fontSize='8pt' color='gray.500' pt={1}>
												Only approved users can view and post
											</Text>
										</Flex>
									</Checkbox>
								</Stack>
							</Box>
						</ModalBody>
					</Box>
					<ModalFooter bg='gray.100' borderRadius='0px 0px 10px 10px'>
						<Button
							variant='outline'
							height='30px'
							mr={3}
							onClick={handleClose}
						>
							Cancel
						</Button>
						<Button height='30px' onClick={() => {}}>
							Create Community
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreateCommunityModal;
