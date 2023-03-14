import { Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import TextInput from './PostForm/TextInput';
import TabItem from './TabItem';

type NewPostFormProps = {};

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

const NewPostForm: React.FC<NewPostFormProps> = () => {
	const [selectedTab, setSelectedTab] = React.useState<string>(
		formTabs[0].title
	);
	const [textInput, setTextInput] = React.useState({
		title: '',
		body: '',
	});
	const [selectedFile, setSelectedFile] = React.useState<string>();
	const [loading, setLoading] = React.useState<boolean>(false);

	const handleCreatePost = async () => {};
	const onSelectedImage = () => {};
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
			</Flex>
		</Flex>
	);
};

export default NewPostForm;
