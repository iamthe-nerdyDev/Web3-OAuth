import { useContext, useEffect, useState } from "react";
import StateContext from "@/utils/context/StateContext";
import { IImagePicker } from "@/interface";
import { ChevronRight, Close, LoaderIcon } from "@/icons";
import { toast } from "react-toastify";

import "./ImageGenerator.css";
import axiosInstance from "@/utils/axiosInstance";

const ImagePicker = ({
  displayModal,
  setDisplayModal,
  setSelectedURL,
}: Omit<IImagePicker, "selectedURL">) => {
  const { theme } = useContext(StateContext)!;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  //images...
  const [imageOne, setImageOne] = useState<string>();
  const [imageTwo, setImageTwo] = useState<string>();
  const [imageThree, setImageThree] = useState<string>();
  const [imageFour, setImageFour] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState<1 | 2 | 3 | 4>();

  const cropImages = (data: Blob | MediaSource) => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = URL.createObjectURL(data);

    image.onload = () => {
      // first image (top-left)
      ctx?.drawImage(image, 0, 0, 512, 512, 0, 0, 512, 512);
      setImageOne(canvas.toDataURL("image/png"));

      // clear canvas
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      // second image (top-right)
      ctx?.drawImage(image, 512, 0, 512, 512, 0, 0, 512, 512);
      setImageTwo(canvas.toDataURL("image/png"));

      //clear canvas
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      // third image (bottom-left)
      ctx?.drawImage(image, 0, 512, 512, 512, 0, 0, 512, 512);
      setImageThree(canvas.toDataURL("image/png"));

      // clear canvas
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      // fourth image (bottom-right)
      ctx?.drawImage(image, 512, 512, 512, 512, 0, 0, 512, 512);
      setImageFour(canvas.toDataURL("image/png"));

      // clear canvas
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    };
  };

  const clearImages = () => {
    setImageOne(undefined);
    setImageTwo(undefined);
    setImageThree(undefined);
    setImageFour(undefined);
  };

  const generateImages = async () => {
    if (isLoading) return;

    if (text.length == 0 || !text) {
      toast.error("Enter a text");

      return;
    }

    setIsLoading(true);
    clearImages();

    try {
      const { data } = await axiosInstance.post(
        "/generate-image",
        { text },
        { responseType: "blob" }
      );

      cropImages(data);
    } catch (e: any) {
      console.error(e);

      toast.error("Unable to generate image");
    } finally {
      setIsLoading(false);
    }

    return;
  };

  const uploadImage = async (index: 1 | 2 | 3 | 4) => {
    if (isLoading || index === selectedIndex) return;

    let base64;

    if (index === 1) base64 = imageOne;
    if (index === 2) base64 = imageTwo;
    if (index === 3) base64 = imageThree;
    if (index === 4) base64 = imageFour;

    if (!base64) {
      toast.error("Unknown image....");

      return;
    }

    setSelectedIndex(index);

    setIsLoading(true);

    try {
      const _image = base64.substring("data:image/png;base64,".length);
      const { data } = await axiosInstance.post("/upload-image", {
        image: _image,
      });

      if (!data.status) {
        toast.error("Unable to upload image");

        return;
      }

      setSelectedURL(data.url);
      setDisplayModal(false);
    } catch (e: any) {
      console.error(e);

      toast.error(`Err: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (displayModal) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  }, [displayModal]);

  const handleOverlayClick = (e: any) => {
    if (e.target.classList.contains("image-picker")) {
      setDisplayModal(false);
    }
  };

  return (
    <div
      className={`image-picker ${displayModal ? "d-block" : "d-none"} ${theme}`}
      onClick={handleOverlayClick}
    >
      <div className="image-picker-box">
        <div className="close cursor" onClick={() => setDisplayModal(false)}>
          <Close />
        </div>
        <h2 className="text-center fw-bold mt-5">
          Generate <span className="title-u">PFP</span>
        </h2>

        <div className="ai-generator my-5">
          <div id="form">
            <div className="row align-items-center g-3 g-md-2 mb-4">
              <div className="col-12 col-md-8 entries">
                <input
                  type="text"
                  placeholder="e.g A monkey on crown"
                  name="text"
                  id="text"
                  value={text}
                  autoComplete="off"
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4">
                <button disabled={isLoading} onClick={generateImages}>
                  {isLoading ? (
                    <LoaderIcon />
                  ) : (
                    <>
                      Generate <ChevronRight />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="ai-images">
              <div className="row align-items-center g-4 g-md-3">
                {imageOne && (
                  <div className="col-6 col-md-3">
                    <div className="img-box mb-1">
                      <img src={imageOne} alt="xxx-ai-generated-image-xxx" />
                      <button
                        onClick={() => uploadImage(1)}
                        disabled={isLoading}
                        className={selectedIndex === 1 ? "selected" : ""}
                      >
                        {isLoading ? (
                          <LoaderIcon width={18} height={18} />
                        ) : selectedIndex === 1 ? (
                          "Selected"
                        ) : (
                          "Choose"
                        )}
                      </button>
                    </div>
                    <p className="d-flex align-items-center img-box-p px-2">
                      <a href={imageOne} target="_blank">
                        View
                      </a>
                    </p>
                  </div>
                )}

                {imageTwo && (
                  <div className="col-6 col-md-3">
                    <div className="img-box mb-1">
                      <img src={imageTwo} alt="xxx-ai-generated-image-xxx" />
                      <button
                        onClick={() => uploadImage(2)}
                        disabled={isLoading}
                        className={selectedIndex === 2 ? "selected" : ""}
                      >
                        {isLoading ? (
                          <LoaderIcon width={18} height={18} />
                        ) : selectedIndex === 2 ? (
                          "Selected"
                        ) : (
                          "Choose"
                        )}
                      </button>
                    </div>
                    <p className="d-flex align-items-center img-box-p px-2">
                      <a href={imageTwo} target="_blank">
                        View
                      </a>
                    </p>
                  </div>
                )}

                {imageThree && (
                  <div className="col-6 col-md-3">
                    <div className="img-box mb-1">
                      <img src={imageThree} alt="xxx-ai-generated-image-xxx" />
                      <button
                        onClick={() => uploadImage(3)}
                        disabled={isLoading}
                        className={selectedIndex === 3 ? "selected" : ""}
                      >
                        {isLoading ? (
                          <LoaderIcon width={18} height={18} />
                        ) : selectedIndex === 3 ? (
                          "Selected"
                        ) : (
                          "Choose"
                        )}
                      </button>
                    </div>
                    <p className="d-flex align-items-center img-box-p px-2">
                      <a href={imageThree} target="_blank">
                        View
                      </a>
                    </p>
                  </div>
                )}

                {imageFour && (
                  <div className="col-6 col-md-3">
                    <div className="img-box mb-1">
                      <img src={imageFour} alt="xxx-ai-generated-image-xxx" />
                      <button
                        onClick={() => uploadImage(4)}
                        disabled={isLoading}
                        className={selectedIndex === 4 ? "selected" : ""}
                      >
                        {isLoading ? (
                          <LoaderIcon width={18} height={18} />
                        ) : selectedIndex === 4 ? (
                          "Selected"
                        ) : (
                          "Choose"
                        )}
                      </button>
                    </div>
                    <p className="d-flex align-items-center img-box-p px-2">
                      <a href={imageFour} target="_blank">
                        View
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePicker;
