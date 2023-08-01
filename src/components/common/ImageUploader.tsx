import Image from "next/image";
import uploadIcon from "/public/images/upload.svg";
import { useRef } from "react";
import cancelIcon from "/public/images/cancel.svg";
import { v4 as uuidv4 } from "uuid";

interface ImageObject {
  file: File;
  url: string;
}

interface ImageUploaderProps {
  options: string;
  options2: string;
  selectedImages: File[];
  previewImages: ImageObject[];
  setPreviewImages: React.Dispatch<React.SetStateAction<object[]>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageUploader({
  options,
  options2,
  selectedImages,
  previewImages,
  setPreviewImages,
  setSelectedImages,
}: ImageUploaderProps) {
  const upload = useRef<HTMLInputElement>(null);
  const handleImgClick = () => {
    if (upload.current?.files?.[0]) {
      if (Array.from(upload.current.files).length + previewImages.length > 5) {
        alert("이미지는 다섯개까지 올릴 수 있습니다.");
      } else {
        Array.from(upload.current.files).forEach(file => {
          const url = URL.createObjectURL(file);
          setPreviewImages(prev => [...prev, { file, url }]);
          setSelectedImages(prev => [...prev, file]);
        });
      }
    }
  };

  const deleteImg = (target: { file: File; url: string }) => {
    setPreviewImages(previewImages.filter(item => item.url !== target.url));
    setSelectedImages(selectedImages.filter(file => file !== target.file));
  };

  return (
    <div className={`flex gap-[5px] ${options2}`}>
      <label
        htmlFor="file-uploader"
        className={`w-[63px] ${
          selectedImages.length >= 5 ? "" : "cursor-pointer"
        } ${options}`}
      >
        <Image
          src={uploadIcon}
          alt="upload-image"
          priority={true}
          width={63}
          height={61}
        />
      </label>
      <input
        id="file-uploader"
        type="file"
        accept="image/*"
        ref={upload}
        onChange={handleImgClick}
        multiple
        style={{ display: "none" }}
        disabled={selectedImages.length >= 5 ? true : false}
      />
      <div className="flex gap-[5px]">
        {previewImages.map(item => (
          <div className="relative" key={uuidv4()}>
            <img
              src={item.url}
              alt="selectedImg"
              className="w-[63px] h-[61px] rounded-[10px]"
            />
            <Image
              src={cancelIcon}
              onClick={() => deleteImg(item)}
              alt="cancelIcon"
              className="absolute top-[2px] right-[2px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
