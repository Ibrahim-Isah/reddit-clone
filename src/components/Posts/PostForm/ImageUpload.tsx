import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import React from 'react';

type Props = {
	selectedFile?: string;
	onSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setSelectedTab: (tab: string) => void;
	setSelectedFile: (file: string) => void;
};

const ImageUpload = ({
	selectedFile,
	onSelectImage,
	setSelectedTab,
	setSelectedFile,
}: Props) => {
	const selectedFileRef = React.useRef<HTMLInputElement>(null);
	return (
		<Flex direction='column' justify='center' align='center' width='100%'>
			{selectedFile ? (
				<>
					<Image
						src={selectedFile}
						alt='uploaded file'
						maxWidth='480px'
						maxHeight='400px'
					/>
					<Stack direction='row' mt={4}>
						<Button height='28px' onClick={() => setSelectedTab('Post')}>
							Back to Post
						</Button>
						<Button
							variant='outline'
							height='28px'
							onClick={() => setSelectedFile('')}
						>
							Remove
						</Button>
					</Stack>
				</>
			) : (
				<Flex
					justify='center'
					align='center'
					p={20}
					border='1px dashed'
					borderColor='gray.200'
					width={'100%'}
					borderRadius={4}
				>
					<Button
						variant='outline'
						height='28px'
						onClick={() => {
							selectedFileRef.current?.click();
						}}
					>
						Upload
					</Button>
					<input
						ref={selectedFileRef}
						type='file'
						onChange={onSelectImage}
						hidden
					/>
				</Flex>
			)}
		</Flex>
	);
};

export default ImageUpload;
