import { useRef } from "react";
import bannerImage from "/banner.png";
import Image from "../general/Image";
import { createImageFormData } from "../../utils/create-form-data";
import { API } from "../../service/API";
import useUserQuery from "../../service/user/useUserQuery";
import LoadingSpinner from "../general/LoadingSpinner";
import useBannerMutation from "../../service/user/useBannerMutation";
import { cn } from "../../utils/helper";

export default function BannerImage() {
  const { updateMutation } = useBannerMutation();
  const { userData, userQuery } = useUserQuery();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenEditor = () => {
    if (!inputRef) return;
    inputRef.current?.click();
  };

  const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileBlob = e.target.files?.[0];
    if (!fileBlob) return;
    const { formData } = createImageFormData(fileBlob);

    updateMutation.mutate(formData);
  };

  const isLoadingImage = updateMutation.isPending || userQuery.isRefetching;

  return (
    <div className="relative h-[25rem]">
      <div
        className={cn(
          "absolute inset-0 bg-[#000000a5] opacity-0 transition-all duration-200 cursor-pointer flex items-center justify-center flex-col",
          !isLoadingImage && "hover:opacity-100"
        )}
        onClick={handleOpenEditor}
      >
        <i className="bx bx-images text-[2.5rem] text-white mb-3"></i>
        <p className="text-white text-xl">+ Change Banner Image</p>
      </div>
      <input
        type="file"
        className="invisible absolute"
        ref={inputRef}
        onChange={handleSelectFile}
      />
      {userData && !isLoadingImage ? (
        <Image
          src={userData.bannerURL || bannerImage}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="bg-black/75 w-full h-full flex items-center justify-center flex-col absolute inset-0">
          <LoadingSpinner size={"md"} />
          <p className="text-white mt-4 text-lg">Loading Image...</p>
        </div>
      )}
    </div>
  );
}
