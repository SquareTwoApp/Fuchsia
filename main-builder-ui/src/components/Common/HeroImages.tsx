import React, { useEffect, useState } from 'react';
import { Dialog, IconButton, Modal, MenuItem, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useListHeroImagesQuery, useCreateHeroImageMutation } from '../../generated/graphql';
import { MediaUploader } from './MediaUploader';

export const HeroImages: React.FunctionComponent<{
    selected?: string,
    onSelect?: (value: any) => void
}> = ({selected, onSelect}) => {
    const { data: heroImages, loading: heroImagesLoading, error: heroImagesError, refetch: refetchHeroImages } = useListHeroImagesQuery();
    const [uploadImage, { data: uploadResponse, loading: uploadLoading, error: uploadError }] = useCreateHeroImageMutation();
    const [selectedValue, setSelectedValue] = useState<string>(selected || "");

    const handleUpload = (file: File) => {
        uploadImage({
            variables: {
                image: file
            }
        }).then(resp => {
            if(resp && resp.data && resp.data.createHeroImage) {
                refetchHeroImages().then(refetchResponse => {
                    setSelectedValue(resp.data?.createHeroImage._id);
                })
            }
        }).catch(error => {
            alert('Upload Error: ' + error.message);
        });
    }

    const handleChange = (e: any) => {
        if(onSelect) {
            onSelect(e);
        }
    }

    return (heroImagesLoading ?
        <div>Loading...</div>
        :
        <CustomItemSelector 
            data={(heroImages && heroImages.listHeroImages ? heroImages.listHeroImages : [])} 
            selected={selectedValue} 
            onChange={handleChange} 
            allowUpload={true}
            onUpload={handleUpload}
        />
    );
}

export const CustomItemSelector: React.FunctionComponent<{
    data: any[],
    selected?: string,
    onChange: (value: any) => void,
    allowUpload?: boolean,
    onUpload?: (file: File) => void
}> = ({ onChange, data, selected, allowUpload = true, onUpload }) => {

    const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
    const [uploadFile, setUploadFile] = useState<File>();
    const [selectedFile, setSelectedFile] = useState<string>('');

    useEffect(() => {
        if(selected) {
            setSelectedFile(selected);
        }
    }, [selected]);

    const handleSelectItem = (e: any) => {
        const value = e.target.value;
        if (value === "add-new") {
            setShowUploadModal(true);
            return;
        }
        setSelectedFile(value);
        onChange(value);
    }

    const handleUploadComplete = (e: any) => {
        setSelectedFile("new-image");
        setShowUploadModal(false);
        if(onUpload && uploadFile) {
            onUpload(uploadFile)
        }
    }

    const handleClose = () => {
        setShowUploadModal(false);
    }

    return <>
        <Select
            variant="outlined"
            fullWidth
            id="image"
            labelId="select-img-label"
            label="Image"
            onChange={handleSelectItem}
            value={selectedFile ? selectedFile : ''}
            renderValue={(selected) => {
                return <img
                    alt=""
                    src={(data.find((img) => img._id === selected)?.path)}
                    style={{
                        height: "50px",
                        width: "75px",
                        objectFit: "contain",
                    }}
                />
            }}
        >
            {data.length > 0 ? 
                data.map(
                    (image: { _id: string; path: string }) => (
                        <MenuItem key={image._id} value={image._id}>
                            <img
                                alt=""
                                src={image.path} 
                                style={{
                                    height: "50px",
                                    width: "75px",
                                    objectFit: "contain",
                                }}
                            />
                        </MenuItem>
                    )
                )
                :
                <MenuItem key={"no-image"} value={""}>
                    <div>None</div>
                </MenuItem>
            }
            {allowUpload &&
                <MenuItem key={"upload-hero-image"} value="add-new">
                    <IconButton size="large">
                        <AddIcon />
                    </IconButton>
                </MenuItem>
            }
        </Select>
        {allowUpload &&
            <Dialog open={showUploadModal}>
                <MediaUploader
                    accept={"image/jpg,image/jpeg,image/gif,image/png"}
                    onDrop={(files: FileList) => {
                        setUploadFile(files[0]);
                    }}
                    onSubmit={handleUploadComplete}
                    onClose={handleClose} 
                />
            </Dialog>
        }
    </>;
}