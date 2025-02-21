import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Cropper from "react-easy-crop";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css"
import html2canvas from "html2canvas";
import styles from './GeneratePoster.module.css';
import MissingPoster from "./MissingPoster";

function getCroppedImg(imageSrc, croppedAreaPixels) {
    return new Promise((resolve) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;

            ctx.drawImage(
                image,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );

            resolve(canvas.toDataURL("image/jpeg"));
        };
    });
}

function GeneratePoster() {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;
    const posterRef = useRef(null);

    const [selectedOption, setSelectedOption] = useState(null);
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showMissingPoster, setShowMissingPoster] = useState(false);

    useEffect(() => {
        if (!formData) {
            navigate("/"); // Redirect to home if no data received
        }
    }, [formData, navigate]);

    if (!formData) return null; // Prevent rendering if redirecting

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    // const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    //     setCroppedAreaPixels(croppedAreaPixels);
    // }, []);
    const cropperRef = useRef(null);

    const onCropComplete = () => {
        if (!cropperRef.current || !cropperRef.current.cropper) return;

        // const cropper = cropperRef.current.cropper;
        // const croppedDataUrl = cropper.getCroppedCanvas().toDataURL("image/png");
        const cropper = cropperRef.current.cropper;
        const canvas = cropper.getCroppedCanvas();
        const croppedDataUrl = canvas.toDataURL("image/jpeg", 0.7);


        setcroppedImage(croppedDataUrl);
        setEmpData((prevEmpData) => ({
            ...prevEmpData,
            photo: croppedDataUrl,
        }));

        // console.log("Cropped Image Updated:", croppedDataUrl);
    };

    const handleCropConfirm = async () => {
        if (image && croppedAreaPixels) {
            const croppedImg = await getCroppedImg(image, croppedAreaPixels);
            setCroppedImage(croppedImg);
            formData.croppedImage = croppedImg;
            setShowMissingPoster(true);
        }
    };

    const handleDownload = async () => {
        if (posterRef.current) {
            const canvas = await html2canvas(posterRef.current, {
                scale: 2,
                useCORS: true,
                logging: true,
            });
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = `MissingPoster_${formData.Name}.png`;
            link.click();
        }
    };

    const handleEditDetails = () => {
        navigate("/createposter", { state: formData });
    };

    return (
        <div className={styles.overallContainer}>
            <p>Generated Poster</p>
            <div>
                <button onClick={() => setSelectedOption(1)}>Poster with 1 Image</button>
            </div>

            {selectedOption === 1 && !croppedImage && (
                <div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    {image && (
                        <div className={styles.cropContainer} style={{ width: '300px', height: '300px', position: 'relative' }}>
                            {/* <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            /> */}
                             <Cropper
                                    ref={cropperRef}
                                    src={image}
                                    // src={imageSrc}
                                    // src={croppedImage}
                                    style={{ width: "100%" }}
                                    aspectRatio={NaN}
                                    viewMode={1}
                                    guides={true}
                                    // autoCropArea={1}
                                    responsive={true}
                                    checkOrientation={false}
                                    cropend={onCropComplete}
                                />
                            <div className={styles.buttonContainer} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                                <button onClick={handleCropConfirm} className={styles.confirmButton}>
                                    Confirm Crop
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {croppedImage && showMissingPoster && (
                <div ref={posterRef} >
                    <MissingPoster data={formData} ref={posterRef}/>
                </div>
            )}
            {/* <div ref={posterRef} style={{ width: "400px", height: "500px", aspectRatio: "4/5" }}>

                <MissingPoster data={formData} />
            </div> */}
            {croppedImage && showMissingPoster && (
                <>
                <button onClick={handleDownload} className={styles.downloadButton}>
                    Download Poster
                </button>
                <button onClick={handleEditDetails} className={styles.editButton}>
                    Edit Details
                </button>
            </>
            )}
        </div>
    );
}

export default GeneratePoster;