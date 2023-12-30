import { Button, Flex } from 'antd';
import axios from 'axios';
import { useState } from 'react';

interface IProps {
    onChange?: (e: any) => void;
    fileType: string
}
export const UploadWidget = ({ fileType, onChange }: IProps) => {
    const [profileImage, setProfileImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const upload_preset = import.meta.env.VITE_UPLOAD_PRESET
    const handleChange = (e) => {
        setProfileImage(e.target.files[0])
    };

    const UploadImage = async e => {
        e.preventDefault();
        setIsLoading(true)

        try {
            const file = new FormData()
            file.append("file", profileImage)
            file.append("cloud_name", "blog-creative")
            file.append("upload_preset", upload_preset)

            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/blog-creative/image/upload",
                file
            )
            const res = response.data.url
            onChange(res)
            setIsLoading((false))
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    };

    return (
        <Flex gap='large' justify='center'>
            {isLoading ? ("Uploading...") : (
                <Button onClick={UploadImage}>Upload</Button>
            )}
            <input type='file' accept={`${fileType}/*`} name="file" onChange={handleChange} />
        </Flex>

    );
};
