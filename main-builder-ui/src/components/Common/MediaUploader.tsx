import React, { useEffect, useState, useRef } from 'react'
import { Button, ButtonGroup, Link } from '@mui/material';

const previewableImages = ["image/png","image/jpg","image/gif", "image/jpeg"];
const previewableVideos = ["application/mp4","video/mp4"];

export const MediaUploader: React.FunctionComponent<{
    accept: string,
    onClose: () => void
    onDrop: (files: FileList) => void,
    onSubmit: (e: any) => void
}> = ({ accept, onDrop, onClose, onSubmit }) => {
    const [dragging, useDragging] = useState(false)
    const [fileAdded, setFileAdded] = useState<boolean>(false)
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>();

    const fileUploadRef = useRef<HTMLInputElement>(null)
    let dragCounter = 0

    useEffect(() => {
        return () => {
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
            if(videoPreviewUrl) {
                URL.revokeObjectURL(videoPreviewUrl);
            }
        }
    }, [])

    const DragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        setImagePreviewUrl(undefined);
        setVideoPreviewUrl(undefined);

        dragCounter++
        const dataTransfer = e.dataTransfer
        useDragging(drag => {
            if (
                dataTransfer &&
                dataTransfer.items &&
                dataTransfer.items.length > 0
            ) {
                return true
            }
            return drag
        })
    }

    const DragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounter--
        useDragging(drag => {
            if (dragCounter !== 0) {
                return false
            }
            return drag
        })
    }

    const DropEventHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        useDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {

            const files = e.dataTransfer.files
            setFileAdded(true)
            onDrop(files)
            //e.dataTransfer.clearData()
            dragCounter = 0

            if(previewableImages.includes(files[0].type)) {
                setImagePreviewUrl(URL.createObjectURL(files[0]));
                //console.log('generatePreview', imagePreviewUrl)
            }
            if(previewableVideos.includes(files[0].type)) {
                setVideoPreviewUrl(URL.createObjectURL(files[0]));
                //console.log('generatePreview', videoPreviewUrl)
            }
        }
    }

    const handleManualUpload = (files: FileList) => {
        setFileAdded(true);

        if(previewableImages.includes(files[0].type)) {
            setImagePreviewUrl(URL.createObjectURL(files[0]));
            //console.log('generatePreview', imagePreviewUrl)
        }
        if(previewableVideos.includes(files[0].type)) {
            setVideoPreviewUrl(URL.createObjectURL(files[0]));
            //console.log('generatePreview', videoPreviewUrl)
        }
    }

    return (
        <div
            onDragOver={e => {
                e.preventDefault()
                e.stopPropagation()
            }}
            onDragEnter={DragEnterHandler}
            onDragLeave={DragLeaveHandler}
            onDrop={DropEventHandler} 
            style={{padding:20}}
        >

            <div style={{
                border: 'dashed grey 4px',
                minHeight: '250px',
                minWidth: '350px',
                display: 'grid',
                justifyContent: 'center',
                alignContent: 'center',
            }}>
                {!fileAdded && !dragging && <>
                    <div>Drag and drop here, or <Link style={{ borderBottom: "1px solid purple", cursor: "pointer" }} onClick={() => fileUploadRef.current?.click()}>Browse</Link></div>
                    <input
                        hidden={true}
                        ref={fileUploadRef}
                        accept={accept}
                        onChange={e => {
                            if (e.target.files) {
                                handleManualUpload(e.target.files);
                                onDrop(e.target.files)
                            }
                        }}
                        type="file"
                        id="myFile"
                        name="filename"
                    />
                </>}
                {imagePreviewUrl &&
                    <div>
                        <img src={imagePreviewUrl} style={{width:"200px"}} alt="" />
                    </div>
                }
                {videoPreviewUrl &&
                    <div>
                        <video controls={true} src={videoPreviewUrl} style={{width:"200px"}}></video>
                    </div>
                }
                {dragging &&
                    <div>
                        <div><b style={{ fontSize: "1.5rem" }}>Drop Here :)</b></div>
                    </div>
                }
            </div>
            <ButtonGroup>
                {!dragging && fileAdded && 
                    <div style={{ textAlign: "center",paddingTop:20 }}>
                        {/* <div><b style={{ fontSize: "1.5rem" }}>File Added</b></div> */}
                        <Button variant="contained" onClick={onSubmit}>Upload</Button>
                    </div>
                }
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
            </ButtonGroup>
        </div>
    )
}