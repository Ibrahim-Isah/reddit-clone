/* eslint-disable react/no-children-prop */
import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Flex, Stack } from '@chakra-ui/react';

type SearchInputProps = {};

const SearchInput = (props: SearchInputProps) => {
	return (
		<Flex flexGrow={1} mr={2} align='center'>
			<Stack spacing={4} width={'100%'}>
				<InputGroup>
					<InputLeftElement
						pointerEvents='none'
						children={<SearchIcon color='gray.300' mb={1} />}
					/>
					<Input
						type='text'
						placeholder='Search Reddit'
						fontSize='10pt'
						_placeholder={{
							color: 'gray.500',
						}}
						_hover={{
							bg: 'white',
							border: '1px solid',
							borderColor: 'blue.500',
						}}
						_focus={{
							outline: 'none',
							border: '1px solid',
							borderColor: 'blue.500',
						}}
						height='34px'
						bg='gray.50'
					/>
				</InputGroup>
			</Stack>
		</Flex>
	);
};

export default SearchInput;
