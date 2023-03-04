import { Flex, MenuItem, Icon } from '@chakra-ui/react';
import React from 'react';
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal';
import { GrAdd } from 'react-icons/gr';
type Props = {};

const Communities = (props: Props) => {
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<CreateCommunityModal open={open} handleClose={handleClose} />
			<MenuItem
				width={'100%'}
				fontSize='9pt'
				_hover={{
					bg: 'gray.100',
				}}
				onClick={() => setOpen(true)}
			>
				<Flex align='center'>
					<Icon as={GrAdd} fontSize={20} mr={2} />
					Create Community
				</Flex>
			</MenuItem>
		</>
	);
};

export default Communities;
