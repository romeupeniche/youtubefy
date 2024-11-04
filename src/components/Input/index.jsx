import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useState } from "react";

function Input() {
  const [linkField, setLinkField] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [linkCheckingError, setLinkCheckingError] = useState("");

  const onLinkFieldChange = (e) => {
    setLinkField(e.target.value);
    const linkChecking = checkYouTubeLink(e.target.value);
    setLinkCheckingError(linkChecking.error);
    if (linkChecking.error) {
      setErrorMessage(`Error: ${linkChecking.errormsg}`);
    } else {
      setErrorMessage("");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <PlayCircleIcon sx={{ color: "primary.main", mr: 1, my: 0.5 }} />
        <TextField
          label="YouTube Link"
          variant="standard"
          sx={{ width: 500 }}
          onChange={onLinkFieldChange}
          value={linkField}
        />
      </Box>
      {linkField.length > 0 && (
        <>
          {linkCheckingError && linkField.length > 0 ? (
            <Typography mt={1} color="#f00">
              {errorMessage}
            </Typography>
          ) : (
            <CircularProgress sx={{ mt: 2 }} />
          )}
        </>
      )}
    </>
  );
}

export default Input;

function checkYouTubeLink(url) {
  if (!url.startsWith("http")) {
    return { error: true, errormsg: "Not a valid link.", videoId: null };
  }

  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "youtube.com"
    ) {
      const videoId = parsedUrl.searchParams.get("v");
      return videoId
        ? { error: false, errormsg: null, videoId: videoId }
        : { error: true, errormsg: "Not a valid Youtube link.", videoId: null };
    }

    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);
      return videoId
        ? { error: false, errormsg: null, videoId: videoId }
        : { error: true, errormsg: "Not a valid Youtube link.", videoId: null };
    }

    return { error: true, errormsg: "Not an Youtube link.", videoId: null };
  } catch (e) {
    return { error: true, errormsg: "Not a valid link.", videoId: null };
  }
}
