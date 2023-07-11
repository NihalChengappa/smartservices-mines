import React, { useState, useRef, useEffect } from 'react';
import { Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import Sidebar from './Sidebar';
import '/src/styles/RouteTracker.css';

const RouteTracker = () => {
  const [checkpostID, setCheckpostID] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [teamID, setTeamID] = useState('');
  const videoRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [showSelfieLabel, setShowSelfieLabel] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [teams, setTeams] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false); 
  const[latitude,setLatitude]=useState('')
  const[longitude,setLongitude]=useState('')
  const[location,setLocation]=useState('')

  // const API_key=`67ce60a004bcecba44959b238c3f99ac`
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  })

  useEffect(() => {
    getTeams();
    return () => {
      stopCamera();
    };
  }, []);

  const fetchlocation =async()=>{
    const final_endpoint=`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    try {
      const response=await axios.get(final_endpoint)
      if(response.data.address['road']){
        setLocation(`${response.data.address['road']} ${response.data.address['suburb']} ${response.data.address['city']}`)
      }
      else{
        setLocation(`${response.data.address['suburb']} ${response.data.address['city']}`)
      }
    } catch (error) {
      console.error("Error fetching location:",error);
    }
  }
  const getTeams = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/teams');
      const team_ids = response.data.map((teamid) => teamid.teamId);
      const options = team_ids.map((team) => ({
        value: team,
        label: team,
      }));
      setTeams(options);
    } catch (error) {
      console.error('Error fetching Teams:', error);
    }
  };

  const handleTeamChange = (event) => {
    setTeamID(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url="http://localhost:8080/api/routetrackers"
      const response=await axios.post(url,{date,time,location,teamID,checkpostID,imageData});
      console.log('Data stored in MongoDB:', response.data);
    } catch (error) {
      console.log('Error storing data in MongoDB:', error);
    }
    setCheckpostID("");
    setDate("");
    setImageData("");
    setTeamID("");
    setTime("");
    setLocation("");
  };

  const startCamera = () => {
    setIsCameraOpen(true);
  
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((error) => {
          console.log('Error accessing camera:', error);
        });
    }
  };
  

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const mediaStream = videoRef.current.srcObject;
      const tracks = mediaStream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL('image/jpeg');
    setImageData(dataURL);
    setShowPreview(true);
    setIsCameraOpen(false); // Set isCameraOpen to false when the image is captured
    stopCamera();
  };

  const retakeImage = () => {
    setImageData(null);
    setShowPreview(false);
    setShowSelfieLabel(true);
    setIsCameraOpen(true); // Set isCameraOpen to true when retaking the photo
    startCamera();
  };

  const confirmImage = () => {
    setShowSelfieLabel(true);
    setShowPreview(false);
  };

  useEffect(()=>{
    if(latitude && longitude){
    handleScanQRCode();
    }
  },[latitude,longitude]);
  const handleScanQRCode = () => {
    const qrCodeScanner = new Html5QrcodeScanner('qr-code-scanner', {
      fps: 10,
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true,
      },
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      aspectRatio: 1,
    });

    qrCodeScanner.render(onScanSuccess);

    function onScanSuccess(qrCodeMessage) {
      const lines = qrCodeMessage.split('\n');
      setCheckpostID(lines[0]);
      setDate(new Date().toLocaleDateString());
      setTime(new Date().toLocaleTimeString());
      fetchlocation();
      qrCodeScanner.clear();
    }
    return () => {
      qrCodeScanner.stop();
    };
  
  };

  return (
    <div >
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className="route-tracker-container">
    <form onSubmit={handleSubmit} >
      <h1>Route Tracker</h1>
      {showPreview && (
        <div className="camera-overlay">
          <h2>Preview:</h2>
          <img src={imageData} alt="Selfie Preview" />
          <div>
            <button onClick={confirmImage}>Confirm</button>
            <button onClick={retakeImage}>Retake Photo</button>
          </div>
        </div>
      )}
      {!showPreview && (
        <div>
          {showSelfieLabel && (
            <div>
              <label>Selfie:</label>
              <input type="text" value={imageData || ''} required readOnly />
            </div>
          )}
          <button type='button' onClick={startCamera}>Open Camera</button>
        </div>
      )}

      <div className="select-container">
        <label>Team ID:</label>
        <select value={teamID} onChange={handleTeamChange}>
          <option value="">Select Team-ID</option>
          {teams.map((options) => (
            <option key={options.value} value={options.value}>
              {options.label}
            </option>
          ))}
        </select>
      </div>
      <div className="date-container">
        <label>Date:</label>
        <input type="text" value={date} readOnly />
      </div>
      <div className="location-container">
        <label>Location:</label>
        <input type="text" value={location} readOnly required/>
      </div>  
      <div className="time-container">
        <label>Time:</label>
        <input type="text" value={time} readOnly />
      </div>
      <div className="checkpost-container">
        <label>Checkpost ID:</label>
        <input type="text" value={checkpostID} readOnly required />
        <button type='button' onClick={handleScanQRCode}>Scan QR</button>
      </div>

      <div id="qr-code-scanner" style={{ width: '300px', height: '300px' }}></div>
      <div className='submit-container'>
      <button className="submit-button" type="submit" style={{width:'140px'}}>
        Submit Form
      </button>
      </div>
      {isCameraOpen && (
        <div className="camera-overlay">
          <h2>Camera View:</h2>
          <video ref={videoRef} autoPlay />
          <button onClick={captureImage}>Capture</button>
        </div>
      )}
    </form>
    </div>
    </div>
  );
};

export default RouteTracker;
