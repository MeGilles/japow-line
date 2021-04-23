import { useRef } from 'react';

import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';

import style from './fileInput.module.scss';

type Props = {
    feedBack: any,
    className?: String,
    multiple?: boolean,
}

export default function FileInput({ feedBack, className, multiple = false }: Props) {

    const fileInputRef = useRef(null);

    const openFile = () => {
        fileInputRef.current.click();
    }

    //process selected files to get a preview
    const loadFile = (event: any) => {

        const file: File = event.target.files[0];

        const acceptedFormats = [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "bmp",
        ];

        const parts = file.name.split('.');
        const extension = parts[parts.length - 1];

        if (!acceptedFormats.includes(extension)) {
            feedBack("", "Incorrect file format.");
            return;
        }

        const fr = new FileReader();

        fr.onloadend = () => {
            const url = fr.result;
            feedBack({ src: url });
        }

        fr.onerror = () => {
            feedBack("", fr.error.toString());
        }

        fr.readAsDataURL(file);
    }

    const loadFiles = (event: any) => {

        const files: FileList = event.target.files;
        const processedFiles = [];

        const acceptedFormats = [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "bmp",
        ];

        let filesIndex = 0;

        function readFile(file: File) {

            const parts = file.name.split('.');
            const extension = parts[parts.length - 1];

            if (!acceptedFormats.includes(extension)) {
                feedBack([], "Selection contains unaccepted format (image only)");

                filesIndex++
                if (filesIndex < files.length) {
                    readFile(files[filesIndex]);
                }

                return;
            }

            const fr = new FileReader();

            fr.onloadend = () => {

                const url = fr.result;
                processedFiles.push({ src: url });

                filesIndex++
                if (filesIndex < files.length) {
                    readFile(files[filesIndex]);
                } else {
                    feedBack(processedFiles);
                }

            }

            fr.onerror = () => {
                feedBack([], fr.error.toString());
            }

            fr.readAsDataURL(file)
        }

        readFile(files[filesIndex]);
    }

    return (
        <div className={[style.add_photo, className].join(" ")} onClick={openFile}>
            <PhotoCameraOutlinedIcon fontSize="large" />
            <input className={style.input} type="file" multiple={multiple} ref={fileInputRef} onChange={multiple ? loadFiles : loadFile} />
        </div>
    );
}