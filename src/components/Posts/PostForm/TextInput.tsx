import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import React from 'react';

type Props = {
	textInputs: {
		title: string;
		body: string;
	};
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	handleCreatePost: () => void;
	loading: boolean;
};

const TextInput = ({
	textInputs,
	onChange,

	handleCreatePost,
	loading,
}: Props) => {
	return (
		<Stack spacing={3} width='100%'>
			<Input
				name='title'
				value={textInputs.title}
				onChange={onChange}
				fontSize='10pt'
				borderRadius={4}
				placeholder='Title'
				_placeholder={{
					color: 'gray.500',
				}}
				_focus={{
					outline: 'none',
					bg: 'white',
					border: '1px solid',
					borderColor: 'black',
				}}
			/>
			<Textarea
				name='body'
				value={textInputs.body}
				onChange={onChange}
				height='100px'
				fontSize='10pt'
				borderRadius={4}
				placeholder='Text (optional)'
				_placeholder={{
					color: 'gray.500',
				}}
				_focus={{
					outline: 'none',
					bg: 'white',
					border: '1px solid',
					borderColor: 'black',
				}}
			/>
			<Flex justify='flex-end'>
				<Button
					height='34px'
					padding='0px 30px'
					disabled={!textInputs.title}
					onClick={handleCreatePost}
					isLoading={loading}
				>
					{' '}
					Posts
				</Button>
			</Flex>
		</Stack>
	);
};

export default TextInput;
