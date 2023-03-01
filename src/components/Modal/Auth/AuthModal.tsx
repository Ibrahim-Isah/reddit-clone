import {
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { auth } from '../../../firebase/clientApp';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import ResetPassword from './ResetPassword';

const AuthModal = () => {
	const [modalState, setModalState] = useRecoilState(authModalState);
	const [user, loading, error] = useAuthState(auth);
	const handleClose = () => {
		setModalState((prev) => ({ ...prev, open: false }));
	};

	useEffect(() => {
		if (user) {
			handleClose();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	return (
		<>
			<Modal isOpen={modalState.open} onClose={handleClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign={'center'}>
						{modalState.view === 'login'
							? 'Log In'
							: modalState.view === 'signup'
							? 'Sign Up'
							: 'Reset Password'}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display='flex'
						flexDirection='column'
						alignItems={'center'}
						justifyContent='center'
						pb={3}
					>
						{modalState.view === 'login' || modalState.view === 'signup' ? (
							<>
								<Flex
									direction={'column'}
									align='center'
									justify={'center'}
									width='70%'
								>
									<OAuthButtons />
									<Text color='gray.500' fontWeight={700}>
										OR
									</Text>
									<AuthInputs />
								</Flex>
							</>
						) : (
							<ResetPassword />
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AuthModal;
