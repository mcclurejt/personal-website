// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";
import {Base64} from "./libraries/Base64.sol";

contract OtterSVGData {
    struct AttributeVariation {
        string attribute;
        string color;
    }

    struct OtterVariation {
        string background;
        string water;
        string limb;
        string body;
        string belly;
        string ball1;
        string ball2;
        string ball3;
    }

    mapping(string => string[]) attributeColors;

    string svgPrefix =
        '<svg id="Otter_Body" data-name="Otter Body" xmlns="http://www.w3.org/2000/svg" width="501" height="501" viewBox="0 0 501 501"><defs>';

    string svgSuffix =
        '</defs><rect id="background" class="cls-1" x="0.5" y="0.5" width="500" height="500"/><path id="water" class="Water" d="M0,330c80.78-8.42,71.47-25.27,52.4-46.11-.89-21.73,37.71,41.16,88.23,39.46,39.47-1.33,42.57-26.16,28.82-42.57,9.32-16.84,42.64,40,74.49,40.8,29.25.71,71.83-6.65,38.58-46.56,1.77-25.87,47,46.56,85.13,44.78,38.69-1.8,69.17-12,46.55-43.89,6.21-25.87,53.65,39.46,85.8,41.68V500H0Z" transform="translate(0.5 0.5)"/><g id="rightfoot"><path id="Otter_Right_Foot" data-name="Otter Right Foot" class="cls-2" d="M97.22,334.73S116,241.8,117.77,233.39s4.46-11.37,8.51-12.18,13.64,5.16,16.7,14-15.91,34.61-14.47,41.22,33.36,5.36,27.18,32.33-25.18,31.57-25.18,31.57-5.53,3.7-16.39,3.17A23.74,23.74,0,0,1,97.22,334.73Z" transform="translate(0.5 0.5)"/><line id="Toe_1" data-name="Toe 1" class="cls-3" x1="122.98" y1="227.93" x2="125.24" y2="222.16"/><line id="Toe_2" data-name="Toe 2" class="cls-3" x1="126.64" y1="227.95" x2="127.9" y2="221.65"/><line id="Toe_3" data-name="Toe 3" class="cls-3" x1="130.96" y1="227.97" x2="130.3" y2="222.19"/></g><g id="righthand"><path id="Otter_Right_Hand" data-name="Otter Right Hand" class="cls-2" d="M336.59,299.85c-2.55-1.26-16-17.52-22-33.76-4.1-11.14-2-23.42-1.12-26.24,2.16-6.93,4-6.13,5.8-8.43,3.07-3.83.61-1.34,1.79-5s-8.36-11.9-16.67-9.51c-17.21,5-14.15,16.23-15.15,20.87s-1.56,16.3,3,32.85,13.2,32.22,7.67,38.54,5.17,22.4,20.93,15.29C340.58,315.58,340.88,302,336.59,299.85Z" transform="translate(0.5 0.5)"/><path id="Finger_1" data-name="Finger 1" class="cls-3" d="M309.85,227.46c.43-4.89,6.33-7.59,6.33-7.59" transform="translate(0.5 0.5)"/><path id="Finger_2" data-name="Finger 2" class="cls-3" d="M305.13,226.65c-1.61-4,4.33-10,4.33-10" transform="translate(0.5 0.5)"/><path id="Finger_3" data-name="Finger 3" class="cls-3" d="M298.71,226.74c-1-4.64,3.45-9.1,3.45-9.1" transform="translate(0.5 0.5)"/></g><path id="body" class="cls-4" d="M106.05,380.06c31.91,1.36,193.27,1,287.87-27.74,65.52-11.5,73.17-84.81,67.73-117.38-8-47.75-54.64-58-71.11-56.68-29-1.38-43.38,25.59-48,44.52-.65,2.7-5.58,3.12-4.88,7.72,1.58,10.39,30.63,26.2,53.18,14.82,15.54-7.84,34.11-6.53,33.42-1.26-1,7.45-48.65,28.34-101.85,29.45-67.22,1.4-94.67-23.63-132.4-19.43-30.51,3.39-74.38,73.74-105,60.6C63.53,305.42,47.92,221,42.15,221c-11.86-.07-6,113,1.94,128C52.68,365.15,77.43,378.85,106.05,380.06Z" transform="translate(0.5 0.5)"/><path id="belly" class="cls-5" d="M223,320.88c40.14-4.64,124.07-19.67,114.42-48.19,0,0-36.5,1.27-51.18-1.48-63.31-11.88-58.43-21.33-96.16-17.13-30.51,3.39-42.19,43.1-100.74,59.7C66.75,320.17,127,335.84,223,320.88Z" transform="translate(0.5 0.5)"/><g id="face"><path id="Otter_Nose" data-name="Otter Nose" class="cls-6" d="M342.59,222.78c-.65,2.7-5.58,3.12-4.88,7.72,0,0,4,4.32,8.09,2.65,3.65-1.49,5.6-2,6.57-4.57C353.48,225.61,346.72,222,342.59,222.78Z" transform="translate(0.5 0.5)"/><ellipse id="Otter_Eye_White" data-name="Otter Eye White" class="cls-7" cx="374.9" cy="199.33" rx="11.62" ry="8.25" transform="translate(173.99 573.61) rotate(-89.68)"/><ellipse id="Otter_Eye_Black" data-name="Otter Eye Black" cx="374.62" cy="201.92" rx="9.03" ry="6.84" transform="translate(171.11 575.9) rotate(-89.68)"/></g><g id="leftfoot"><path id="Otter_Left_Foot" data-name="Otter Left Foot" class="cls-2" d="M87.55,348.83s-12.54-94-13.61-102.5c-.87-6.87,0-10.65,2.3-12.94A8.41,8.41,0,0,1,78,232.05c3.56-2.08,14.58.42,20.35,7.77s-3.76,37.9-.24,43.68,33.28-5.81,36.23,21.7-13.51,38.06-13.51,38.06-4,5.29-14.46,8.34A23.78,23.78,0,0,1,87.55,348.83Z" transform="translate(0.5 0.5)"/><line id="Toe_1-2" data-name="Toe 1" class="cls-3" x1="80.24" y1="239.55" x2="76.74" y2="233.89"/><line id="Toe_2-2" data-name="Toe 2" class="cls-3" x1="83.24" y1="239.01" x2="81.17" y2="231.87"/><line id="Toe_3-2" data-name="Toe 3" class="cls-3" x1="86.68" y1="238.14" x2="85.62" y2="232.29"/></g><path id="ball1" class="cls-8" d="M269.18,270.14s-46.72-.26-46.46-47,47-46.46,47-46.46" transform="translate(0.5 0.5)"/><path id="ball2" class="cls-9" d="M269.7,176.7s16.46,4.53,16.23,46.81-16.75,46.63-16.75,46.63,46.72.26,47-46.46S269.7,176.7,269.7,176.7Z" transform="translate(0.5 0.5)"/><path id="ball3" class="cls-10" d="M251.65,223.32c.23-40.31,18-46.62,18-46.62s16.44,8,16.23,46.81-16.75,46.63-16.75,46.63S251.43,263.64,251.65,223.32Z" transform="translate(0.5 0.5)"/><g id="lefthand"><path id="Otter_Left_Hand" data-name="Otter Left Hand" class="cls-2" d="M302.41,298.12c-2.75-.71-19.27-13.87-28.45-28.54-6.29-10.06-6.75-22.51-6.46-25.45.7-7.23,2.62-6.82,3.95-9.45,2.22-4.37.32-1.43.73-5.25s-10.62-9.93-18.26-5.89c-15.84,8.38-10.53,18.79-10.56,23.53s1.82,16.28,9.7,31.53,19.52,28.83,15.4,36.15,9.65,20.87,23.62,10.68C309.54,312.7,307.05,299.31,302.41,298.12Z" transform="translate(0.5 0.5)"/><path id="Finger_1-2" data-name="Finger 1" class="cls-3" d="M261.42,232.73c-.59-4.87,4.65-8.71,4.65-8.71" transform="translate(0.5 0.5)"/><path id="Finger_2-2" data-name="Finger 2" class="cls-3" d="M256.64,232.92c-2.41-3.62,2.19-10.68,2.19-10.68" transform="translate(0.5 0.5)"/><path id="Finger_3-2" data-name="Finger 3" class="cls-3" d="M250.37,234.31c-1.92-4.34,1.52-9.61,1.52-9.61" transform="translate(0.5 0.5)"/></g></svg>';

    string[] backgroundColors = ["#ec008c"];
    string[] waterColors = ["#3cc"];
    string[] limbColors = ["#8c5728"];
    string[] bodyColors = ["#5e2f00"];
    string[] bellyColors = ["#c49a6c"];
    string[] ballColors1 = ["#55ddff"];
    string[] ballColors2 = ["#fffb1f"];
    string[] ballColors3 = ["#d12020"];

    constructor(AttributeVariation[] memory _variations) {
        for (uint256 i = 0; i < _variations.length; i++) {
            attributeColors[_variations[i].attribute].push(
                _variations[i].color
            );
        }
    }

    function pickRandomAttribute(string memory attribute, uint256 tokenId)
        internal
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked(attribute, Strings.toString(tokenId)))
        );
        rand = rand % attributeColors[attribute].length;
        return attributeColors[attribute][rand];
    }

    function pickRandomOtter(uint256 tokenId)
        internal
        view
        returns (OtterVariation memory)
    {
        OtterVariation memory ov = OtterVariation(
            pickRandomAttribute("background", tokenId),
            pickRandomAttribute("water", tokenId),
            pickRandomAttribute("limb", tokenId),
            pickRandomAttribute("body", tokenId),
            pickRandomAttribute("belly", tokenId),
            pickRandomAttribute("ball1", tokenId),
            pickRandomAttribute("ball2", tokenId),
            pickRandomAttribute("ball3", tokenId)
        );
        return ov;
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function generateMetadata(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        OtterVariation memory ov = pickRandomOtter(tokenId);
        string memory svg = generateSVG(ov);
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        "Otter ",
                        Strings.toString(tokenId),
                        '", "description": "A glorious collection of colorful otters.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(svg)),
                        '"',
                        ",",
                        '"properties": {',
                        '"background": "',
                        ov.background,
                        '",',
                        '"water": "',
                        ov.water,
                        '",',
                        '"limb": "',
                        ov.limb,
                        '",',
                        '"body": "',
                        ov.body,
                        '",',
                        '"belly": "',
                        ov.belly,
                        '",',
                        '"ball1": "',
                        ov.ball1,
                        '",',
                        '"ball2": "',
                        ov.ball2,
                        '",',
                        '"ball3": "',
                        ov.ball3,
                        '"',
                        "}",
                        "}"
                    )
                )
            )
        );
        return json;
    }

    function generateSVG(OtterVariation memory ov)
        internal
        view
        returns (string memory)
    {
        string memory finalSvg = string(
            abi.encodePacked(
                svgPrefix,
                "<style>.cls-1{fill:",
                ov.background,
                ";}.Water,.cls-1,.cls-10,.cls-2,.cls-3,.cls-4,.cls-5,.cls-8,.cls-9{stroke:#000;stroke-miterlimit:10;}.Water{fill:",
                ov.water,
                ";}.cls-2,.cls-3{fill:",
                ov.limb,
                ";}.cls-3{stroke-linecap:round;}.cls-4{fill:",
                ov.body,
                ";}.cls-5{fill:",
                ov.belly,
                ";}.cls-6{fill:#232323;}.cls-7{fill:#efeeed;}.cls-8{fill:",
                ov.ball1,
                ";}.cls-9{fill:",
                ov.ball2,
                ";}.cls-10{fill:",
                ov.ball3,
                ";}</style>",
                svgSuffix
            )
        );
        console.log("\n--------------------");
        console.log(finalSvg);
        console.log("--------------------\n");
        return finalSvg;
    }
}
