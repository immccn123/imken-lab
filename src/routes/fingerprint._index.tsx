import { Button } from "@blueprintjs/core";
import { useState } from "react";

import md5 from "crypto-js/md5";
import base64 from "crypto-js/enc-base64";

export default function Fingerprint() {
  document.title = "Fingerprint";

  const [showFingerprint, setShowFingerprint] = useState(false);

  const getFingerprint = () => {
    const outScreenCanvas = document.createElement("canvas");
    const ctx = outScreenCanvas.getContext("2d")!;

    const txt = "Imken Lab - Fingerprint Testing";
    ctx.textBaseline = "top";
    ctx.font = "12px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f00";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#096";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(20, 214, 0, 0.7)";
    ctx.fillText(txt, 4, 17);

    const canvasImageData = outScreenCanvas.toDataURL();
    const rawHash = md5(canvasImageData);

    return base64.stringify(rawHash);
  };

  return (
    <>
      <h1>Fingerprint</h1>
      <p>
        Your fingerprint is:{" "}
        {showFingerprint ? (
          <code style={{ color: "red" }}>{getFingerprint()}</code>
        ) : (
          <Button onClick={() => setShowFingerprint(!showFingerprint)}>
            Click to show
          </Button>
        )}
      </p>
      <p>
        It has nothing to do with your network, user agent, guest mode, private
        mode, user profile, etc.
      </p>
    </>
  );
}
