import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import QRCode from "react-qr-code";
import axios from 'axios';
import '/src/styles/PermitMaster.css'

const PermitMaster = () => {
  const [bookNumber, setBookNumber] = useState('');
  const [formNumber, setFormNumber] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [validUpto, setValidUpto] = useState(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 14);
    return currentDate.toISOString().split('T')[0];
  });

  const [contractorName, setContractorName] = useState('');
  const [agreementNo, setAgreementNo] = useState('');
  const [gstRegistrationNo, setGstRegistrationNo] = useState('');
  const [districtAllotted, setDistrictAllotted] = useState('');
  const [districtCode, setDistrictCode] = useState('');

  const [lesseeId, setLesseeId] = useState('');
  const [lesseeNameandAddress, setLesseeNameandAddress] = useState('');
  const [lesseeGstNo, setLesseeGstNo] = useState('');
  const [lesseeids,setLesseeids]=useState([]);

  const [syNo, setSyNo] = useState('');
  const [village, setVillage] = useState('');
  const [mandal, setMandal] = useState('');
  const [district, setDistrict] = useState('');
  const [leaseExtent, setLeaseExtent] = useState('');
  const [saleValue, setSaleValue] = useState('');
  const [mineralName, setMineralName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [synos,setSynos]=useState([]);

  const [consigneeNameandAddress, setConsigneeNameandAddress] = useState('');

  const [driverLicenceNo, setDriverLicenceNo] = useState('');
  const [driverName, setDriverName] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [destination, setDestination] = useState('');
  const [destinationDistance, setDestinationDistance] = useState('');
  const [arrivalDateTime, setArrivalDateTime] = useState('');
  const [dispatchDateTime, setDispatchDateTime] = useState('');
  const [licencenos,setLicencenos]=useState([]);
  const [qrCode, setQrCode] = useState('');

  useEffect(()=>{
    getForm();
  },[]);

  const generateQRCode = (qrdata) => {
    <QRCode size={400} bgColor='white' fgColor='black' value={qrdata}></QRCode>
  };
  const getForm = async (e) => {
    const url = "http://localhost:8080/api/permitmaster";
    const response = await axios.get(url);
    let formNumber,bookNumber;
    if (response.data.length=== 0) {
      formNumber = "100000";
      bookNumber="1000"
    } else {
      const forms = response.data;
      const lastEntry = forms[forms.length - 1];
      console.log(lastEntry)
      const lastFormNumber = parseInt(lastEntry.formNumber);
      const lastBookNumber=parseInt(lastEntry.bookNumber);
      formNumber = (lastFormNumber + 1).toString();
      bookNumber = (lastBookNumber + 1).toString();
    }
  
    setFormNumber(formNumber);
    setBookNumber(bookNumber);
  };
  useEffect(() => {
    getCompany();
    // console.log(routes);
  }, []);
  useEffect(() => {
    setQrCode("<" + districtCode + ">" + "<" + districtCode + "/" + formNumber + ">" + "<" + districtCode + "/" + bookNumber + ">");
  
  }, [getForm, districtCode, formNumber, bookNumber]);
  useEffect(() => {
    getLessee();
    getQuarry();
    getLicense();
    // console.log(routes);
  }, []);
  const getLessee=async()=>{
    try {
      const response = await axios.get('http://localhost:8080/api/lessee');
      const lesseeids = response.data.map((lessee) => lessee.LesseeID);
      const options = lesseeids.map((lessee) => ({
        value: lessee,
        label: lessee,
      }));
      setLesseeids(options);
    } catch (error) {
      console.error('Error fetching LesseeIDs:', error);
    }
  }
  const getLesseeDetails=async(lesseeid)=>{
    const response = await axios.get('http://localhost:8080/api/lessee');
    const quarrydata = response.data.filter((lessee)=>lessee.LesseeID===lesseeid)
    setLesseeNameandAddress(quarrydata[0].nameandaddress)
    setLesseeGstNo(quarrydata[0].GST)
  }
  const getQuarry=async()=>{
    try {
      const response = await axios.get('http://localhost:8080/api/quarry');
      const quarry = response.data.map((quarry) => quarry.syNo);
      const options = quarry.map((sy) => ({
        value: sy,
        label: sy,
      }));
      setSynos(options);
    } catch (error) {
      console.error('Error fetching Synos:', error);
    }
  }
  const getQuarryDetails=async(Syno)=>{
    const response = await axios.get('http://localhost:8080/api/quarry');
    const quarrydata = response.data.filter((quarry)=>quarry.syNo===Syno)
    setVillage(quarrydata[0].village)
    setMandal(quarrydata[0].mandal)
    setDistrict(quarrydata[0].district)
  }
  const getLicense=async()=>{
    try {
      const response = await axios.get('http://localhost:8080/api/transportdetails');
      // console.log(response)
      const licence = response.data.map((licence) => licence.driverLicenseNo);
      const options = licence.map((licenceno) => ({
        value: licenceno,
        label: licenceno,
      }));
      setLicencenos(options);
    } catch (error) {
      console.error('Error fetching licencenos:', error);
    }
  }
  const getLicenceDetails=async(licenceno)=>{
    const response = await axios.get('http://localhost:8080/api/transportdetails');
    console.log(response.data,licenceno)
    const driverdetails = response.data.filter((driver)=>driver.driverLicenseNo===licenceno)
    console.log(driverdetails)
    setVehicleNo(driverdetails[0].vehicleNo)
    setDriverName(driverdetails[0].driverName)
  }
  
  const getCompany = async () => {
    try {
      let email = localStorage.getItem('email');
      const response1 = await axios.get('http://localhost:8080/api/employee');
      const comp = response1.data.filter((employee) => employee.emailID === email)[0].companyName;
      if (comp) {
        getSCCC(comp);
      }
    } catch (error) {
      console.error('Error fetching Company details:', error);
    }
  };
  const handleLesseeChange=(event)=>{
    setLesseeId(event.target.value);
    getLesseeDetails(event.target.value);
  }
  const handleSyChange=(event)=>{
    setSyNo(event.target.value);
    getQuarryDetails(event.target.value);
  }
  const handleDriverChange=(event)=>{
    setDriverLicenceNo(event.target.value);
    getLicenceDetails(event.target.value);
  }
  const handleMineralChange=async(event)=>{
    try{
      const response=await axios.get('http://localhost:8080/api/eligibility')
      const details=response.data.filter((eligibility) => eligibility.lesseeID===lesseeId)[0].details
      const minerals=details.filter((minerals)=>minerals.mineralName==event.target.value)
      if (minerals.length===0) {
        console.log("Not eligible for this mineral!!")
        setMineralName('');
      }
      else{
        console.log("Valid Mineral!")
      }
  }
    catch(error){
      console.error('Error fetching Mineral details:', error);
    }
  }
  const handleQuantityChange=async(event)=>{
    try{
      const response=await axios.get('http://localhost:8080/api/eligibility')
      const details=response.data.filter((eligibility) => eligibility.lesseeID===lesseeId)[0].details
      const minerals=details.filter((minerals)=>minerals.mineralName===mineralName)
      if (minerals.length===0) {
        console.log("Please enter a mineral!!")
        setQuantity('');
      }
      else{
        let weight=minerals[0].weight
        if (event.target.value>weight) {
          console.log("Quantity has exceeded eligible limit!")
          setQuantity('')
        }
        else{
          console.log("Valid amount!")
        }
      }
  }
    catch(error){
      console.error('Error fetching Mineral details:', error);
    }
  }
  
  const getSCCC = async (company) => {
    try {
      const response2 = await axios.get('http://localhost:8080/api/sccc');
      const cname = response2.data.filter((sccc) => sccc.contractorName === company);
      setAgreementNo(cname[0].agreementNo);
      setContractorName(cname[0].contractorName);
      setGstRegistrationNo(cname[0].gstRegistrationNo);
      setDistrictAllotted(cname[0].districtAllotted);
      setDistrictCode(cname[0].districtCode);
    } catch (error) {
      console.error('Error fetching SCCC details:', error);
    }
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const url="http://localhost:8080/api/permitmaster"
      const response=await axios.post(url,{bookNumber,formNumber,currentDate,validUpto,contractorName,agreementNo,gstRegistrationNo,districtAllotted,districtCode,lesseeId,lesseeNameandAddress,lesseeGstNo,syNo,village,mandal,district,leaseExtent,saleValue,mineralName,quantity,consigneeNameandAddress,driverLicenceNo,driverName,vehicleNo,destination,destinationDistance,arrivalDateTime,dispatchDateTime})
      console.log("Permit Data successfully stored!",response.data)
      const url2=`http://localhost:8080/api/eligibility/${lesseeId}/${mineralName}`
      const response2=await axios.put(url2,{quantity})
      console.log("Eligibility Updated!",response2.data)
    } catch (error) {
      console.log('Error storing data in MongoDB:', error);
    }
  };

  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
    <form onSubmit={handleSubmit}>
    <div className='Transit-Form'>
      <h2 className="heading">Transit form</h2>
      <div className="form-row">
        <label htmlFor="bookNumber">Book Number</label>
        <input type="text" id="bookNumber" value={bookNumber} readOnly onChange={(e) => setBookNumber(e.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="formNumber">Form Number</label>
        <input type="text" id="formNumber" value={formNumber} readOnly onChange={(e) => setFormNumber(e.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="currentDate">Date</label>
        <input type="date" id="currentDate" value={currentDate} onChange={(e)=>setCurrentDate(e.target.value)}/>
      </div>

      <div className="form-row">
        <label htmlFor="validUpto">Valid Upto</label>
        <input type="date" id="validUpto" value={validUpto} onChange={(e) => setValidUpto(e.target.value)} />
      </div>
    </div>

      <div className='Sccc-awardee'>
      <h2>SCCC awardee</h2>
      <label htmlFor="contractorName">Contractor Name</label>
      <input type="text" id="contractorName" value={contractorName} readOnly onChange={(e) => setContractorName(e.target.value)} />

      <label htmlFor="agreementNo">Agreement No</label>
      <input type="text" id="agreementNo" value={agreementNo} readOnly onChange={(e) => setAgreementNo(e.target.value)} />

      <label htmlFor="gstRegistrationNo">GST Registration No</label>
      <input type="text" id="gstRegistrationNo" readOnly value={gstRegistrationNo} onChange={(e) => setGstRegistrationNo(e.target.value)} />

      <label htmlFor="districtAllotted">District Allotted</label>
      <input type="text" id="districtAllotted" readOnly value={districtAllotted} onChange={(e) => setDistrictAllotted(e.target.value)} />

      <label htmlFor="districtCode">District Code</label>
      <input type="text" id="districtCode" readOnly value={districtCode} onChange={(e) => setDistrictCode(e.target.value)} />
      </div>
      <div className='mineral-details'>
      <h2>Mineral Transport Details</h2>
      <label htmlFor="lesseeId">Lessee ID</label>
      <select value={lesseeId} onChange={handleLesseeChange}>
        <option value={""}>Select ID</option>
        {lesseeids.map((options)=>(
            <option key={options.value} value={options.value}>
                {options.label}
            </option>
        ))}
      </select>

      <label htmlFor="lesseeName">Lessee Name & Address</label>
      <input type="text" id="lesseeName" value={lesseeNameandAddress} onChange={(e) => setLesseeNameandAddress(e.target.value)} />

      <label htmlFor="lesseeGstNo">GST No</label>
      <input type="text" id="lesseeGstNo" value={lesseeGstNo} onChange={(e) => setLesseeGstNo(e.target.value)} />
      </div>
      <div className='Mine-details'>
      <h2>Mine Location</h2>
      <label htmlFor="syNo">Sy.No</label>
      <select value={syNo} onChange={handleSyChange}>
        <option value={""}>Select Sy.No</option>
        {synos.map((options)=>(
            <option key={options.value} value={options.value}>
                {options.label}
            </option>
        ))}
      </select>

      <label htmlFor="village">Village</label>
      <input type="text" id="village" value={village} onChange={(e) => setVillage(e.target.value)} />

      <label htmlFor="mandal">Mandal</label>
      <input type="text" id="mandal" value={mandal} onChange={(e) => setMandal(e.target.value)} />

      <label htmlFor="district">District</label>
      <input type="text" id="district" value={district} onChange={(e) => setDistrict(e.target.value)} />

      <label htmlFor="leaseExtent">Extent of Lease</label>
      <input type="text" id="leaseExtent" value={leaseExtent} onChange={(e) => setLeaseExtent(e.target.value)} />

      <label htmlFor="saleValue">Sale Value of Mineral</label>
      <input type="text" id="saleValue" value={saleValue} onChange={(e) => setSaleValue(e.target.value)} />

      <label htmlFor="mineralName">Mineral Name</label>
      <input type="text" id="mineralName" value={mineralName} onBlur={handleMineralChange} onChange={(e) => setMineralName(e.target.value)} />

      <label htmlFor="quantity">Quantity in Cbm/in MT</label>
      <input type="text" id="quantity" value={quantity} onBlur={handleQuantityChange} onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <div className='consignee'>
      <h2>Consignee</h2>
      <label htmlFor="consigneeName">Consignee Name & Address</label>
      <textarea id="consigneeName" value={consigneeNameandAddress} onChange={(e) => setConsigneeNameandAddress(e.target.value)} />
      </div>
      <div className='Transport-details'>
      <h2>Transport Details</h2>
      <label htmlFor="driverLicenceNo">Driver Licence No</label>
      <select value={driverLicenceNo} onChange={handleDriverChange}>
        <option value={""}>Select DL</option>
        {licencenos.map((options)=>(
            <option key={options.value} value={options.value}>
                {options.label}
            </option>
        ))}
      </select>

      <label htmlFor="driverName">Driver Name</label>
      <input type="text" id="driverName" value={driverName} onChange={(e) => setDriverName(e.target.value)} />

      <label htmlFor="vehicleNo">Vehicle No</label>
      <input type="text" id="vehicleNo" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} />

      <label htmlFor="destination">Destination</label>
      <input type="text" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} />

      <label htmlFor="destinationDistance">Distance of Destination (km)</label>
      <input type="text" id="destinationDistance" value={destinationDistance} onChange={(e) => setDestinationDistance(e.target.value)} />

      <label htmlFor="arrivalDateTime">Arrival Date and Time</label>
      <input type="datetime-local" id="arrivalDateTime" value={arrivalDateTime} onChange={(e) => setArrivalDateTime(e.target.value)} />

      <label htmlFor="dispatchDateTime">Dispatch Date and Time</label>
      <input type="datetime-local" id="dispatchDateTime" value={dispatchDateTime} onChange={(e) => setDispatchDateTime(e.target.value)} />
      </div>
      <div className='qr-code'>
      <QRCode size={100} className="qr-code" bgColor='white' fgColor='black' value={qrCode} ></QRCode>
      </div>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default PermitMaster;
