import React from "react"
import PatientMedicalRecordsList from './PatientMedicalRecordsList'

const createPatientList = (patient, doctorsAddress, insuranceAddress) => {
  return (
    <div key={patient.address}>
      <h4>{patient.address}</h4>
      <PatientMedicalRecordsList
        items={patient.documents}
        userAddress={doctorsAddress}
        patientAddress={patient.address}
        isDoctor={true} 
      ></PatientMedicalRecordsList>

        <PatientMedicalRecordsList
        items={patient.documents}
        userAddress={insuranceAddress}
        patientAddress={patient.address}
        isInsurance={true}
      >
      </PatientMedicalRecordsList>
    </div>
  )
}

const PatientsOverview = ({ patients, doctorsAddress, insuranceAddress }) => {
  console.log(patients)
  console.log(patients[0])
  return (
    <div>
      {patients && patients.map((patient, index) => {
        console.log(patient)
        if (patient.address === '0x0000000000000000000000000000000000000000' ||
          patient.address === doctorsAddress) return ''
        else if (patient.address === '0x0000000000000000000000000000000000000000' ||
        patient.address === insuranceAddress) return ''
        return createPatientList(patient, insuranceAddress)
      })}
    </div>
  )
}

export default PatientsOverview;