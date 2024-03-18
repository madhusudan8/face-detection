"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "@/utils/render-predictions";

let detectInterval;
const ObjectDetection = () => {
    const [loading, setIsLoading] = useState(false);
    const webcamRef = React.useRef(null);
    const canvasRef = React.useRef(null);
    const showMyVideo = () => {
        if (webcamRef.current !== null && webcamRef.current?.readyState === 4) {
            console.log(webcamRef.current.getScreenshot());
            const myVideoWidth = webcamRef.current.video.videoHeight;
            const myVideoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = myVideoWidth;
            webcamRef.current.video.height = myVideoHeight;
        }
    };
    async function runCoco() {
        setIsLoading(true);
        const net = await cocoSSDLoad();
        setIsLoading(false);

        detectInterval = setInterval(() => {
            runObjectDetection(net);
        }, 10);
    }
    async function runObjectDetection(net) {
        if (
            canvasRef.current !== null &&
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState === 4
        ) {
            canvasRef.current.height = webcamRef.current.video.videoHeight;
            canvasRef.current.width = webcamRef.current.video.videoHeight;

            const detectedObjets = await net.detect(webcamRef.current.video, undefined, 0.6)
            // console.log("detectedObjets: ", detectedObjets);
            const context = canvasRef.current.getContext("2d");
            renderPredictions(detectedObjets, context);
        }
    }
    useEffect(() => {
        runCoco();
        showMyVideo();
    }, []);
    return (
        <div className="mt-8">
            {loading ? (
                <div className="gradient-text">Loading AI Model</div>
            ) : (
                <div className="relative flex justify-center items-center gradient p-1.5 rounded-md ">
                    <Webcam
                        ref={webcamRef}
                        className="lg:h-[720px] w-full rounded-md"
                        muted
                    />
                    <canvas
                        className="absolute top-0 left-0 z-99999 w-full lg:h-[720px]"
                        ref={canvasRef}
                    ></canvas>
                </div>
            )}
        </div>
    );
};

export default ObjectDetection;
