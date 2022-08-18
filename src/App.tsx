import React, { useEffect, useReducer, useState } from "react";
import "./App.css";

function App() {
  const [videoSelectedState, updateVideoSelectedState] = useReducer(
    (oldState: any, newValue: any) => ({ ...oldState, ...newValue }),
    {}
  );
  const [videoCurrentState, updateVideoCurrentState] = useReducer(
    (oldState: any, newValue: any) => ({ ...oldState, ...newValue }),
    {}
  );
  const [videoSelectedStateCapabilities, setvideoSelectedStateCapabilities] =
    useState<any>({});
  const [tracks, setTracks] = useState<MediaStreamTrack[]>([]);

  const handleApply = () => {
    tracks.forEach(async (track) => {
      await track.applyConstraints({
        advanced: [videoSelectedState],
      });
      updateVideoCurrentState(track.getSettings());
      console.log("curr", track.getSettings());
      console.log("track:", track.getCapabilities());
    });
  };

  useEffect(() => {
    window.navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        const videoTracks = stream.getVideoTracks();
        setTracks(videoTracks);
        console.log("videoTracks", videoTracks);
        const t: any = videoTracks;
        setvideoSelectedStateCapabilities(t[0].getCapabilities());
        updateVideoSelectedState({
          brightness: t[0].getSettings().brightness,
          colorTemperature: t[0].getSettings().colorTemperature,
          contrast: t[0].getSettings().contrast,
          saturation: t[0].getSettings().saturation,
          sharpness: t[0].getSettings().sharpness,
          whiteBalanceMode: t[0].getSettings().whiteBalanceMode,
          exposureMode: t[0].getSettings().exposureMode,
        });
        updateVideoCurrentState(t[0].getSettings());
        const video = document.getElementById(
          "video"
        ) as HTMLVideoElement | null;
        if (video) video.srcObject = stream;
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <video id="video" autoPlay playsInline></video>
        <button
          style={{
            marginTop: 20,
            marginBottom: 50,
            width: 200,
            height: 60,
            borderRadius: 30,
            background: "blue",
          }}
          onClick={handleApply}
        >
          Apply Settings
        </button>
        <div
          className="inputs-container"
          style={{
            padding: 20,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 30,
          }}
        >
          <div>
            <h3>brightness</h3>
            <div>selected: {videoSelectedState.brightness}</div>
            <div>current: {videoCurrentState.brightness}</div>
            <input
              min={videoSelectedStateCapabilities.brightness?.min}
              max={videoSelectedStateCapabilities.brightness?.max}
              value={videoSelectedState.brightness}
              step={1}
              onChange={(event) =>
                updateVideoSelectedState({
                  brightness: parseInt(event.target.value),
                })
              }
              type="range"
            />
          </div>
          <div>
            <h3>colorTemperature</h3>
            <div>selected: {videoSelectedState.colorTemperature}</div>
            <div>current: {videoCurrentState.colorTemperature}</div>
            <input
              min={videoSelectedStateCapabilities.colorTemperature?.min}
              max={videoSelectedStateCapabilities.colorTemperature?.max}
              step={1}
              value={videoSelectedState.colorTemperature}
              onChange={(event) =>
                updateVideoSelectedState({
                  colorTemperature: parseInt(event.target.value),
                })
              }
              type="range"
            />
          </div>
          <div>
            <h3>contrast</h3>
            <div>selected: {videoSelectedState.contrast}</div>
            <div>current: {videoCurrentState.contrast}</div>
            <input
              min={videoSelectedStateCapabilities.contrast?.min}
              max={videoSelectedStateCapabilities.contrast?.max}
              step={1}
              value={videoSelectedState.contrast}
              onChange={(event) =>
                updateVideoSelectedState({
                  contrast: parseInt(event.target.value),
                })
              }
              type="range"
            />
          </div>
          <div>
            <h3>saturation</h3>
            <div>selected: {videoSelectedState.saturation}</div>
            <div>current: {videoCurrentState.saturation}</div>
            <input
              min={videoSelectedStateCapabilities.saturation?.min}
              max={videoSelectedStateCapabilities.saturation?.max}
              step={1}
              value={videoSelectedState.saturation}
              onChange={(event) =>
                updateVideoSelectedState({
                  saturation: parseInt(event.target.value),
                })
              }
              type="range"
            />
          </div>
          <div>
            <h3>sharpness</h3>
            <div>selected: {videoSelectedState.sharpness}</div>
            <div>current: {videoCurrentState.sharpness}</div>
            <input
              min={videoSelectedStateCapabilities.sharpness?.min}
              max={videoSelectedStateCapabilities.sharpness?.max}
              step={1}
              value={videoSelectedState.sharpness}
              onChange={(event) =>
                updateVideoSelectedState({
                  sharpness: parseInt(event.target.value),
                })
              }
              type="range"
            />
          </div>
          <div>
            <h3>whiteBalanceMode</h3>
            <div>selected: {videoSelectedState.whiteBalanceMode}</div>
            <div>current: {videoCurrentState.whiteBalanceMode}</div>
            <select
              value={videoSelectedState.whiteBalanceMode}
              onChange={(event) =>
                updateVideoSelectedState({
                  whiteBalanceMode: event.target.value,
                })
              }
            >
              {videoSelectedStateCapabilities.whiteBalanceMode?.map(
                (value: string) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <h3>exposureMode</h3>
            <div>selected: {videoSelectedState.exposureMode}</div>
            <div>current: {videoCurrentState.exposureMode}</div>
            <select
              value={videoSelectedState.exposureMode}
              onChange={(event) =>
                updateVideoSelectedState({
                  exposureMode: event.target.value,
                })
              }
            >
              {videoSelectedStateCapabilities.exposureMode?.map(
                (value: string) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <h3>exposureTime</h3>
            <div>selected: {videoSelectedState.exposureTime}</div>
            <div>current: {videoCurrentState.exposureTime}</div>
            <input
              min={videoSelectedStateCapabilities.exposureTime?.min}
              max={videoSelectedStateCapabilities.exposureTime?.max}
              step={videoSelectedStateCapabilities.exposureTime?.step}
              value={videoSelectedState.exposureTime}
              onChange={(event) =>
                updateVideoSelectedState({
                  exposureTime: parseFloat(event.target.value),
                })
              }
              type="range"
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
