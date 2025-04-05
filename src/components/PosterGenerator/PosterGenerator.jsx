import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Cropper from "react-easy-crop";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css"
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import styles from './GeneratePoster.module.css';
import MissingPoster from "./MissingPoster.jsx";
import MissingPoster2Images from "./MissingPoster2Images.jsx";
import FoundPoster from "./FoundPoster.jsx";
import FoundPoster2Images from "./FoundPoster2Images.jsx";

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

    const [selectedOption, setSelectedOption] = useState(formData.selectedOption || null);
    // const [selectedOption, setSelectedOption] = useState(null);

    // const [image, setImage] = useState(null);
    // const [image1, setImage1] = useState(null);
    // const [croppedImage, setCroppedImage] = useState(null);
    const [image, setImage] = useState(formData.image || null);
    const [image1, setImage1] = useState(formData.image1 || null);
    const [croppedImage, setCroppedImage] = useState(formData.croppedImage || null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showMissingPoster, setShowMissingPoster] = useState(false);
    const [cropBtn, setCropClicked] = useState(true);

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
    const handleImageUpload1 = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage1(URL.createObjectURL(file));
        }
    }
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

        setCroppedImage(croppedDataUrl);
        formData.croppedImage = croppedDataUrl;
        setShowMissingPoster(true);


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
    const sendMail = async (val) => {
        console.log("VAL",val)
        const response = await fetch(import.meta.env.VITE_MAIL_API_URL, {
            method: "POST",
            // mode: "no-cors", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "1rn17ee009.bharathbm@gmail.com",
                subject: `New Poster Downloaded as ${val}`,
                heading: formData?.Heading || "",
                petType: formData?.petType || "",
                name: formData?.Name || "",
                lastseen: formData?.Missingplace || "",
                missingDate: formData?.MissingDate || "",
                missingTime: formData?.MissingTime || "",
                dateTime: new Date().toLocaleString(),
                message: formData?.Contact || "",
            }),
        });
        console.log("RESP",response);

        if (!response.ok) throw new Error("Mail send failed");
        return await response.json();
    };

    const handleDownload = async () => {
        console.log("import.meta.env.VITE_MAIL_SEND_FLG",import.meta.env.VITE_MAIL_SEND_FLG)
        console.log("import.meta.env.VITE_MAIL_API_URL",import.meta.env.VITE_MAIL_API_URL)
        if (import.meta.env.VITE_MAIL_SEND_FLG === "1") {
            console.log("DEBUG")
            try {
                await sendMail("PNG");
            } catch (err) {
                console.error("Email failed to send:", err);
            }
        }

        if (posterRef.current) {
            const canvas = await html2canvas(posterRef.current, {
                scale: 4,
                useCORS: true,
                logging: true,
            });
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            if (formData.missingClicked === true) {
                link.download = `MissingPoster_${formData.Name}.png`;
            }
            else if (formData.foundClicked === true) {
                link.download = `FoundPoster.png`;
            }
            link.click();
        }
    };

    const handleDownloadasPDF = async () => {
        if (posterRef.current) {
            const canvas = await html2canvas(posterRef.current, {
                scale: 4, // Increase for better quality
                useCORS: true,
            });

            const imgData = canvas.toDataURL("image/png");

            // Convert px to mm (1px = 0.264583mm)
            const pdfWidth = 400 * 0.264583; // ~105.83mm
            const pdfHeight = 500 * 0.264583; // ~132.29mm

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: [pdfWidth, pdfHeight], // Custom size
            });

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

            if (formData.missingClicked) {
                pdf.save(`MissingPoster_${formData.Name}.pdf`);
            } else if (formData.foundClicked) {
                pdf.save(`FoundPoster.pdf`);
            }
        }
    };

    const handleEditDetails = () => {
        // navigate("/createposter", { state: formData,
        //     image, 
        //     image1, 
        //     croppedImage  });
        navigate("/createposter", {
            state: {
                ...formData,
                selectedOption,
                image,
                image1,
                croppedImage
            }
        });
    };
    console.log("formData", formData)
    const cropperRef1 = useRef(null);
    const cropperRef2 = useRef(null);
    const [croppedImage1, setCroppedImage1] = useState(null);
    const [croppedImage2, setCroppedImage2] = useState(null);

    const onCropComplete1 = () => {
        if (!cropperRef1.current || !cropperRef1.current.cropper) return;
        const croppedDataUrl = cropperRef1.current.cropper.getCroppedCanvas().toDataURL("image/png");
        setCroppedImage1(croppedDataUrl);
        setShowMissingPoster(true);
    };

    const onCropComplete2 = () => {
        if (!cropperRef2.current || !cropperRef2.current.cropper) return;
        const croppedDataUrl = cropperRef2.current.cropper.getCroppedCanvas().toDataURL("image/png");
        setCroppedImage2(croppedDataUrl);
        setShowMissingPoster(true);

    };

    return (
        <div className={styles.overallContainer}>
            <div>
                <button className={styles.editButton} onClick={() => { navigate("/createposter") }}>Go to Home Page</button>
            </div>
            <p className={styles.text}>Generated Poster</p>

            <div>
                <button className={styles.editButton} onClick={() => setSelectedOption(1)}>Poster with 1 Image</button>
            </div>
            <div>
                <button className={styles.editButton} onClick={() => setSelectedOption(2)}>Poster with 2 Images</button>
            </div>
            {formData.missingClicked === true &&
                <div className={styles.buttonContainer}>
                    {selectedOption === 1 && (
                        <div>
                            <input type="file" accept="image/*" onChange={handleImageUpload} />

                            {image && cropBtn && (

                                <div className={styles.cropContainer} style={{ width: '300px', height: '300px', position: 'relative', marginRight: "30px", }}>

                                    <Cropper
                                        ref={cropperRef}
                                        src={image}
                                        style={{ width: "100%", height: "100%" }}
                                        aspectRatio={NaN} // Ensures square cropping
                                        viewMode={1}
                                        guides={true}
                                        dragMode="move"
                                        cropBoxResizable={true} // Allows resizing, but only in square shape
                                        minCropBoxWidth={100} // Minimum crop box size
                                        minCropBoxHeight={100}
                                        ready={() => {
                                            const cropper = cropperRef.current.cropper;
                                            cropper.setCropBoxData({
                                                width: 200, // Initial size
                                                height: 200,
                                            });
                                        }}
                                        cropend={() => {
                                            const cropper = cropperRef.current.cropper;
                                            const cropBoxData = cropper.getCropBoxData();

                                            // Enforce max size (Example: 300x300)
                                            if (cropBoxData.width > 300) {
                                                cropper.setCropBoxData({ width: 350, height: 350 });
                                            }
                                        }}
                                        crop={onCropComplete}
                                    />
                                    {/* <div className={styles.buttonContainer} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                                    <button onClick={handleCropConfirm} className={styles.confirmButton}>
                                        Confirm Crop
                                    </button>
                                </div> */}
                                </div>
                            )}
                        </div>
                    )}
                    {showMissingPoster && selectedOption === 1 && (
                        <div ref={posterRef} >
                            <MissingPoster data={formData} ref={posterRef} />
                        </div>
                    )}
                    {selectedOption === 2 && (
                        <div>
                            <input type="file" accept="image/*" onChange={handleImageUpload} />
                            <input type="file" accept="image/*" onChange={handleImageUpload1} />

                            {image && image1 && cropBtn && (
                                <div className={styles.buttonContainer} >
                                    {/* First Image Cropper */}
                                    <div className={styles.cropContainer} style={{ width: '300px', height: '300px', position: 'relative' }}>
                                        <Cropper
                                            ref={cropperRef1}
                                            src={image}
                                            style={{ width: "100%" }}
                                            aspectRatio={NaN}
                                            viewMode={1}
                                            guides={true}
                                            responsive={true}
                                            checkOrientation={false}
                                            cropend={onCropComplete1}
                                        />
                                    </div>

                                    {/* Second Image Cropper */}
                                    <div className={styles.cropContainer} style={{ width: '300px', height: '300px', position: 'relative' }}>
                                        <Cropper
                                            ref={cropperRef2}
                                            src={image1}
                                            style={{ width: "100%" }}
                                            aspectRatio={NaN}
                                            viewMode={1}
                                            guides={true}
                                            responsive={true}
                                            checkOrientation={false}
                                            cropend={onCropComplete2}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {showMissingPoster && selectedOption === 2 && (
                        <div ref={posterRef}>
                            <MissingPoster2Images data={formData} image1={croppedImage1} image2={croppedImage2} />
                        </div>
                    )}

                </div>}
            {formData.foundClicked === true &&
                <div className={styles.buttonContainer}>
                    {selectedOption === 1 && (
                        <div>
                            <input type="file" accept="image/*" onChange={handleImageUpload} />

                            {image && cropBtn && (

                                <div className={styles.cropContainer} style={{ width: '300px', height: '300px', position: 'relative', marginRight: "30px", }}>
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
                                    {/* <div className={styles.buttonContainer} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                                <button onClick={handleCropConfirm} className={styles.confirmButton}>
                                    Confirm Crop
                                </button>
                            </div> */}
                                </div>
                            )}
                        </div>
                    )}
                    {showMissingPoster && selectedOption === 1 && (
                        <div ref={posterRef} >
                            <FoundPoster data={formData} ref={posterRef} />
                        </div>
                    )}
                    {selectedOption === 2 && (
                        <div>
                            <input type="file" accept="image/*" onChange={handleImageUpload} />
                            <input type="file" accept="image/*" onChange={handleImageUpload1} />

                            {image && image1 && cropBtn && (
                                <div className={styles.buttonContainer} >
                                    {/* First Image Cropper */}
                                    <div className={styles.cropContainer} style={{ width: '300px', height: '300px', position: 'relative' }}>
                                        <Cropper
                                            ref={cropperRef1}
                                            src={image}
                                            style={{ width: "100%" }}
                                            aspectRatio={NaN}
                                            viewMode={1}
                                            guides={true}
                                            responsive={true}
                                            checkOrientation={false}
                                            cropend={onCropComplete1}
                                        />
                                    </div>

                                    {/* Second Image Cropper */}
                                    <div className={styles.cropContainer} style={{ width: '300px', height: '300px', position: 'relative' }}>
                                        <Cropper
                                            ref={cropperRef2}
                                            src={image1}
                                            style={{ width: "100%" }}
                                            aspectRatio={NaN}
                                            viewMode={1}
                                            guides={true}
                                            responsive={true}
                                            checkOrientation={false}
                                            cropend={onCropComplete2}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {showMissingPoster && selectedOption === 2 && (
                        <div ref={posterRef}>
                            <FoundPoster2Images data={formData} image1={croppedImage1} image2={croppedImage2} />
                        </div>
                    )}

                </div>
            }

            {(croppedImage || croppedImage1) && showMissingPoster && (
                <div className={styles.buttonContainer}>
                    <button onClick={() => { setCropClicked(true); }} className={styles.editButton}>
                        Crop Image
                    </button>
                    <button onClick={() => { setCropClicked(false) }} className={styles.editButton}>
                        Crop Done
                    </button>

                    <button onClick={handleDownload} className={styles.editButton}>
                        Download Poster
                    </button>

                    <button onClick={handleDownloadasPDF} className={styles.editButton}>
                        Download as PDF
                    </button>


                </div>
            )}
            <div className={styles.buttonContainer}>
                <button onClick={handleEditDetails} className={styles.editButton}>
                    Edit Details
                </button>
            </div>
        </div>
    );
}

export default GeneratePoster;