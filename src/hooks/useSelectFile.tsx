import React from 'react';

const useSelectFile = () => {
	const [selectedFile, setSelectedFile] = React.useState<string>();

	const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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

	return { selectedFile, onSelectFile, setSelectedFile };
};

export default useSelectFile;
