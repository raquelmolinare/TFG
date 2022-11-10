import React from "react";

import {BrainPlanes} from "../../models/ImgClassification";

import axialIcon from "../../assets/img/axial-icon.png";
import coronalIcon from "../../assets/img/coronal-icon.png";
import sagittalIcon from "../../assets/img/sagittal-icon.png";

import "./BrainPlaneIcon.css";

interface BrainPlaneIconProps {
    /**
     * Brain plane
     */
    plane: BrainPlanes;
}

export function BrainPlaneIcon({plane}: BrainPlaneIconProps) {
    const icon = () => {
        switch (plane) {
            case BrainPlanes.AXIAL:
                return axialIcon;
            case BrainPlanes.CORONAL:
                return coronalIcon;
            case BrainPlanes.SAGITTAL:
                return sagittalIcon;
            default:
                return "";
        }
    };

    return (<img  className="img-brain-plane-icon" src={icon()} alt="" />);
}
